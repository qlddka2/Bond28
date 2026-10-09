/* 사이트 공통 설정 — 모든 테스트 페이지가 이 파일을 읽습니다. */
window.SITE = {
  // 익명 이용 통계(공개용 값). supabase/tl_events.sql 을 실행해야 저장됩니다. 비우면 통계가 꺼집니다.
  TRACK_URL: "https://rofphqdqwxmjkypmjtok.supabase.co",
  TRACK_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZnBocWRxd3htamt5cG1qdG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NTc5NDAsImV4cCI6MjEwNzAzMzk0MH0.4YtLlwxtzx-s0xX7SCQv7mbgN_RIsXpdh6LuFCY9WMI",
  // 카카오 JavaScript 키 (developers.kakao.com → 앱 → 플랫폼 키). 비워두면 기기 공유창/링크 복사로 동작합니다.
  KAKAO_KEY: "",
  // 각 테스트 페이지에서 '다른 테스트도 해보기'를 눌렀을 때 이동할 주소 (허브 = 저장소 루트)
  HUB_URL: "../"
};
