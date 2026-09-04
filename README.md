# 🔮 Quick MBTI (마음의 결) 🧭✨

> **30초 초정밀 감성 심리테스트 (Quick MBTI)**  
> 복잡한 인지 피로를 걷어낸 **초단순 1줄 문항**, 만지고 싶은 **쫀득한 젤리 탄성(Squash & Stretch) 인터랙션**, 그리고 **16종 3D 클레이 몽글이 캐릭터 & 심층 에세이 분석**이 결합된 감성 MBTI 서비스.  
> [ieum.one](https://ieum.one/) 벤치마크 기반의 글래스모피즘 & 플로팅 오브 디자인 시스템.

![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20CanvasConfetti-6366f1)
![Precision](https://img.shields.io/badge/Algorithm-4--Point%20Scalar%20Precision-8b5cf6)
![Mascots](https://img.shields.io/badge/Mascots-16%203D%20Clay%20Characters-ec4899)
![Story Card](https://img.shields.io/badge/Viral-9%3A16%20Instagram%20Story%20Canvas-10b981)

---

## 🌟 핵심 특징 (Key Highlights)

### 1. ⚡ 질문 및 보기 텍스트 다이어트 (인지부하 최소화)
- 1문항당 응답 시간 **1.5초 컷**으로 중도 이탈 최소화
- 직관적인 초단순 1줄 질문 카피와 구어체 4점 척도 선택지 (`A+`, `A`, `B`, `B+`)
- 4축(E-I, S-N, T-F, J-P) 가중치 스칼라 점수제로 1:1 동점 오류를 원천 차단하고 세부 백분율(%) 산출

### 2. 🍮 쫀득한 젤리 탄성(Squash & Stretch) 인터랙션
- 디즈니 애니메이션 1원칙 **스쿼시 & 스트레치** 적용
- 카드가 착지할 때 세로 18% 압축(0.82) 및 가로 팽창(1.18) 후 탄성 리바운드되는 `@keyframes jellyBounce`
- 선택지 및 액션 버튼 터치 시 쫀득하게 눌렸다가 튕겨 오르는 `@keyframes jellyTap` 인터랙션

### 3. 🧸 16종 '마음의 결 몽글이 (Crystal Puffs)' 3D 캐릭터 시스템
- 각 MBTI 유형의 고유한 성향, 파스텔 컬러, 표정, 상징 소품(안경, 책, 티머그, 왕관, 풍선 등)을 반영한 3D 클레이 캐릭터 에셋 탑재
- SVG 벡터 그래픽으로 어떤 해상도에서도 선명하고 가볍게 렌더링

### 4. 📖 안티-AI 심층 롱폼 분석 시스템 (Editorial Essays)
- 기계적인 AI 문체와 과도한 이모지 도배를 철저히 배제한 감성 에세이 타이포그래피
- **5단계 아키텍처**:
  1. `아이덴티티 헤더`: 감성 칭호 & 3D 몽글이
  2. `정밀 성향 스펙트럼`: 4대 축 정밀 백분율 바
  3. `본질 탐구`: 남들은 모르는 나의 기본 모드 vs 혼자 있을 때 마주하는 진짜 나
  4. `인간관계와 에너지`: 내가 편안함을 느끼는 사람의 결 vs 조용히 마음의 문을 닫는 손절 버튼
  5. `방전과 회복`: 멘탈 임계점 신호와 혼자만의 처방전
  6. `케미 레이더`: 찰떡 케미 & 거리두기 케미

### 5. 📸 ieum.one 스타일 플로팅 액션 바 & 9:16 인스타 스토리 캔버스 엔진
- 결과 화면 하단 고정 Sticky Footer ([🔄 다시하기], [💬 결과 링크], [📸 스토리 카드 저장])
- 브라우저 Canvas API 기반으로 0.2초 만에 **1080x1920 초고해상도 인스타그램 스토리 맞춤형 카드** 동적 합성 및 원클릭 갤러리 다운로드
- 모바일 환경에서 Web Share API 네이티브 연동

### 6. ☁️ Firebase Firestore & 소셜 관계망 실시간 클라우드 연동
- **무서버(Serverless) 익명 인증 (Anonymous Auth)**: 로그인 팝업 없이 접속 즉시 고유 UID 자동 발급으로 참여 장벽 0% 유지
- **오프라인 우선(Offline-First) 듀얼 스토리지**: `localStorage` 0ms 즉시 렌더링 + Firestore 백그라운드 자동 동기화
- **실시간 소셜 바이럴 초대 (`?ref=UID`)**: 초대 링크로 친구가 테스트를 마치면, 서로의 우주 관계망에 상대방 캐릭터가 실시간(`onSnapshot`)으로 퐁- 하고 등장하는 상호 궁합 연결 시스템
- **클라우드 실시간 상태 인디케이터**: 연결 상태에 따른 우주 관계망 상단 동기화 배지 지원

---

## 🚀 빠른 시작 (Quick Start)

별도의 복잡한 번들러 없이 정적 웹 호스팅 환경(Vercel, GitHub Pages, Netlify 등)에서 100% 즉시 동작합니다.

```bash
# 로컬에서 브라우저로 바로 실행
open index.html # 또는 브라우저에서 index.html 파일 열기
```

---

## 📁 프로젝트 구조 (Directory Layout)

```
quick-mbti/
├── index.html                 # 메인 애플리케이션 (UI, 퀴즈 엔진, 캔버스 생성기)
├── favicon.svg                # 파비콘 에셋
├── manifest.webmanifest       # PWA 매니페스트
├── package.json               # 프로젝트 메타데이터
├── assets/
│   └── characters/            # 16종 3D 클레이 몽글이 SVG 에셋 (INTJ ~ ESFP)
└── scripts/
    ├── generate_characters.js # 16종 캐릭터 SVG 일괄 생성 스크립트
    ├── mbti_database.js       # 16종 안티-AI 에디토리얼 심층 분석 DB
    ├── build_full_index.js    # index.html 빌드 스크립트
    └── test_app.js            # 무결성 및 16유형 도출 검증 스위트
```

---

## 🔮 라이선스
MIT License © 2026 SteadyBuilder
