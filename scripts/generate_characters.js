const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'characters');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const characters = [
  {
    type: 'INTJ',
    name: '아이작',
    title: '미래 전략가',
    gradStart: '#818cf8',
    gradEnd: '#4338ca',
    glow: '#c7d2fe',
    blush: '#f472b6',
    faceType: 'focused',
    prop: 'chess'
  },
  {
    type: 'INTP',
    name: '테오',
    title: '논리 사색가',
    gradStart: '#34d399',
    gradEnd: '#059669',
    glow: '#a7f3d0',
    blush: '#fb7185',
    faceType: 'glasses_chill',
    prop: 'book'
  },
  {
    type: 'ENTJ',
    name: '빅터',
    title: '비전 총사령관',
    gradStart: '#60a5fa',
    gradEnd: '#1d4ed8',
    glow: '#bfdbfe',
    blush: '#f472b6',
    faceType: 'confident',
    prop: 'crown'
  },
  {
    type: 'ENTP',
    name: '로키',
    title: '재치 변론가',
    gradStart: '#fb923c',
    gradEnd: '#ea580c',
    glow: '#fed7aa',
    blush: '#f43f5e',
    faceType: 'winking',
    prop: 'spark'
  },
  {
    type: 'INFJ',
    name: '루나',
    title: '신비 조언자',
    gradStart: '#a78bfa',
    gradEnd: '#6d28d9',
    glow: '#ddd6fe',
    blush: '#f472b6',
    faceType: 'serene',
    prop: 'tea'
  },
  {
    type: 'INFP',
    name: '로아',
    title: '낭만 중재자',
    gradStart: '#f472b6',
    gradEnd: '#be185d',
    glow: '#fbcfe8',
    blush: '#fb7185',
    faceType: 'dreamy',
    prop: 'flower'
  },
  {
    type: 'ENFJ',
    name: '솔',
    title: '다정 선구자',
    gradStart: '#fb7185',
    gradEnd: '#e11d48',
    glow: '#fecdd3',
    blush: '#fda4af',
    faceType: 'warm_smile',
    prop: 'heart_torch'
  },
  {
    type: 'ENFP',
    name: '피치',
    title: '자유 탐험가',
    gradStart: '#f43f5e',
    gradEnd: '#db2777',
    glow: '#ffe4e6',
    blush: '#f43f5e',
    faceType: 'excited',
    prop: 'balloons'
  },
  {
    type: 'ISTJ',
    name: '마일즈',
    title: '신뢰 현실주의자',
    gradStart: '#64748b',
    gradEnd: '#334155',
    glow: '#cbd5e1',
    blush: '#f472b6',
    faceType: 'calm',
    prop: 'clipboard'
  },
  {
    type: 'ISFJ',
    name: '클로이',
    title: '헌신 수호자',
    gradStart: '#2dd4bf',
    gradEnd: '#0f766e',
    glow: '#99f6e4',
    blush: '#f472b6',
    faceType: 'gentle',
    prop: 'scarf'
  },
  {
    type: 'ESTJ',
    name: '오스틴',
    title: '질서 총괄자',
    gradStart: '#38bdf8',
    gradEnd: '#0369a1',
    glow: '#bae6fd',
    blush: '#f472b6',
    faceType: 'firm',
    prop: 'compass'
  },
  {
    type: 'ESFJ',
    name: '벨라',
    title: '친절 협력가',
    gradStart: '#fbbf24',
    gradEnd: '#d97706',
    glow: '#fde68a',
    blush: '#f43f5e',
    faceType: 'radiant',
    prop: 'ribbon'
  },
  {
    type: 'ISTP',
    name: '제트',
    title: '만능 재주꾼',
    gradStart: '#2dd4bf',
    gradEnd: '#134e4a',
    glow: '#a7f3d0',
    blush: '#f472b6',
    faceType: 'chill',
    prop: 'wrench'
  },
  {
    type: 'ISFP',
    name: '밀로',
    title: '순수 예술가',
    gradStart: '#22d3ee',
    gradEnd: '#0e7490',
    glow: '#cffafe',
    blush: '#f472b6',
    faceType: 'soft',
    prop: 'palette'
  },
  {
    type: 'ESTP',
    name: '레오',
    title: '순발 승부사',
    gradStart: '#facc15',
    gradEnd: '#ca8a04',
    glow: '#fef08a',
    blush: '#f43f5e',
    faceType: 'sunglasses',
    prop: 'lightning'
  },
  {
    type: 'ESFP',
    name: '조이',
    title: '열정 연예인',
    gradStart: '#e879f9',
    gradEnd: '#a21caf',
    glow: '#f5d0fe',
    blush: '#f43f5e',
    faceType: 'star_eyes',
    prop: 'disco_star'
  }
];

function generateSVG(c) {
  const gradId = `clayGrad_${c.type}`;
  const highlightId = `hiGrad_${c.type}`;
  const shadowId = `shGrad_${c.type}`;
  const bgGlowId = `bgGlow_${c.type}`;

  let faceContent = '';
  if (c.faceType === 'focused') {
    faceContent = `
      <circle cx="170" cy="195" r="22" fill="none" stroke="#e0e7ff" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <circle cx="230" cy="195" r="22" fill="none" stroke="#e0e7ff" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <path d="M192 195 L208 195" stroke="#e0e7ff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="170" cy="195" r="7" fill="#1e1b4b"/>
      <circle cx="173" cy="192" r="2.5" fill="#ffffff"/>
      <circle cx="230" cy="195" r="7" fill="#1e1b4b"/>
      <circle cx="233" cy="192" r="2.5" fill="#ffffff"/>
      <path d="M192 225 Q200 230 208 225" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'glasses_chill') {
    faceContent = `
      <rect x="145" y="175" width="46" height="40" rx="14" fill="none" stroke="#d1fae5" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <rect x="209" y="175" width="46" height="40" rx="14" fill="none" stroke="#d1fae5" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <path d="M191 195 L209 195" stroke="#d1fae5" stroke-width="4"/>
      <circle cx="168" cy="195" r="6" fill="#064e3b"/>
      <circle cx="170" cy="193" r="2" fill="#fff"/>
      <circle cx="232" cy="195" r="6" fill="#064e3b"/>
      <circle cx="234" cy="193" r="2" fill="#fff"/>
      <path d="M192 225 Q200 232 208 225" stroke="#064e3b" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'confident') {
    faceContent = `
      <circle cx="165" cy="195" r="8" fill="#0f172a"/>
      <circle cx="168" cy="191" r="3" fill="#fff"/>
      <circle cx="235" cy="195" r="8" fill="#0f172a"/>
      <circle cx="238" cy="191" r="3" fill="#fff"/>
      <path d="M188 222 Q202 234 216 220" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'winking') {
    faceContent = `
      <path d="M155 198 Q166 186 177 198" stroke="#431407" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="232" cy="194" r="8" fill="#431407"/>
      <circle cx="235" cy="190" r="3" fill="#fff"/>
      <path d="M190 220 Q200 238 212 220 Z" fill="#9a3412"/>
      <path d="M194 227 Q200 235 208 227" fill="#fda4af"/>
    `;
  } else if (c.faceType === 'serene') {
    faceContent = `
      <path d="M152 196 Q165 206 178 196" stroke="#2e1065" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M222 196 Q235 206 248 196" stroke="#2e1065" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M192 223 Q200 230 208 223" stroke="#2e1065" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'dreamy') {
    faceContent = `
      <circle cx="165" cy="194" r="9" fill="#500724"/>
      <circle cx="168" cy="190" r="3.5" fill="#fff"/>
      <circle cx="162" cy="197" r="1.5" fill="#fff"/>
      <circle cx="235" cy="194" r="9" fill="#500724"/>
      <circle cx="238" cy="190" r="3.5" fill="#fff"/>
      <circle cx="232" cy="197" r="1.5" fill="#fff"/>
      <path d="M192 223 Q200 231 208 223" stroke="#500724" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'excited' || c.faceType === 'radiant') {
    faceContent = `
      <circle cx="164" cy="192" r="8.5" fill="#1e1b4b"/>
      <circle cx="167" cy="188" r="3.5" fill="#fff"/>
      <circle cx="236" cy="192" r="8.5" fill="#1e1b4b"/>
      <circle cx="239" cy="188" r="3.5" fill="#fff"/>
      <path d="M188 218 Q200 238 212 218 Z" fill="#881337"/>
      <path d="M192 226 Q200 234 208 226" fill="#f43f5e"/>
    `;
  } else if (c.faceType === 'sunglasses') {
    faceContent = `
      <path d="M142 186 L188 186 Q188 208 165 208 Q142 208 142 186 Z" fill="#18181b" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"/>
      <path d="M212 186 L258 186 Q258 208 235 208 Q212 208 212 186 Z" fill="#18181b" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"/>
      <line x1="188" y1="192" x2="212" y2="192" stroke="#18181b" stroke-width="5"/>
      <line x1="148" y1="190" x2="162" y2="204" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <line x1="218" y1="190" x2="232" y2="204" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <path d="M192 224 Q204 232 214 222" stroke="#18181b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    `;
  } else if (c.faceType === 'star_eyes') {
    faceContent = `
      <polygon points="165,178 171,192 185,192 174,200 178,214 165,205 152,214 156,200 145,192 159,192" fill="#fbbf24" stroke="#d97706" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <polygon points="235,178 241,192 255,192 244,200 248,214 235,205 222,214 226,200 215,192 229,192" fill="#fbbf24" stroke="#d97706" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"/>
      <line x1="185" y1="196" x2="215" y2="196" stroke="#fbbf24" stroke-width="3"/>
      <path d="M188 226 Q200 240 212 226 Z" fill="#701a75"/>
      <path d="M193 232 Q200 238 207 232" fill="#f43f5e"/>
    `;
  } else {
    faceContent = `
      <circle cx="165" cy="195" r="7.5" fill="#1e293b"/>
      <circle cx="168" cy="191" r="2.5" fill="#fff"/>
      <circle cx="235" cy="195" r="7.5" fill="#1e293b"/>
      <circle cx="238" cy="191" r="2.5" fill="#fff"/>
      <path d="M191 222 Q200 229 209 222" stroke="#1e293b" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  }

  let propContent = '';
  if (c.prop === 'chess') {
    propContent = `
      <g transform="translate(240, 220) scale(0.75)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
        <path d="M30 65 L70 65 L65 55 L35 55 Z" fill="#e0e7ff"/>
        <path d="M38 55 C38 40 45 30 40 20 C48 20 54 26 56 20 C62 25 65 35 60 55 Z" fill="#c7d2fe"/>
        <circle cx="48" cy="28" r="3" fill="#4338ca"/>
      </g>
    `;
  } else if (c.prop === 'book') {
    propContent = `
      <g transform="translate(235, 225) rotate(-10) scale(0.7)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
        <rect x="0" y="0" width="55" height="40" rx="5" fill="#047857"/>
        <rect x="5" y="4" width="45" height="32" rx="3" fill="#ecfdf5"/>
        <line x1="28" y1="4" x2="28" y2="36" stroke="#a7f3d0" stroke-width="2"/>
        <path d="M12 12 L22 12 M12 18 L20 18 M34 12 L44 12" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
  } else if (c.prop === 'crown') {
    propContent = `
      <g transform="translate(165, 70) scale(0.7)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))">
        <polygon points="10,40 25,10 50,30 75,10 90,40" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>
        <rect x="10" y="40" width="80" height="14" rx="3" fill="#f59e0b"/>
        <circle cx="50" cy="47" r="4" fill="#dc2626"/>
      </g>
    `;
  } else if (c.prop === 'spark') {
    propContent = `
      <g transform="translate(245, 110) scale(0.6)" filter="drop-shadow(0 0 10px #fbbf24)">
        <path d="M30 40 C15 40 15 20 25 10 C35 0 45 10 55 20 C65 30 55 40 45 40 Z" fill="#fde047"/>
        <rect x="22" y="40" width="16" height="8" rx="2" fill="#ca8a04"/>
        <line x1="5" y1="20" x2="-5" y2="20" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
        <line x1="60" y1="20" x2="70" y2="20" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
        <line x1="30" y1="2" x2="30" y2="-8" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      </g>
    `;
  } else if (c.prop === 'tea') {
    propContent = `
      <g transform="translate(230, 220) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
        <rect x="15" y="20" width="38" height="35" rx="6" fill="#ddd6fe"/>
        <path d="M53 28 C62 28 62 42 53 45" stroke="#ddd6fe" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M30 15 Q26 6 34 2 Q42 6 38 15 Z" fill="#c4b5fd" opacity="0.8"/>
      </g>
    `;
  } else if (c.prop === 'flower') {
    propContent = `
      <g transform="translate(235, 215) scale(0.7)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
        <circle cx="30" cy="20" r="10" fill="#fbcfe8"/>
        <circle cx="45" cy="25" r="10" fill="#fbcfe8"/>
        <circle cx="42" cy="40" r="10" fill="#fbcfe8"/>
        <circle cx="25" cy="40" r="10" fill="#fbcfe8"/>
        <circle cx="18" cy="28" r="10" fill="#fbcfe8"/>
        <circle cx="32" cy="30" r="8" fill="#fef08a"/>
        <path d="M32 48 Q30 65 24 75" stroke="#86efac" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>
    `;
  } else if (c.prop === 'balloons') {
    propContent = `
      <g transform="translate(245, 85) scale(0.65)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))">
        <ellipse cx="20" cy="30" rx="18" ry="24" fill="#fb7185"/>
        <ellipse cx="45" cy="20" rx="16" ry="22" fill="#38bdf8"/>
        <ellipse cx="32" cy="45" rx="15" ry="20" fill="#facc15"/>
        <path d="M20 54 Q25 90 28 135" stroke="#cbd5e1" stroke-width="2" fill="none"/>
        <path d="M45 42 Q40 85 28 135" stroke="#cbd5e1" stroke-width="2" fill="none"/>
        <path d="M32 65 Q30 95 28 135" stroke="#cbd5e1" stroke-width="2" fill="none"/>
      </g>
    `;
  } else if (c.prop === 'compass') {
    propContent = `
      <g transform="translate(235, 220) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
        <circle cx="35" cy="35" r="28" fill="#fef08a" stroke="#ca8a04" stroke-width="4"/>
        <circle cx="35" cy="35" r="22" fill="#ffffff"/>
        <polygon points="35,16 40,35 35,32 30,35" fill="#dc2626"/>
        <polygon points="35,54 40,35 35,38 30,35" fill="#2563eb"/>
      </g>
    `;
  } else if (c.prop === 'palette') {
    propContent = `
      <g transform="translate(230, 220) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
        <path d="M15 40 C10 20 30 10 50 15 C70 20 75 45 60 55 C50 62 30 65 20 55 C12 48 18 45 15 40 Z" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
        <circle cx="30" cy="25" r="4" fill="#ef4444"/>
        <circle cx="45" cy="25" r="4" fill="#3b82f6"/>
        <circle cx="58" cy="35" r="4" fill="#10b981"/>
        <circle cx="50" cy="48" r="4" fill="#8b5cf6"/>
      </g>
    `;
  } else if (c.prop === 'wrench') {
    propContent = `
      <g transform="translate(240, 215) rotate(25) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
        <rect x="25" y="15" width="12" height="40" rx="3" fill="#94a3b8"/>
        <circle cx="31" cy="15" r="14" fill="#64748b"/>
        <circle cx="31" cy="15" r="6" fill="#f8fafc"/>
      </g>
    `;
  } else if (c.prop === 'lightning') {
    propContent = `
      <g transform="translate(245, 120) scale(0.65)" filter="drop-shadow(0 0 10px #facc15)">
        <polygon points="35,5 15,35 30,35 20,65 50,25 35,25" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      </g>
    `;
  } else if (c.prop === 'clipboard') {
    propContent = `
      <g transform="translate(235, 220) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
        <rect x="15" y="15" width="40" height="50" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <rect x="25" y="10" width="20" height="8" rx="2" fill="#334155"/>
        <line x1="22" y1="28" x2="48" y2="28" stroke="#334155" stroke-width="2"/>
        <line x1="22" y1="38" x2="48" y2="38" stroke="#334155" stroke-width="2"/>
        <line x1="22" y1="48" x2="38" y2="48" stroke="#334155" stroke-width="2"/>
      </g>
    `;
  } else if (c.prop === 'scarf') {
    propContent = `
      <g transform="translate(130, 240) scale(0.7)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
        <path d="M20 20 Q100 60 180 20 Q190 35 170 45 Q100 80 30 45 Z" fill="#99f6e4"/>
        <path d="M150 40 L160 85 L140 85 Z" fill="#5eead4"/>
      </g>
    `;
  } else if (c.prop === 'ribbon') {
    propContent = `
      <g transform="translate(235, 215) scale(0.7)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
        <path d="M20 20 C5 35 5 50 20 60 L35 40 Z" fill="#fde68a"/>
        <path d="M50 20 C65 35 65 50 50 60 L35 40 Z" fill="#fde68a"/>
        <circle cx="35" cy="40" r="8" fill="#f59e0b"/>
      </g>
    `;
  } else {
    propContent = `
      <g transform="translate(240, 225) scale(0.65)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
        <path d="M25 35 C15 20 0 28 10 45 L25 60 L40 45 C50 28 35 20 25 35 Z" fill="#f43f5e"/>
      </g>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${bgGlowId}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="${c.glow}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="${gradId}" cx="36%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="${c.gradStart}"/>
      <stop offset="85%" stop-color="${c.gradEnd}"/>
      <stop offset="100%" stop-color="${c.gradEnd}"/>
    </radialGradient>

    <linearGradient id="${highlightId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <radialGradient id="${shadowId}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#0f172a" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
    </radialGradient>

    <filter id="clayShadow_${c.type}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#1e1b4b" flood-opacity="0.16"/>
    </filter>
  </defs>

  <circle cx="200" cy="200" r="180" fill="url(#${bgGlowId})"/>
  <ellipse cx="200" cy="335" rx="100" ry="24" fill="url(#${shadowId})"/>

  <g filter="url(#clayShadow_${c.type})">
    <path d="M200 95 
             C275 95 310 155 305 235 
             C300 305 260 320 200 320 
             C140 320 100 305 95 235 
             C90 155 125 95 200 95 Z" 
          fill="url(#${gradId})"/>
    
    <ellipse cx="168" cy="145" rx="55" ry="30" transform="rotate(-20 168 145)" fill="url(#${highlightId})"/>

    <circle cx="120" cy="110" r="24" fill="${c.gradStart}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
    <circle cx="120" cy="110" r="12" fill="#ffffff" opacity="0.45"/>
    <circle cx="280" cy="110" r="24" fill="${c.gradStart}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
    <circle cx="280" cy="110" r="12" fill="#ffffff" opacity="0.45"/>
  </g>

  <ellipse cx="140" cy="214" rx="16" ry="9" fill="${c.blush}" opacity="0.65" filter="blur(3px)"/>
  <ellipse cx="260" cy="214" rx="16" ry="9" fill="${c.blush}" opacity="0.65" filter="blur(3px)"/>

  <g id="face">
    ${faceContent}
  </g>

  <g id="prop">
    ${propContent}
  </g>

  <g transform="translate(200, 365)">
    <rect x="-42" y="-14" width="84" height="28" rx="14" fill="#ffffff" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.08))"/>
    <text x="0" y="5" font-family="'Plus Jakarta Sans', Pretendard, sans-serif" font-size="14" font-weight="800" fill="${c.gradEnd}" text-anchor="middle">${c.type}</text>
  </g>
</svg>`;
}

characters.forEach(c => {
  const svg = generateSVG(c);
  fs.writeFileSync(path.join(targetDir, `${c.type}.svg`), svg, 'utf-8');
});

console.log(`Generated all 16 character SVG files in ${targetDir}`);
