const fs = require('fs');
const path = require('path');
const { mbtiData } = require('./mbti_database');

const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Quick MBTI (마음의 결) - 30초 초정밀 감성 심리테스트</title>
  <meta name="description" content="복잡한 문항은 그만! 초단순 1줄 문항과 쫀득한 젤리 탄성, 16개 유형 심층 에세이 분석으로 만나는 진짜 나의 마음의 결." />
  <meta property="og:title" content="Quick MBTI (마음의 결) - 30초 초정밀 감성 MBTI 테스트" />
  <meta property="og:description" content="8개의 감성 질문과 쫀득한 젤리 인터랙션으로 만나는 3D 몽글이 캐릭터 & 심층 성향 분석" />
  <meta property="og:type" content="website" />
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <!-- Pretendard & Plus Jakarta Sans Web Fonts -->
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Pretendard', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
          },
          colors: {
            brandPurple: '#6366f1',
            brandViolet: '#8b5cf6',
          }
        }
      }
    }
  </script>

  <style>
    * {
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      box-sizing: border-box;
    }

    body {
      background-color: #f6f8fe;
      color: #1e293b;
      overflow-x: hidden;
      font-feature-settings: "cv02", "cv03", "cv04", "cv11";
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Ambient Floating Orbs (ieum.one 감성 조명) */
    .floating-orbs {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .floating-orb {
      position: absolute;
      border-radius: 9999px;
      filter: blur(80px);
      opacity: 0.55;
      animation: floatMotion 20s ease-in-out infinite alternate;
    }

    .floating-orb-1 {
      width: 460px;
      height: 460px;
      background: radial-gradient(circle, rgba(165, 180, 252, 0.7) 0%, rgba(199, 210, 254, 0.15) 70%);
      top: -80px;
      left: -80px;
      animation-duration: 22s;
    }

    .floating-orb-2 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(221, 214, 254, 0.75) 0%, rgba(243, 232, 255, 0.2) 70%);
      top: 35%;
      right: -140px;
      animation-duration: 26s;
      animation-delay: -5s;
    }

    .floating-orb-3 {
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(254, 205, 211, 0.65) 0%, rgba(255, 228, 230, 0.15) 70%);
      bottom: -60px;
      left: 10%;
      animation-duration: 24s;
      animation-delay: -10s;
    }

    .floating-orb-4 {
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(191, 219, 254, 0.65) 0%, rgba(224, 242, 254, 0.2) 70%);
      top: 15%;
      left: 55%;
      animation-duration: 20s;
      animation-delay: -3s;
    }

    @keyframes floatMotion {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      50% { transform: translate(45px, 50px) scale(1.08) rotate(50deg); }
      100% { transform: translate(-35px, 25px) scale(0.96) rotate(-35deg); }
    }

    /* Glassmorphism Classes */
    .glass-card {
      background: rgba(255, 255, 255, 0.68);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.85);
      box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08), 0 0 1px 1px rgba(255, 255, 255, 0.6) inset;
    }

    .glass-button {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.85);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-button:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(165, 180, 252, 0.85);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.12);
    }

    /* Primary Gradient Button */
    .btn-gradient {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
      box-shadow: 0 12px 28px -6px rgba(99, 102, 241, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-gradient:hover {
      box-shadow: 0 16px 32px -4px rgba(99, 102, 241, 0.55);
      transform: translateY(-2px) scale(1.01);
    }

    /* 🍮 쫀득한 젤리 탄성(Squash & Stretch) 디즈니 1원칙 */
    @keyframes jellyBounce {
      0% {
        transform: translateY(-24px) scale(0.92, 1.08);
        opacity: 0;
      }
      40% {
        transform: translateY(0px) scale(1.18, 0.82); /* 착지 시 쫀득하게 압축 */
        opacity: 1;
      }
      65% {
        transform: translateY(-8px) scale(0.92, 1.08); /* 탄성 반동으로 솟구침 */
      }
      82% {
        transform: translateY(0px) scale(1.04, 0.96); /* 미세 잔여 진동 */
      }
      100% {
        transform: translateY(0px) scale(1, 1); /* 안정 안착 */
      }
    }

    /* 보기 카드 터치(Active) 시 젤리 꾹 누름 */
    @keyframes jellyTap {
      0% { transform: scale(1, 1); }
      35% { transform: scale(1.12, 0.88); }
      70% { transform: scale(0.95, 1.05); }
      100% { transform: scale(1, 1); }
    }

    .animate-jelly-card {
      animation: jellyBounce 0.65s cubic-bezier(0.25, 1.25, 0.5, 1.1) forwards;
    }

    .jelly-btn {
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease;
      cursor: pointer;
    }

    .jelly-btn:active {
      animation: jellyTap 0.32s ease-out;
    }

    /* Shimmer Title */
    .shimmer-text {
      background: linear-gradient(120deg, #1e293b 0%, #6366f1 40%, #1e293b 80%);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: shimmer 6s linear infinite;
    }

    @keyframes shimmer {
      to { background-position: 200% center; }
    }

    /* Subtle Pulsing Character */
    @keyframes characterFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }

    .character-float {
      animation: characterFloat 3.5s ease-in-out infinite;
    }

    /* Custom Scrollbar for Long Content */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.4);
      border-radius: 9999px;
    }
  </style>
</head>
<body class="selection:bg-indigo-100">

  <!-- Ambient Floating Orbs -->
  <div class="floating-orbs">
    <div class="floating-orb floating-orb-1"></div>
    <div class="floating-orb floating-orb-2"></div>
    <div class="floating-orb floating-orb-3"></div>
    <div class="floating-orb floating-orb-4"></div>
  </div>

  <!-- Header -->
  <header class="relative z-20 w-full max-w-lg mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
    <div class="flex items-center gap-2 cursor-pointer" onclick="restartTest()">
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-white text-sm shadow-md font-bold">
        결
      </div>
      <div class="flex flex-col">
        <span class="font-extrabold text-slate-800 text-lg tracking-tight leading-none">Quick MBTI</span>
        <span class="text-[10px] text-slate-400 font-semibold mt-0.5">마음의 결 🧭</span>
      </div>
    </div>
    <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/70 backdrop-blur-md text-[11px] font-bold text-indigo-700 shadow-xs">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>30초 초정밀 분석</span>
    </div>
  </header>

  <!-- Main Dynamic View Container -->
  <main class="relative z-10 flex-1 w-full max-w-lg mx-auto px-5 py-3 flex flex-col justify-center">

    <!-- SCREEN 1: INTRO (시작 화면) -->
    <section id="screen-intro" class="animate-jelly-card flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-bold mb-5 shadow-xs">
        <span>✨ 1문항 1.5초 컷 · 인지부하 제로</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-black tracking-tight text-slate-800 mb-3 leading-tight">
        진짜 나를 만나는<br>
        <span class="shimmer-text">8개의 직관 질문</span>
      </h1>

      <p class="text-slate-500 text-sm md:text-base mb-6 max-w-xs leading-relaxed font-normal">
        길고 복잡한 질문에 지치셨나요?<br>
        쫀득한 젤리 인터랙션과 초단순 문항으로<br>
        당신만의 고유한 마음의 결을 밝혀냅니다.
      </p>

      <!-- Glass Graphic Hero Preview -->
      <div class="glass-card w-full rounded-3xl p-5 mb-7 text-left relative overflow-hidden">
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-2">
            <span class="text-xl">🍮</span>
            <span class="text-xs font-bold text-slate-700 tracking-wider uppercase">Squash & Stretch Matrix</span>
          </div>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-100/90 text-indigo-700 font-bold">4-Point Scale</span>
        </div>
        <div class="space-y-2 text-xs text-slate-600">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            <span><strong>초단순 1줄 카피</strong>: 읽는 피로 없는 초고속 선택</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            <span><strong>쫀득한 젤리 탄성</strong>: 만지는 재미가 살아있는 탭 모션</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            <span><strong>3D 몽글이 & 심층 에세이</strong>: 16종 전용 캐릭터와 롱폼 분석</span>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <button onclick="startTest()" class="jelly-btn btn-gradient w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 group shadow-xl">
        <span>30초 테스트 시작하기</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <p class="mt-3.5 text-[11px] text-slate-400">
        로그인 없이 즉시 무료로 진단됩니다.
      </p>
    </section>

    <!-- SCREEN 2: QUESTION (질문 화면) -->
    <section id="screen-question" class="hidden flex-col">
      <!-- Progress Indicator -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <div class="flex items-center gap-2">
            <button onclick="prevQuestion()" id="btn-prev" class="p-1 -ml-1 text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:pointer-events-none" title="이전 질문">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span id="question-category" class="text-indigo-600 bg-indigo-50/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold">에너지의 방향</span>
          </div>
          <span class="tabular-nums font-extrabold text-indigo-600 text-sm" id="question-counter">1 / 8</span>
        </div>
        <div class="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
          <div id="progress-bar" class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out" style="width: 12.5%;"></div>
        </div>
      </div>

      <!-- Question Card (Squash & Stretch Bounce) -->
      <div id="question-card-box" class="glass-card rounded-3xl p-6 md:p-7 shadow-lg mb-4 text-center relative overflow-hidden animate-jelly-card">
        <span id="question-badge" class="inline-block text-[11px] font-extrabold text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full tracking-wider uppercase mb-2">Q. 01</span>
        <h2 id="question-text" class="text-xl md:text-2xl font-black text-slate-800 leading-snug break-keep">
          주말 충전, 어디서?
        </h2>
      </div>

      <!-- 4-Level Scaled Answer Options (4점 척도 & 젤리 탭) -->
      <div class="space-y-2.5" id="options-container">
        <!-- Option A+ (Strong) -->
        <button onclick="selectOption(2)" class="jelly-btn glass-button w-full p-4 rounded-2xl text-left flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-indigo-100/80 text-indigo-600 font-black flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">A+</span>
            <div>
              <p class="text-sm font-bold text-slate-800 leading-snug" id="opt-a-strong">밖에서 사람들과 에너지 뿜뿜</p>
              <span class="text-[10px] text-indigo-500 font-semibold">완전 내 이야기예요 (스쿼시 탭)</span>
            </div>
          </div>
          <span class="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">👉</span>
        </button>

        <!-- Option A (Slight) -->
        <button onclick="selectOption(1)" class="jelly-btn glass-button w-full p-3.5 rounded-2xl text-left flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs group-hover:bg-indigo-500 group-hover:text-white transition-colors">A</span>
            <div>
              <p class="text-xs md:text-sm font-semibold text-slate-700" id="opt-a-slight">약속 잡고 카페 수다</p>
            </div>
          </div>
          <span class="text-[11px] text-slate-400 font-medium">약간 공감</span>
        </button>

        <!-- Option B (Slight) -->
        <button onclick="selectOption(-1)" class="jelly-btn glass-button w-full p-3.5 rounded-2xl text-left flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs group-hover:bg-purple-500 group-hover:text-white transition-colors">B</span>
            <div>
              <p class="text-xs md:text-sm font-semibold text-slate-700" id="opt-b-slight">집에서 편하게 쉬기</p>
            </div>
          </div>
          <span class="text-[11px] text-slate-400 font-medium">약간 공감</span>
        </button>

        <!-- Option B+ (Strong) -->
        <button onclick="selectOption(-2)" class="jelly-btn glass-button w-full p-4 rounded-2xl text-left flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-purple-100/80 text-purple-600 font-black flex items-center justify-center text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-xs">B+</span>
            <div>
              <p class="text-sm font-bold text-slate-800 leading-snug" id="opt-b-strong">침대 밖은 위험해 (고립)</p>
              <span class="text-[10px] text-purple-500 font-semibold">완전 내 이야기예요 (스쿼시 탭)</span>
            </div>
          </div>
          <span class="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">👉</span>
        </button>
      </div>
    </section>

    <!-- SCREEN 3: INTERSTITIAL LOADING (감성 분석 대기 화면) -->
    <section id="screen-loading" class="hidden flex-col items-center justify-center text-center py-16 animate-jelly-card">
      <div class="relative w-36 h-36 flex items-center justify-center mb-6">
        <div class="absolute inset-0 rounded-full bg-indigo-300/30 blur-2xl animate-ping opacity-40"></div>
        <div class="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-300 p-0.5 shadow-2xl flex items-center justify-center">
          <div class="w-full h-full rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
            <span class="text-3xl relative z-10 character-float">🔮</span>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-black text-slate-800 mb-2" id="loading-title">
        답변의 결을 읽어내는 중...
      </h3>
      <p class="text-xs text-slate-500 max-w-xs leading-relaxed" id="loading-subtitle">
        내면의 4가지 축 좌표를 정밀 대조하고 있습니다.
      </p>

      <div class="flex items-center gap-2 mt-6">
        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    </section>

    <!-- SCREEN 4: RESULT (결과 화면 - 심층 에세이 & 몽글이 에셋) -->
    <section id="screen-result" class="hidden flex-col pb-32 animate-jelly-card">

      <!-- Result Hero Card -->
      <div class="glass-card rounded-3xl p-6 md:p-8 shadow-xl text-center mb-5 relative overflow-hidden">
        <div class="absolute -top-12 -left-12 w-36 h-36 bg-purple-200/50 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -right-12 w-36 h-36 bg-indigo-200/50 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3 shadow-xs">
          <span>✨ 나의 본모습 성향</span>
        </div>

        <!-- 3D Clay Mascot Illustration (AI 3D & Vector Fallback) -->
        <div class="my-3 flex justify-center">
          <div class="relative w-48 h-48 rounded-3xl overflow-hidden bg-white/80 p-2 border border-white/90 shadow-xl character-float flex items-center justify-center">
            <img id="res-character-img" src="assets/characters/ENFP.png" alt="MBTI Character" class="w-full h-full object-cover rounded-2xl filter drop-shadow-sm" onerror="this.onerror=null; this.src='assets/characters/ENFP.svg';" />
          </div>
        </div>

        <div class="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold mb-2">
          마음의 결 몽글이: <span id="res-character-name" class="text-indigo-600 font-extrabold">피치</span>
        </div>

        <h2 id="res-mbti" class="text-4xl md:text-5xl font-black tracking-tight text-slate-800 mb-1">ENFP</h2>

        <p id="res-nickname" class="text-lg md:text-xl font-extrabold text-indigo-600 mb-3 break-keep">
          가능성을 쏘아 올리는 영감의 탐험가
        </p>

        <p id="res-summary" class="text-xs md:text-sm text-slate-600 font-normal leading-relaxed mb-6 break-keep px-2">
          새로운 가능성에 언제나 가슴이 뛰며, 사람과 아이디어의 반짝이는 잠재력을 발견하는 활력소입니다.
        </p>

        <!-- 4 Axes Detailed Precision Breakdown -->
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60 mb-5 text-left space-y-3.5 shadow-xs">
          <h4 class="text-xs font-extrabold text-slate-700 flex items-center justify-between uppercase tracking-wider mb-1">
            <span>정밀 성향 스펙트럼</span>
            <span class="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">4-Point Matrix 일치</span>
          </h4>

          <!-- Axis 1: E vs I -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span id="label-e" class="text-indigo-700 font-bold">외향 (E) 75%</span>
              <span id="label-i" class="text-slate-400">내향 (I) 25%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
              <div id="bar-e" class="bg-indigo-500 h-full rounded-full transition-all duration-1000" style="width: 75%;"></div>
            </div>
          </div>

          <!-- Axis 2: S vs N -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span id="label-s" class="text-slate-400">감각 (S) 20%</span>
              <span id="label-n" class="text-purple-700 font-bold">직관 (N) 80%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
              <div id="bar-s" class="bg-purple-500 h-full rounded-full transition-all duration-1000" style="width: 80%;"></div>
            </div>
          </div>

          <!-- Axis 3: T vs F -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span id="label-t" class="text-slate-400">사고 (T) 30%</span>
              <span id="label-f" class="text-pink-600 font-bold">감정 (F) 70%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
              <div id="bar-t" class="bg-pink-500 h-full rounded-full transition-all duration-1000" style="width: 70%;"></div>
            </div>
          </div>

          <!-- Axis 4: J vs P -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span id="label-j" class="text-slate-400">판단 (J) 15%</span>
              <span id="label-p" class="text-emerald-600 font-bold">인식 (P) 85%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
              <div id="bar-j" class="bg-emerald-500 h-full rounded-full transition-all duration-1000" style="width: 85%;"></div>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap items-center justify-center gap-1.5" id="res-tags">
        </div>
      </div>

      <!-- 📖 심층 분석 에세이 1: 본질 탐구 (나도 몰랐던 내 마음의 결) -->
      <div class="glass-card rounded-3xl p-6 shadow-md mb-4 text-left">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">🔍</span>
          <h3 class="text-sm font-extrabold text-slate-800">본질 탐구: 나도 몰랐던 내 마음의 결</h3>
        </div>
        <div class="space-y-3 text-xs leading-relaxed text-slate-600">
          <div class="bg-white/50 rounded-2xl p-3.5 border border-slate-100">
            <span class="font-bold text-slate-800 block mb-1">💡 남들은 모르는 나의 기본 모드</span>
            <p id="res-essence-mode" class="break-keep"></p>
          </div>
          <div class="bg-white/50 rounded-2xl p-3.5 border border-slate-100">
            <span class="font-bold text-slate-800 block mb-1">🌙 겉으로 보이는 모습 vs 혼자 있을 때 진짜 나</span>
            <p id="res-essence-inner" class="break-keep"></p>
          </div>
        </div>
      </div>

      <!-- 📖 심층 분석 에세이 2: 인간관계와 에너지 -->
      <div class="glass-card rounded-3xl p-6 shadow-md mb-4 text-left">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">🤝</span>
          <h3 class="text-sm font-extrabold text-slate-800">인간관계와 에너지: 나와 세상 사이의 거리</h3>
        </div>
        <div class="space-y-3 text-xs leading-relaxed text-slate-600">
          <div class="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-100/60">
            <span class="font-bold text-emerald-800 block mb-1">🍵 내가 편안함을 느끼는 사람의 결</span>
            <p id="res-relation-comfort" class="break-keep text-slate-700"></p>
          </div>
          <div class="bg-rose-50/50 rounded-2xl p-3.5 border border-rose-100/60">
            <span class="font-bold text-rose-800 block mb-1">🚫 조용히 마음의 문을 닫게 되는 순간 (손절 버튼)</span>
            <p id="res-relation-cutoff" class="break-keep text-slate-700"></p>
          </div>
        </div>
      </div>

      <!-- 📖 심층 분석 에세이 3: 방전과 회복 -->
      <div class="glass-card rounded-3xl p-6 shadow-md mb-4 text-left">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">🌿</span>
          <h3 class="text-sm font-extrabold text-slate-800">방전과 회복: 스트레스 임계점과 처방전</h3>
        </div>
        <div class="space-y-3 text-xs leading-relaxed text-slate-600">
          <div class="bg-amber-50/50 rounded-2xl p-3.5 border border-amber-100/60">
            <span class="font-bold text-amber-800 block mb-1">⚡ 멘탈이 무너질 때 나타나는 전형적인 신호</span>
            <p id="res-stress-signal" class="break-keep text-slate-700"></p>
          </div>
          <div class="bg-indigo-50/50 rounded-2xl p-3.5 border border-indigo-100/60">
            <span class="font-bold text-indigo-800 block mb-1">🕊️ 나를 다시 숨 쉬게 만드는 혼자만의 처방전</span>
            <p id="res-stress-cure" class="break-keep text-slate-700"></p>
          </div>
        </div>
      </div>

      <!-- 케미 레이더 (찰떡궁합 & 거리두기) -->
      <div class="grid grid-cols-2 gap-3 text-left mb-6">
        <div class="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 shadow-xs">
          <span class="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block mb-1">❤️ 찰떡 케미</span>
          <p id="res-best-mbti" class="text-sm font-black text-slate-800">INFJ, INTJ</p>
          <p id="res-best-desc" class="text-[11px] text-slate-500 mt-1 leading-snug break-keep">내 깊은 생각까지 알아봐 주는 소울메이트</p>
        </div>
        <div class="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 shadow-xs">
          <span class="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">⚡ 거리두기 케미</span>
          <p id="res-worst-mbti" class="text-sm font-black text-slate-800">ISTJ, ESTJ</p>
          <p id="res-worst-desc" class="text-[11px] text-slate-500 mt-1 leading-snug break-keep">엄격한 규칙 앞에서 숨이 막힐 수도 있어요</p>
        </div>
      </div>
    </section>

  </main>

  <!-- 하단 고정 플로팅 액션 바 (Sticky Footer - ieum.one 벤치마크) -->
  <div id="sticky-action-bar" class="hidden fixed bottom-0 inset-x-0 z-40 p-3.5 pb-6 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 shadow-2xl">
    <div class="max-w-lg mx-auto flex items-center justify-between gap-2">
      <!-- 🔄 다시하기 -->
      <button onclick="restartTest()" class="jelly-btn px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="hidden sm:inline">다시하기</span>
      </button>

      <!-- 💬 결과 링크 복사 -->
      <button onclick="shareResult()" class="jelly-btn px-4 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>결과 링크</span>
      </button>

      <!-- 📸 인스타 스토리 카드 저장 (동적 캔버스) -->
      <button onclick="downloadStoryCard()" id="btn-story-download" class="jelly-btn flex-1 py-3 px-4 rounded-2xl btn-gradient text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>스토리 카드 저장 (9:16)</span>
      </button>
    </div>
  </div>

  <!-- Toast Notification -->
  <div id="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold backdrop-blur-md shadow-2xl opacity-0 transition-opacity duration-300 pointer-events-none flex items-center gap-2">
    <span id="toast-text">✨ 링크가 클립보드에 복사되었습니다!</span>
  </div>

  <!-- Footer -->
  <footer class="relative z-10 w-full max-w-lg mx-auto px-5 py-6 text-center text-xs text-slate-400 border-t border-slate-200/50">
    <p>© 2026 Quick MBTI · 마음의 결 (Inner Flow Lab)</p>
    <p class="mt-1 text-[11px] text-slate-400/80">3D 클레이 몽글이 에셋 & 4점 척도 정밀 알고리즘</p>
  </footer>

  <!-- Script: 8 문항 다이어트 데이터, 16개 MBTI DB & 캔버스 엔진 -->
  <script>
    // ⚡ 초단순 1줄 직관형 문항 데이터 (Notion 2장 명세 완벽 반영)
    const questions = [
      {
        axis: 'EI',
        category: '에너지의 방향',
        badge: 'Q. 01',
        text: '주말 충전, 어디서?',
        optAStrong: '밖에서 사람들과 에너지 뿜뿜',
        optASlight: '약속 잡고 카페 수다',
        optBSlight: '집에서 편하게 쉬기',
        optBStrong: '침대 밖은 위험해 (고립)',
        letterA: 'E',
        letterB: 'I'
      },
      {
        axis: 'SN',
        category: '인식과 생각의 결',
        badge: 'Q. 02',
        text: '멍때릴 때 머릿속은?',
        optAStrong: '보이는 그대로 멍~ 아무 생각 없음',
        optASlight: '오늘 할 일이나 현실적인 일정',
        optBSlight: '꼬리에 꼬리를 무는 상상',
        optBStrong: '끝없는 상상의 나래와 평행우주',
        letterA: 'S',
        letterB: 'N'
      },
      {
        axis: 'TF',
        category: '공감과 반응',
        badge: 'Q. 03',
        text: '"우울해서 빵 샀어"',
        optAStrong: '무슨 빵 샀어? 빵이랑 우울한 게 무슨 상관?',
        optASlight: '무슨 빵인지 궁금해. 괜찮아?',
        optBSlight: '속상하겠다, 맛있는 거 먹고 풀자',
        optBStrong: '무슨 일 있어? 기분 왜 그래 ㅠㅠ 마음 아파',
        letterA: 'T',
        letterB: 'F'
      },
      {
        axis: 'JP',
        category: '계획과 생활 양식',
        badge: 'Q. 04',
        text: '여행 전날 밤 나의 상태',
        optAStrong: '시간표·분 단위 동선·체크리스트 완료',
        optASlight: '핵심 목적지와 숙소 동선은 짜둠',
        optBSlight: '필수 짐만 챙기고 현지에서 유동적으로',
        optBStrong: '내일 아침에 대충 챙김! 무계획 즉흥 여행',
        letterA: 'J',
        letterB: 'P'
      },
      {
        axis: 'EI',
        category: '사회적 상호작용',
        badge: 'Q. 05',
        text: '낯선 모임에 갔을 때',
        optAStrong: '먼저 말 걸며 분위기 주도하고 번호 교환',
        optASlight: '눈 마주치면 자연스럽게 대화 참여',
        optBSlight: '다가와 주는 사람과 조용히 1:1 대화',
        optBStrong: '조용히 구석에서 관찰하며 조기 귀가 각 재기',
        letterA: 'E',
        letterB: 'I'
      },
      {
        axis: 'SN',
        category: '대화와 관심사',
        badge: 'Q. 06',
        text: '더 끌리는 대화 주제',
        optAStrong: '오늘의 핫이슈, 맛집, 생생한 현실 일상 썰',
        optASlight: '최근 경험이나 실질적인 재테크/정보',
        optBSlight: '인생관, 가치관, 사람의 심리 이야기',
        optBStrong: '우주, 미래, 철학적 상상과 \\'만약에\\' 토론',
        letterA: 'S',
        letterB: 'N'
      },
      {
        axis: 'TF',
        category: '위로와 문제 해결',
        badge: 'Q. 07',
        text: '시험 떨어진 친구에게',
        optAStrong: '원인 분석 & 다음 시험 현실적 해결책 제시',
        optASlight: '위로 후 "다음엔 어떻게 할지" 조심스레 의논',
        optBSlight: '"고생 많았어" 토닥이며 속상한 마음 달래기',
        optBStrong: '따뜻한 위로와 맛있는 밥 사주며 온전히 편 들어주기',
        letterA: 'T',
        letterB: 'F'
      },
      {
        axis: 'JP',
        category: '일과 마감 스타일',
        badge: 'Q. 08',
        text: '마감 일주일 전 과제',
        optAStrong: '이미 절반 이상 끝내두고 여유롭게 검토 중',
        optASlight: '매일 할당량을 정해서 미리미리 끝내는 편',
        optBSlight: '마감이 다가올 때쯤 집중해서 시작',
        optBStrong: '마감 전날 밤 초인적 아드레날린 폭발 벼락치기',
        letterA: 'J',
        letterB: 'P'
      }
    ];

    // 16개 MBTI 심층 롱폼 분석 데이터베이스 (Anti-AI 에디토리얼 스타일)
    const mbtiData = ${JSON.stringify(mbtiData, null, 2)};

    // State Variables
    let currentIdx = 0;
    let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    let answersHistory = [];
    let currentResultMbti = 'ENFP';

    function startTest() {
      document.getElementById('screen-intro').classList.add('hidden');
      document.getElementById('screen-question').classList.remove('hidden');
      document.getElementById('screen-result').classList.add('hidden');
      document.getElementById('sticky-action-bar').classList.add('hidden');
      currentIdx = 0;
      scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
      answersHistory = [];
      renderQuestion();
    }

    function renderQuestion() {
      const q = questions[currentIdx];
      document.getElementById('question-counter').innerText = \`\${currentIdx + 1} / \${questions.length}\`;
      document.getElementById('question-category').innerText = q.category;
      document.getElementById('question-badge').innerText = q.badge;
      document.getElementById('question-text').innerHTML = q.text.replace(/\\n/g, '<br>');

      // Update Options Text
      document.getElementById('opt-a-strong').innerText = q.optAStrong;
      document.getElementById('opt-a-slight').innerText = q.optASlight;
      document.getElementById('opt-b-slight').innerText = q.optBSlight;
      document.getElementById('opt-b-strong').innerText = q.optBStrong;

      // Progress bar
      const pct = ((currentIdx + 1) / questions.length) * 100;
      document.getElementById('progress-bar').style.width = \`\${pct}%\`;

      // Prev Button state
      document.getElementById('btn-prev').disabled = currentIdx === 0;

      // Card Jelly Animation Refresh
      const qCard = document.getElementById('question-card-box');
      qCard.classList.remove('animate-jelly-card');
      void qCard.offsetWidth; // Force Reflow
      qCard.classList.add('animate-jelly-card');
    }

    // value: +2 (A+ Strong), +1 (A Slight), -1 (B Slight), -2 (B+ Strong)
    function selectOption(value) {
      const q = questions[currentIdx];
      answersHistory[currentIdx] = {
        axis: q.axis,
        score: value
      };

      setTimeout(() => {
        if (currentIdx < questions.length - 1) {
          currentIdx++;
          renderQuestion();
        } else {
          finishTest();
        }
      }, 150);
    }

    function prevQuestion() {
      if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
      }
    }

    function finishTest() {
      scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
      answersHistory.forEach(item => {
        if (item) {
          scores[item.axis] += item.score;
        }
      });

      document.getElementById('screen-question').classList.add('hidden');
      document.getElementById('screen-loading').classList.remove('hidden');

      const loadingTexts = [
        { title: '8개의 답변 조각을 모으는 중...', sub: '당신이 머문 시선과 직관의 흔적을 분석합니다.' },
        { title: '내면의 4가지 축 좌표를 계산 중...', sub: '에너지, 인식, 판단, 생활 양식의 균형을 대조합니다.' },
        { title: '3D 몽글이 캐릭터 매칭 완료!', sub: '당신만의 고유한 마음의 결이 곧 드러납니다.' }
      ];

      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < loadingTexts.length) {
          document.getElementById('loading-title').innerText = loadingTexts[step].title;
          document.getElementById('loading-subtitle').innerText = loadingTexts[step].sub;
        } else {
          clearInterval(interval);
          showResult();
        }
      }, 600);
    }

    function showResult() {
      document.getElementById('screen-loading').classList.add('hidden');
      document.getElementById('screen-result').classList.remove('hidden');
      document.getElementById('sticky-action-bar').classList.remove('hidden');

      const ei = scores.EI >= 0 ? 'E' : 'I';
      const sn = scores.SN >= 0 ? 'S' : 'N';
      const tf = scores.TF >= 0 ? 'T' : 'F';
      const jp = scores.JP >= 0 ? 'J' : 'P';
      const finalMbti = \`\${ei}\${sn}\${tf}\${jp}\`;
      currentResultMbti = finalMbti;

      function getPercent(score) {
        const abs = Math.abs(score);
        return Math.min(95, Math.round(52 + (abs / 4) * 43));
      }

      const pctE = scores.EI >= 0 ? getPercent(scores.EI) : 100 - getPercent(scores.EI);
      const pctS = scores.SN >= 0 ? getPercent(scores.SN) : 100 - getPercent(scores.SN);
      const pctT = scores.TF >= 0 ? getPercent(scores.TF) : 100 - getPercent(scores.TF);
      const pctJ = scores.JP >= 0 ? getPercent(scores.JP) : 100 - getPercent(scores.JP);

      const profile = mbtiData[finalMbti] || mbtiData['ENFP'];

      // Bind Basic Profile
      document.getElementById('res-mbti').innerText = finalMbti;
      document.getElementById('res-nickname').innerText = profile.nickname;
      document.getElementById('res-summary').innerText = profile.summary;
      const charImgEl = document.getElementById('res-character-img');
      charImgEl.onerror = function() {
        this.onerror = null;
        this.src = \`assets/characters/\${finalMbti}.svg\`;
      };
      charImgEl.src = \`assets/characters/\${finalMbti}.png\`;
      document.getElementById('res-character-name').innerText = \`\${profile.characterName} (\${profile.characterDesc})\`;

      // Bind Spectrum Bars
      document.getElementById('label-e').innerText = \`외향 (E) \${pctE}%\`;
      document.getElementById('label-i').innerText = \`내향 (I) \${100 - pctE}%\`;
      document.getElementById('bar-e').style.width = \`\${pctE}%\`;

      document.getElementById('label-s').innerText = \`감각 (S) \${pctS}%\`;
      document.getElementById('label-n').innerText = \`직관 (N) \${100 - pctS}%\`;
      document.getElementById('bar-s').style.width = \`\${pctS}%\`;

      document.getElementById('label-t').innerText = \`사고 (T) \${pctT}%\`;
      document.getElementById('label-f').innerText = \`감정 (F) \${100 - pctT}%\`;
      document.getElementById('bar-t').style.width = \`\${pctT}%\`;

      document.getElementById('label-j').innerText = \`판단 (J) \${pctJ}%\`;
      document.getElementById('label-p').innerText = \`인식 (P) \${100 - pctJ}%\`;
      document.getElementById('bar-j').style.width = \`\${pctJ}%\`;

      // Bind Tags
      const tagsContainer = document.getElementById('res-tags');
      tagsContainer.innerHTML = '';
      profile.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-slate-700 text-xs font-bold shadow-xs';
        span.innerText = t;
        tagsContainer.appendChild(span);
      });

      // Bind Editorial Long-form Essays
      document.getElementById('res-essence-mode').innerText = profile.essence.mode;
      document.getElementById('res-essence-inner').innerText = profile.essence.inner;
      document.getElementById('res-relation-comfort').innerText = profile.relationship.comfort;
      document.getElementById('res-relation-cutoff').innerText = profile.relationship.cutoff;
      document.getElementById('res-stress-signal').innerText = profile.stress.signal;
      document.getElementById('res-stress-cure').innerText = profile.stress.cure;

      // Bind Chemistry
      document.getElementById('res-best-mbti').innerText = profile.best.type;
      document.getElementById('res-best-desc').innerText = profile.best.desc;
      document.getElementById('res-worst-mbti').innerText = profile.worst.type;
      document.getElementById('res-worst-desc').innerText = profile.worst.desc;

      // Confetti Celebration
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#8b5cf6', '#ec4899', '#38bdf8', '#fbbf24']
        });
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function restartTest() {
      document.getElementById('screen-result').classList.add('hidden');
      document.getElementById('screen-loading').classList.add('hidden');
      document.getElementById('screen-question').classList.add('hidden');
      document.getElementById('sticky-action-bar').classList.add('hidden');
      document.getElementById('screen-intro').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function shareResult() {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('✨ 링크가 클립보드에 복사되었습니다!');
        }).catch(() => {
          showToast('✨ 링크가 클립보드에 복사되었습니다!');
        });
      } else {
        showToast('✨ 링크가 클립보드에 복사되었습니다!');
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      if (msg) toastText.innerText = msg;
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
      }, 2400);
    }

    // 📸 인스타 스토리 9:16 (1080x1920) 실시간 동적 캔버스 생성 및 다운로드
    async function downloadStoryCard() {
      const btn = document.getElementById('btn-story-download');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>⏳ 카드 생성 중...</span>';

      try {
        const mbti = currentResultMbti;
        const profile = mbtiData[mbti] || mbtiData['ENFP'];

        function getPercent(score) {
          const abs = Math.abs(score);
          return Math.min(95, Math.round(52 + (abs / 4) * 43));
        }

        const pctE = scores.EI >= 0 ? getPercent(scores.EI) : 100 - getPercent(scores.EI);
        const pctS = scores.SN >= 0 ? getPercent(scores.SN) : 100 - getPercent(scores.SN);
        const pctT = scores.TF >= 0 ? getPercent(scores.TF) : 100 - getPercent(scores.TF);
        const pctJ = scores.JP >= 0 ? getPercent(scores.JP) : 100 - getPercent(scores.JP);

        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');

        // 1. Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
        bgGrad.addColorStop(0, '#f1f5f9');
        bgGrad.addColorStop(0.3, '#ede9fe');
        bgGrad.addColorStop(0.7, '#fce7f3');
        bgGrad.addColorStop(1, '#e0e7ff');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);

        // 2. Ambient Floating Blur Orbs
        function drawOrb(x, y, r, color) {
          ctx.save();
          const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
          radGrad.addColorStop(0, color);
          radGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        drawOrb(200, 260, 450, 'rgba(199, 210, 254, 0.7)');
        drawOrb(900, 800, 500, 'rgba(243, 232, 255, 0.8)');
        drawOrb(300, 1500, 550, 'rgba(254, 205, 211, 0.7)');

        // Helper: Rounded Rectangle
        function roundRect(ctx, x, y, w, h, r) {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
        }

        // 3. Main Glass Card Container
        ctx.save();
        ctx.shadowColor = 'rgba(99, 102, 241, 0.15)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetY = 25;
        roundRect(ctx, 80, 100, 920, 1720, 56);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.stroke();
        ctx.restore();

        // 4. Header Badge
        ctx.save();
        roundRect(ctx, 360, 160, 360, 56, 28);
        ctx.fillStyle = '#e0e7ff';
        ctx.fill();
        ctx.font = 'bold 24px Pretendard, sans-serif';
        ctx.fillStyle = '#4338ca';
        ctx.textAlign = 'center';
        ctx.fillText('✨ QUICK MBTI · 마음의 결', 540, 198);
        ctx.restore();

        // 5. Load & Draw Character (AI 3D Mascot with SVG Fallback)
        const charImg = new Image();
        charImg.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          charImg.onload = resolve;
          charImg.onerror = () => {
            charImg.onerror = resolve;
            charImg.src = \`assets/characters/\${mbti}.svg\`;
          };
          charImg.src = \`assets/characters/\${mbti}.png\`;
        });

        // Draw character inside a stylish rounded card container
        ctx.save();
        roundRect(ctx, 540 - 180, 240, 360, 360, 48);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(99, 102, 241, 0.18)';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 16;
        ctx.fill();
        ctx.clip();
        ctx.drawImage(charImg, 540 - 180, 240, 360, 360);
        ctx.restore();

        // 6. MBTI Type & Title
        ctx.save();
        ctx.font = '900 96px "Plus Jakarta Sans", Pretendard, sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.fillText(mbti, 540, 710);

        ctx.font = 'bold 38px Pretendard, sans-serif';
        ctx.fillStyle = '#4f46e5';
        ctx.fillText(profile.nickname, 540, 770);

        // Sub summary
        ctx.font = 'normal 26px Pretendard, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(profile.summary.length > 34 ? profile.summary.slice(0, 34) + '...' : profile.summary, 540, 820);
        ctx.restore();

        // 7. Precision Spectrum Bars (4 Axes)
        ctx.save();
        const startY = 880;
        const barWidth = 800;
        const barHeight = 22;
        const barX = 140;

        const axes = [
          { labelA: \`외향 (E) \${pctE}%\`, labelB: \`내향 (I) \${100 - pctE}%\`, val: pctE, col: '#6366f1' },
          { labelA: \`감각 (S) \${pctS}%\`, labelB: \`직관 (N) \${100 - pctS}%\`, val: pctS, col: '#a855f7' },
          { labelA: \`사고 (T) \${pctT}%\`, labelB: \`감정 (F) \${100 - pctT}%\`, val: pctT, col: '#ec4899' },
          { labelA: \`판단 (J) \${pctJ}%\`, labelB: \`인식 (P) \${100 - pctJ}%\`, val: pctJ, col: '#10b981' },
        ];

        axes.forEach((axis, idx) => {
          const cy = startY + idx * 80;
          ctx.font = 'bold 24px Pretendard, sans-serif';
          ctx.fillStyle = '#334155';
          ctx.textAlign = 'left';
          ctx.fillText(axis.labelA, barX, cy);

          ctx.fillStyle = '#64748b';
          ctx.textAlign = 'right';
          ctx.fillText(axis.labelB, barX + barWidth, cy);

          // Track
          roundRect(ctx, barX, cy + 12, barWidth, barHeight, 11);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();

          // Bar
          const fillW = (barWidth * axis.val) / 100;
          roundRect(ctx, barX, cy + 12, fillW, barHeight, 11);
          ctx.fillStyle = axis.col;
          ctx.fill();
        });
        ctx.restore();

        // 8. Essence Quote Card
        ctx.save();
        roundRect(ctx, 140, 1220, 800, 240, 32);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 26px Pretendard, sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'left';
        ctx.fillText('💡 나도 몰랐던 내 마음의 결', 180, 1275);

        ctx.font = 'normal 22px Pretendard, sans-serif';
        ctx.fillStyle = '#475569';
        const essenceShort = profile.essence.mode.length > 70 ? profile.essence.mode.slice(0, 70) + '...' : profile.essence.mode;
        // Simple wrap
        ctx.fillText(essenceShort.slice(0, 35), 180, 1325);
        ctx.fillText(essenceShort.slice(35), 180, 1365);

        ctx.font = 'bold 22px Pretendard, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText(\`❤️ 찰떡 케미: \${profile.best.type} (\${profile.best.desc})\`, 180, 1420);
        ctx.restore();

        // 9. Tags
        ctx.save();
        ctx.font = 'bold 24px Pretendard, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText(profile.tags.join('   '), 540, 1530);
        ctx.restore();

        // 10. Footer CTA & Watermark
        ctx.save();
        ctx.font = 'bold 30px Pretendard, sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.fillText('지금 바로 내 마음의 결 알아보기 🧭', 540, 1630);

        ctx.font = 'normal 22px Pretendard, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText('quick-mbti.vercel.app', 540, 1675);
        ctx.restore();

        // 11. Trigger Download & Share
        canvas.toBlob((blob) => {
          if (!blob) return;
          const fileName = \`Quick-MBTI-\${mbti}.png\`;
          const file = new File([blob], fileName, { type: 'image/png' });

          // Web Share API if supported
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: \`Quick MBTI 나의 결과: \${mbti}\`,
              text: \`내 MBTI는 \${mbti} (\${profile.nickname})! 30초 초정밀 마음의 결 진단 결과:\`,
              url: window.location.href
            }).catch(() => {});
          }

          // Also trigger direct download to gallery
          const link = document.createElement('a');
          link.download = fileName;
          link.href = URL.createObjectURL(blob);
          link.click();
          showToast('📸 인스타 스토리 카드가 저장되었습니다!');
        }, 'image/png');

      } catch (err) {
        console.error('Failed to generate story card:', err);
        showToast('카드 생성 중 오류가 발생했습니다.');
      } finally {
        btn.innerHTML = originalText;
      }
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), htmlContent, 'utf-8');
console.log('Successfully generated complete index.html!');
