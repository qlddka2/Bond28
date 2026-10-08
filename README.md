# TEST LAB

가치관·애착·육아·사고 강점을 가볍게 살펴보는 심리·성향 테스트 모음입니다. 빌드 과정 없이 **정적 HTML만으로** 동작하고, 4개 언어(KO/EN/ZH/JA)를 지원합니다.

| 폴더 | 테스트 | 분량 |
|---|---|---|
| `react/` | ⚡ 반응속도 챌린지 (후킹용 미니게임, 3판 평균 티어) | 약 1분 |
| `prism/` | 🔮 PRISM 56 — 가치관 지도 (4축, 56문항) | 약 10분 |
| `bond/`  | 🪢 BOND 28 — 애착 스타일 (28문항) | 약 6분 |
| `nest/`  | 🪺 NEST 24 — 육아 스타일 (24문항) | 약 7분 |
| `mind/`  | 🧠 MIND 5 — 사고 강점 지도 (5영역 32문항 + 스피드 라운드, 비공식·IQ 아님) | 약 12분 |

```
.
├── index.html      # 허브(메인) 페이지
├── config.js       # 공통 설정 (카카오 키, 허브 주소)
├── exit.js         # 공통 ‘← 메인’ 버튼 + 이탈 경고 팝업
├── react/index.html
├── prism/index.html
├── bond/index.html
├── nest/index.html
├── mind/index.html
└── .nojekyll
```

## 로컬에서 보기
`file://`로 열면 `config.js` 경로가 달라질 수 있으니 간단한 서버를 쓰세요.
```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## GitHub Pages로 배포
```bash
git init
git add .
git commit -m "Initial commit: TEST LAB"
git branch -M main
git remote add origin https://github.com/<아이디>/<저장소>.git
git push -u origin main
```
저장소 **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`** 로 설정하면 `https://<아이디>.github.io/<저장소>/` 에서 열립니다.
모든 링크가 상대경로라 저장소 이름이 달라도, 커스텀 도메인을 붙여도 그대로 동작합니다.

## 설정 (`config.js`)
| 값 | 설명 |
|---|---|
| `KAKAO_KEY` | 카카오 JavaScript 키. 비워 두면 카카오톡 버튼은 기기 공유창 → 링크 복사로 동작합니다. 키를 넣을 땐 [Kakao Developers](https://developers.kakao.com)에서 배포 도메인을 ‘웹 플랫폼’에 등록해야 합니다. |
| `HUB_URL` | 각 테스트의 ‘다른 테스트도 해보기’ 버튼 이동 주소. 기본값 `../`(허브). |

## 공통 규격 (5개 테스트가 모두 동일하게 따름)
- **결과 공유 = URL 해시**: `…/mind/#r=80.40.60.20.50&l=ko` 처럼 점수와 언어가 링크에 담기고, 서버에는 아무것도 저장되지 않습니다. 링크를 연 친구는 결과 화면과 **‘나도 해보기’** 배너를 봅니다.
- **언어 설정 공유**: `localStorage`의 `site_lang` 하나를 허브와 모든 테스트가 같이 씁니다.
- **나가기 버튼**: 모든 테스트 상단에 ‘← 메인’ 버튼(`exit.js`). 시작 전·결과 화면에서는 바로 이동하고, 진행 중에는 확인 팝업을 띄웁니다.
- **자동 넘김**: 선택 100ms 후 다음 문항으로, 다음 문항은 선택 없는 상태로 시작, 스크롤 위치 고정.
- **결과 카드**: 캔버스 이미지 → 길게 눌러 저장 / 기기 공유창으로 이미지 전송.
- **표현 원칙**: 모든 결과는 ‘유형명 – 닉네임 – 캐릭터’ 구성의 비진단적 표현이며, 하단에 비임상·자기이해 도구임을 명시합니다.

## 새 테스트를 추가하려면
1. 새 폴더(`foo/index.html`)를 만들고 기존 테스트 하나를 복사해 시작합니다(`nest/`가 가장 단순한 템플릿).
2. 파일 첫 `<script>` 앞에 `<script src="../config.js"></script>`를 두고, 언어 키는 `"site_lang"`을 사용합니다.
3. `index.html`(허브)의 `TESTS` 배열과 `UI.<lang>.t`에 카드 정보를 추가하고, `react/index.html`의 `TESTS`에도 추가합니다.

## 알아둘 점
- 카카오톡/라인 등에서 링크 미리보기(OG 이미지·제목)는 페이지 단위로 고정됩니다. 결과별 미리보기가 필요하면 서버(또는 Cloudflare Workers 등)에서 OG 태그를 동적으로 내려주는 별도 구성이 필요합니다.
- MIND 5는 WAIS 등 성인 지능검사의 5영역 구성(언어이해·시공간·유동추론·작업기억·처리속도)을 참고한 **비공식 퀴즈**이며 IQ를 산출하거나 지능 수준을 판정하지 않습니다.
