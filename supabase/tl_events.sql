-- TEST LAB 익명 이용 통계 (Supabase SQL Editor에서 한 번 실행. 여러 번 실행해도 안전)
-- 저장하는 것: 임의 세션ID, 페이지, 이벤트 종류, 유입 경로(도메인만), 기기(m/d), 언어.
-- 저장하지 않는 것: 이름·이메일·IP·테스트 응답·테스트 결과.
create table if not exists public.tl_events (
  id     bigint generated always as identity primary key,
  at     timestamptz not null default now(),
  sid    text not null check (char_length(sid) between 6 and 40),
  test   text not null check (test in ('hub','react','prism','bond','nest','mind','about','privacy','terms','contact')),
  ev     text not null check (ev in ('view','start','complete','share','next','hub')),
  src    text check (src is null or char_length(src) <= 30),    -- 사이트 안에서 넘어온 곳(예: react)
  ref    text check (ref is null or char_length(ref) <= 60),    -- 사이트 밖 유입 도메인(경로 없음)
  arg    text check (arg is null or char_length(arg) <= 30),    -- 공유 채널 / 다음으로 간 테스트
  shared boolean not null default false,                         -- 친구가 보낸 결과 링크로 들어왔는지
  lang   text check (lang is null or char_length(lang) <= 5),
  dev    text check (dev is null or dev in ('m','d'))
);
create index if not exists tl_events_at_idx on public.tl_events (at);
alter table public.tl_events enable row level security;
drop policy if exists tl_events_insert on public.tl_events;
create policy tl_events_insert on public.tl_events for insert to anon, authenticated with check (true);
revoke all on public.tl_events from anon, authenticated;
grant insert on public.tl_events to anon, authenticated;

-- ───────── 보는 쪽(SQL Editor에서만 조회 가능, 앱·방문자는 읽을 수 없음) ─────────
-- 1) 테스트별 퍼널(최근 30일): 방문 → 시작 → 완료 → 다른 테스트로 이동
create or replace view public.tl_funnel as
select test,
  count(distinct sid) filter (where ev='view' and not shared)                         as visitors,
  count(distinct sid) filter (where ev='view' and shared)                             as from_shared_link,
  count(distinct sid) filter (where ev='start')                                       as starters,
  count(distinct sid) filter (where ev='complete')                                    as completers,
  round(100.0*count(distinct sid) filter (where ev='complete')
        / nullif(count(distinct sid) filter (where ev='start'),0), 1)                 as complete_pct,
  count(distinct sid) filter (where ev in ('next','hub'))                             as went_on,
  round(100.0*count(distinct sid) filter (where ev in ('next','hub'))
        / nullif(count(distinct sid) filter (where ev='complete'),0), 1)              as went_on_pct,
  count(*) filter (where ev='share')                                                  as shares
from public.tl_events
where at > now() - interval '30 days' and test in ('react','prism','bond','nest','mind','hub')
group by test order by visitors desc;

-- 2) 어디서 들어왔나(최근 30일): 사이트 안(src) / 밖(ref) / 직접
create or replace view public.tl_sources as
select test, coalesce('내부:'||src, '외부:'||ref, '직접·공유앱') as source, count(distinct sid) as visitors
from public.tl_events
where ev='view' and at > now() - interval '30 days'
group by 1,2 order by visitors desc;

-- 3) 테스트에서 다른 테스트로 어떻게 넘어가나(최근 30일)
create or replace view public.tl_flow as
select test as from_test, coalesce(arg,'허브') as to_test, count(distinct sid) as people
from public.tl_events
where ev in ('next','hub') and at > now() - interval '30 days'
group by 1,2 order by people desc;

-- 4) 일별 방문자
create or replace view public.tl_daily as
select (at at time zone 'Asia/Seoul')::date as day, test, count(distinct sid) as visitors
from public.tl_events where ev='view'
group by 1,2 order by 1 desc, 3 desc;

revoke all on public.tl_funnel, public.tl_sources, public.tl_flow, public.tl_daily from anon, authenticated;
