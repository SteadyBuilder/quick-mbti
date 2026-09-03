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
  { name: '16 3D Mascots Image binding', str: 'assets/characters/${finalMbti}.svg' },
  { name: 'Anti-AI Editorial Essence Mode', str: 'id="res-essence-mode"' },
  { name: 'Anti-AI Editorial Essence Inner', str: 'id="res-essence-inner"' },
  { name: 'Relationship Comfort', str: 'id="res-relation-comfort"' },
  { name: 'Relationship Cutoff', str: 'id="res-relation-cutoff"' },
  { name: 'Stress Signal', str: 'id="res-stress-signal"' },
  { name: 'Stress Cure', str: 'id="res-stress-cure"' },
  { name: 'Questions Diet Copy (주말 충전, 어디서?)', str: '주말 충전, 어디서?' },
  { name: '4-Point Matrix Scale', str: 'optAStrong' }
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
