const fs = require('fs');
const path = require('path');
const { mbtiData } = require('./mbti_database');

console.log('--- Quick MBTI Verification Suite ---');

// 1. Check all 16 types exist
const types = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

let allValid = true;

types.forEach(t => {
  if (!mbtiData[t]) {
    console.error(`Missing MBTI data for: ${t}`);
    allValid = false;
  } else {
    const d = mbtiData[t];
    if (!d.nickname || !d.summary || !d.essence || !d.relationship || !d.stress || !d.best || !d.worst) {
      console.error(`Incomplete fields for: ${t}`);
      allValid = false;
    }
  }

  const svgPath = path.join(__dirname, '..', 'assets', 'characters', `${t}.svg`);
  if (!fs.existsSync(svgPath)) {
    console.error(`Missing character SVG for: ${t}`);
    allValid = false;
  }
});

// 2. Verify index.html contains all critical sections
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const checks = [
  { name: 'Jelly Bounce CSS keyframes', str: '@keyframes jellyBounce' },
  { name: 'Jelly Tap CSS keyframes', str: '@keyframes jellyTap' },
  { name: 'Sticky Action Bar', str: 'id="sticky-action-bar"' },
  { name: 'Story Card Generator', str: 'function downloadStoryCard' },
  { name: 'Counseling Note 1 (마음의 결)', str: '상담 노트 1: 내가 지닌 고유한 마음의 결' },
  { name: 'Counseling Note 2 (관계 속 숨 쉬는 법)', str: '상담 노트 2: 관계 속에서 편안하게 숨 쉬는 법' },
  { name: 'Counseling Note 3 (마음 처방전)', str: '상담 노트 3: 지친 나를 토닥이는 마음 처방전' },
  { name: 'Chemistry Match Screen', str: 'id="screen-chemistry"' },
  { name: 'Chemistry Open Function', str: 'function openChemistry' },
  { name: 'View Target Full Profile Function', str: 'function viewTargetFullProfile' },
  { name: 'Back to Original Result Function', str: 'function backToMyOriginalResult' },
  { name: '2026 Dynamic Question Pool', str: 'const questionPool =' },
  { name: 'Family Mode Dynamic Question Pool', str: 'const familyQuestionPool =' },
  { name: 'Dynamic Question Generator', str: 'function generateDynamicQuestions' },
  { name: 'Situation / Mode Switcher Function', str: 'function setTestMode' },
  { name: '4-Point Matrix Scale', str: 'optAStrong' },
  { name: 'Main Intro Network Entry Banner', str: 'MBTI 소셜 네트워크 관계망' },
  { name: 'Network Entry Button', str: "openOrbitScreen('screen-intro')" },
  { name: 'Change My MBTI Modal', str: 'id="modal-change-my-mbti"' },
  { name: 'Change My MBTI Function', str: 'function selectNewMyMbti' },
  { name: 'Orbit Dynamic Back Function', str: 'function backFromOrbit()' },
  { name: 'Reset Orbit Layout Button', str: 'id="btn-reset-orbit-layout"' },
  { name: 'Reset Orbit Positions Function', str: 'function resetOrbitPositions()' },
  { name: 'Friends In Network Section Title', str: '관계망에 함께 머무는 친구들' },
  { name: 'Firebase Modular SDK (v10)', str: 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js' },
  { name: 'Firebase App Config (quick-mbti)', str: 'projectId: "quick-mbti"' },
  { name: 'QuickMbtiCloud Service Object', str: 'window.QuickMbtiCloud = QuickMbtiCloud;' },
  { name: 'Firestore Result Auto-Sync', str: 'QuickMbtiCloud.saveUserResult(finalMbti, scores)' },
  { name: 'Firestore Orbit Sync on Storage', str: 'QuickMbtiCloud.syncRelations(orbitRelations)' },
  { name: 'Friend Invitation Referral Engine', str: 'copyMyInviteLink' }
];

checks.forEach(c => {
  if (!html.includes(c.str)) {
    console.error(`Failed check: ${c.name}`);
    allValid = false;
  } else {
    console.log(`[PASS] ${c.name}`);
  }
});

if (allValid) {
  console.log('✅ ALL VERIFICATION CHECKS PASSED!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}

