import { Link } from "@tanstack/react-router";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";

const COVERS: Record<string, string> = {
  "a-birthday-surprise": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="60" y="140" width="80" height="100" rx="4" fill="#3A1020"/>
  <rect x="55" y="130" width="90" height="20" rx="4" fill="#4A1828"/>
  <line x1="100" y1="130" x2="100" y2="240" stroke="#FCD34D" stroke-width="2" opacity="0.3"/>
  <line x1="55" y1="140" x2="145" y2="240" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <line x1="145" y1="140" x2="55" y2="240" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <circle cx="100" cy="125" r="6" fill="#FCD34D" opacity="0.8"/>
  <rect x="97" y="100" width="6" height="28" rx="3" fill="#FCD34D" opacity="0.5"/>
  <circle cx="60" cy="128" r="4" fill="#FB7185" opacity="0.7"/>
  <rect x="57" y="107" width="6" height="24" rx="3" fill="#FB7185" opacity="0.4"/>
  <circle cx="140" cy="128" r="4" fill="#A78BFA" opacity="0.7"/>
  <rect x="137" y="107" width="6" height="24" rx="3" fill="#A78BFA" opacity="0.4"/>
  <circle cx="30" cy="60" r="3" fill="#FCD34D" opacity="0.5"/>
  <circle cx="170" cy="50" r="3" fill="#FB7185" opacity="0.4"/>
  <circle cx="50" cy="40" r="2" fill="#A78BFA" opacity="0.5"/>
  <circle cx="160" cy="75" r="2" fill="#FCD34D" opacity="0.4"/>
  <circle cx="80" cy="30" r="2.5" fill="#FB7185" opacity="0.35"/>
  <circle cx="130" cy="35" r="2" fill="#A78BFA" opacity="0.4"/>
  <path d="M40 80 Q100 55 160 75" stroke="#FCD34D" stroke-width="1" fill="none" opacity="0.2"/>
</svg>`,
  "a-letter-from-paris": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#2D1017"/>
  <rect x="0" y="190" width="200" height="90" fill="#1A0A0E"/>
  <rect x="93" y="90" width="14" height="110" fill="#3D1820"/>
  <polygon points="80,90 120,90 100,60" fill="#4A1F28"/>
  <rect x="88" y="118" width="24" height="30" rx="12" fill="#FB7185" opacity="0.4"/>
  <circle cx="100" cy="85" r="8" fill="#FB7185" opacity="0.7"/>
  <rect x="40" y="160" width="120" height="80" rx="4" fill="#3D1820"/>
  <rect x="48" y="168" width="104" height="64" rx="3" fill="#4A2228"/>
  <line x1="55" y1="180" x2="145" y2="180" stroke="#FB7185" stroke-width="1" opacity="0.4"/>
  <line x1="55" y1="191" x2="145" y2="191" stroke="#FB7185" stroke-width="1" opacity="0.35"/>
  <line x1="55" y1="202" x2="130" y2="202" stroke="#FB7185" stroke-width="1" opacity="0.3"/>
  <line x1="55" y1="213" x2="120" y2="213" stroke="#FB7185" stroke-width="1" opacity="0.25"/>
  <circle cx="40" cy="30" r="2" fill="#FB7185" opacity="0.3"/>
  <circle cx="160" cy="25" r="1.5" fill="#FB7185" opacity="0.25"/>
  <path d="M0 195 Q100 185 200 192" stroke="#FB7185" stroke-width="1" fill="none" opacity="0.15"/>
</svg>`,
  "a-new-friend": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="220" width="200" height="60" fill="#13100A"/>
  <rect x="20" y="80" width="160" height="145" rx="4" fill="#241A0A"/>
  <rect x="30" y="90" width="60" height="80" rx="2" fill="#2E2010"/>
  <rect x="100" y="90" width="70" height="80" rx="2" fill="#2E2010"/>
  <rect x="30" y="180" width="140" height="35" rx="2" fill="#2E2010"/>
  <ellipse cx="65" cy="170" rx="20" ry="30" fill="#5C3D1A"/>
  <circle cx="65" cy="145" r="15" fill="#7A5225"/>
  <ellipse cx="145" cy="165" rx="18" ry="28" fill="#3A5C2A"/>
  <circle cx="145" cy="140" r="14" fill="#4A7535"/>
  <path d="M85 180 Q100 165 115 180" stroke="#FCD34D" stroke-width="2" fill="none" opacity="0.6"/>
  <circle cx="100" cy="178" r="4" fill="#FCD34D" opacity="0.4"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="50" r="1" fill="#FCD34D" opacity="0.2"/>
  <rect x="0" y="68" width="200" height="4" fill="#FCD34D" opacity="0.08"/>
</svg>`,
  "a-strange-discovery": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="0" width="200" height="280" fill="url(#deepOcean)"/>
  <defs>
    <linearGradient id="deepOcean" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A1020"/>
      <stop offset="100%" stop-color="#1C1A2E"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="160" rx="60" ry="40" fill="#A78BFA" opacity="0.06"/>
  <ellipse cx="100" cy="160" rx="40" ry="27" fill="#A78BFA" opacity="0.08"/>
  <ellipse cx="100" cy="160" rx="25" ry="17" fill="#A78BFA" opacity="0.12"/>
  <ellipse cx="100" cy="160" rx="15" ry="10" fill="#A78BFA" opacity="0.2"/>
  <circle cx="100" cy="160" r="6" fill="#A78BFA" opacity="0.5"/>
  <path d="M60 145 Q80 130 100 145 Q120 158 140 142" stroke="#A78BFA" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M50 165 Q75 150 100 165 Q125 180 150 162" stroke="#A78BFA" stroke-width="1" fill="none" opacity="0.2"/>
  <line x1="30" y1="80" x2="170" y2="80" stroke="#A78BFA" stroke-width="0.5" opacity="0.1"/>
  <line x1="20" y1="100" x2="180" y2="100" stroke="#A78BFA" stroke-width="0.5" opacity="0.08"/>
  <line x1="15" y1="120" x2="185" y2="120" stroke="#A78BFA" stroke-width="0.5" opacity="0.06"/>
  <ellipse cx="100" cy="80" rx="18" ry="8" fill="#1C2A3E"/>
  <rect x="94" y="25" width="12" height="58" rx="6" fill="#243545"/>
  <circle cx="100" cy="22" r="8" fill="#38BDF8" opacity="0.4"/>
  <circle cx="100" cy="22" r="4" fill="#38BDF8" opacity="0.7"/>
  <line x1="80" y1="82" x2="120" y2="82" stroke="#A78BFA" stroke-width="1" opacity="0.3"/>
</svg>`,
  "between-two-worlds": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="0" width="100" height="280" fill="#1A1208"/>
  <rect x="100" y="0" width="100" height="280" fill="#1C1A2E"/>
  <line x1="100" y1="0" x2="100" y2="280" stroke="#FCD34D" stroke-width="1.5" opacity="0.4"/>
  <ellipse cx="55" cy="100" rx="30" ry="40" fill="#3A2510"/>
  <circle cx="55" cy="68" rx="20" r="20" fill="#5A3520"/>
  <ellipse cx="145" cy="100" rx="30" ry="40" fill="#252345"/>
  <circle cx="145" cy="68" rx="20" r="20" fill="#3A3560"/>
  <ellipse cx="100" cy="180" rx="8" ry="30" fill="#4A3020" opacity="0.6"/>
  <ellipse cx="100" cy="180" rx="8" ry="30" fill="#302850" opacity="0.6"/>
  <path d="M40 140 Q70 155 100 148 Q130 140 160 155" stroke="#FCD34D" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="35" r="1.5" fill="#A78BFA" opacity="0.3"/>
  <circle cx="20" cy="70" r="1" fill="#FCD34D" opacity="0.2"/>
  <circle cx="180" cy="65" r="1" fill="#A78BFA" opacity="0.2"/>
</svg>`,
  "echoes-of-mars": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0A1628"/>
  <circle cx="100" cy="110" r="70" fill="#8B2500" opacity="0.25"/>
  <circle cx="100" cy="110" r="55" fill="#6B1A00" opacity="0.4"/>
  <circle cx="100" cy="110" r="40" fill="#4A1200" opacity="0.6"/>
  <rect x="0" y="190" width="200" height="90" fill="#0D0805"/>
  <path d="M0 190 Q30 175 60 185 Q90 195 100 185 Q120 175 150 183 Q175 190 200 180 L200 280 L0 280Z" fill="#1a0a05"/>
  <rect x="80" y="155" width="40" height="50" rx="4" fill="#1a2a35"/>
  <rect x="75" y="148" width="50" height="12" rx="3" fill="#243545"/>
  <rect x="85" y="162" width="12" height="10" rx="1" fill="#38BDF8" opacity="0.6"/>
  <rect x="103" y="162" width="12" height="10" rx="1" fill="#38BDF8" opacity="0.4"/>
  <line x1="60" y1="175" x2="80" y2="168" stroke="#38BDF8" stroke-width="1.5" opacity="0.5"/>
  <line x1="140" y1="172" x2="120" y2="165" stroke="#38BDF8" stroke-width="1.5" opacity="0.5"/>
  <circle cx="30" cy="30" r="2" fill="#fff" opacity="0.7"/>
  <circle cx="170" cy="20" r="1.5" fill="#fff" opacity="0.6"/>
  <circle cx="50" cy="50" r="1" fill="#fff" opacity="0.5"/>
  <circle cx="160" cy="55" r="1.5" fill="#fff" opacity="0.4"/>
  <circle cx="20" cy="80" r="1" fill="#fff" opacity="0.3"/>
  <path d="M100 60 Q120 50 130 65" stroke="#38BDF8" stroke-width="1" fill="none" opacity="0.3"/>
  <circle cx="100" cy="58" r="3" fill="#38BDF8" opacity="0.5"/>
</svg>`,
  "first-day": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="170" width="200" height="110" fill="#13100A"/>
  <rect x="40" y="70" width="120" height="110" rx="6" fill="#2E1A08"/>
  <rect x="50" y="78" width="100" height="95" rx="4" fill="#3A2010"/>
  <rect x="60" y="88" width="80" height="12" rx="3" fill="#FCD34D" opacity="0.3"/>
  <rect x="60" y="108" width="65" height="8" rx="2" fill="#FCD34D" opacity="0.2"/>
  <rect x="60" y="123" width="72" height="8" rx="2" fill="#FCD34D" opacity="0.15"/>
  <rect x="60" y="138" width="55" height="8" rx="2" fill="#FCD34D" opacity="0.12"/>
  <ellipse cx="100" cy="200" rx="40" ry="18" fill="#4A2A10"/>
  <ellipse cx="100" cy="196" rx="35" ry="14" fill="#5A3515"/>
  <circle cx="100" cy="60" r="20" fill="#FCD34D" opacity="0.2"/>
  <circle cx="100" cy="60" r="10" fill="#FCD34D" opacity="0.4"/>
  <path d="M88 58 L98 68 L115 50" stroke="#FCD34D" stroke-width="2.5" fill="none" opacity="0.8"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="35" r="1" fill="#FCD34D" opacity="0.2"/>
</svg>`,
  "grandmothers-recipe": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0F1A24"/>
  <ellipse cx="100" cy="200" rx="60" ry="20" fill="#1a2530"/>
  <ellipse cx="100" cy="195" rx="55" ry="18" fill="#243040"/>
  <rect x="55" y="145" width="90" height="55" rx="45" fill="#3a2510"/>
  <ellipse cx="100" cy="143" rx="45" ry="16" fill="#4a3015"/>
  <ellipse cx="100" cy="140" rx="38" ry="13" fill="#1a0a00"/>
  <path d="M75 120 Q100 95 125 120" stroke="#67E8F9" stroke-width="2.5" fill="none" opacity="0.6"/>
  <path d="M80 112 Q100 82 120 112" stroke="#67E8F9" stroke-width="1.5" fill="none" opacity="0.4"/>
  <path d="M85 104 Q100 70 115 104" stroke="#67E8F9" stroke-width="1" fill="none" opacity="0.2"/>
  <rect x="60" y="30" width="80" height="100" rx="4" fill="#1E2A35"/>
  <rect x="65" y="35" width="70" height="90" rx="3" fill="#243040"/>
  <line x1="72" y1="50" x2="128" y2="50" stroke="#67E8F9" stroke-width="1" opacity="0.4"/>
  <line x1="72" y1="62" x2="128" y2="62" stroke="#67E8F9" stroke-width="1" opacity="0.35"/>
  <line x1="72" y1="74" x2="118" y2="74" stroke="#67E8F9" stroke-width="1" opacity="0.3"/>
  <line x1="72" y1="86" x2="120" y2="86" stroke="#67E8F9" stroke-width="1" opacity="0.25"/>
  <line x1="72" y1="98" x2="110" y2="98" stroke="#67E8F9" stroke-width="1" opacity="0.2"/>
</svg>`,
  "letters-from-the-lighthouse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#2D1017"/>
  <rect x="0" y="180" width="200" height="100" fill="#1A0A0E"/>
  <path d="M0 180 Q100 160 200 180 L200 280 L0 280Z" fill="#200D12"/>
  <rect x="85" y="60" width="30" height="130" fill="#3D1820"/>
  <rect x="80" y="55" width="40" height="15" rx="3" fill="#4A1F28"/>
  <rect x="78" y="45" width="44" height="15" rx="3" fill="#562330"/>
  <circle cx="100" cy="42" r="18" fill="#FB7185" opacity="0.3"/>
  <circle cx="100" cy="42" r="10" fill="#FB7185" opacity="0.7"/>
  <circle cx="100" cy="42" r="5" fill="#fff" opacity="0.9"/>
  <line x1="100" y1="24" x2="60" y2="10" stroke="#FB7185" stroke-width="1" opacity="0.4"/>
  <line x1="100" y1="24" x2="140" y2="15" stroke="#FB7185" stroke-width="1" opacity="0.3"/>
  <line x1="100" y1="32" x2="100" y2="16" stroke="#FB7185" stroke-width="1.5" opacity="0.5"/>
  <rect x="40" y="190" width="35" height="25" rx="2" fill="#3D1820" transform="rotate(-8 57 202)"/>
  <line x1="40" y1="197" x2="75" y2="197" stroke="#FB7185" stroke-width="0.8" opacity="0.5" transform="rotate(-8 57 197)"/>
  <line x1="40" y1="203" x2="75" y2="203" stroke="#FB7185" stroke-width="0.8" opacity="0.4" transform="rotate(-8 57 203)"/>
  <line x1="40" y1="209" x2="65" y2="209" stroke="#FB7185" stroke-width="0.8" opacity="0.3" transform="rotate(-8 57 209)"/>
  <path d="M0 185 Q50 178 100 185 Q150 192 200 182" stroke="#FB7185" stroke-width="1.5" fill="none" opacity="0.2"/>
  <circle cx="20" cy="30" r="1.5" fill="#FB7185" opacity="0.4"/>
  <circle cx="170" cy="25" r="1" fill="#FB7185" opacity="0.3"/>
  <circle cx="40" cy="50" r="1" fill="#FB7185" opacity="0.2"/>
</svg>`,
  "lost-in-the-city": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0D2016"/>
  <rect x="0" y="160" width="200" height="120" fill="#0A1A10"/>
  <rect x="10" y="80" width="30" height="100" fill="#0f2a18"/>
  <rect x="48" y="60" width="35" height="120" fill="#0f2a18"/>
  <rect x="90" y="40" width="40" height="140" fill="#0f2a18"/>
  <rect x="138" y="70" width="30" height="110" fill="#0f2a18"/>
  <rect x="175" y="90" width="25" height="90" fill="#0f2a18"/>
  <rect x="15" y="88" width="8" height="10" rx="1" fill="#4ADE80" opacity="0.3"/>
  <rect x="27" y="92" width="8" height="10" rx="1" fill="#4ADE80" opacity="0.2"/>
  <rect x="55" y="68" width="10" height="12" rx="1" fill="#4ADE80" opacity="0.35"/>
  <rect x="69" y="72" width="10" height="12" rx="1" fill="#4ADE80" opacity="0.25"/>
  <rect x="97" y="50" width="12" height="14" rx="1" fill="#4ADE80" opacity="0.4"/>
  <rect x="113" y="55" width="12" height="14" rx="1" fill="#4ADE80" opacity="0.3"/>
  <ellipse cx="100" cy="185" rx="12" ry="20" fill="#2a4a35"/>
  <circle cx="100" cy="167" r="10" fill="#3a5a40"/>
  <circle cx="100" cy="155" r="25" fill="#4ADE80" opacity="0.08"/>
  <circle cx="100" cy="155" r="12" fill="#4ADE80" opacity="0.15"/>
  <circle cx="100" cy="155" r="4" fill="#4ADE80" opacity="0.4"/>
  <path d="M88 155 L100 143 L112 155 L100 167Z" fill="none" stroke="#4ADE80" stroke-width="1.5" opacity="0.5"/>
</svg>`,
  "the-blue-bicycle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="210" width="200" height="70" fill="#13100A"/>
  <line x1="0" y1="210" x2="200" y2="210" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <circle cx="70" cy="190" r="35" fill="none" stroke="#3B82F6" stroke-width="4"/>
  <circle cx="70" cy="190" r="5" fill="#3B82F6"/>
  <circle cx="140" cy="190" r="35" fill="none" stroke="#3B82F6" stroke-width="4"/>
  <circle cx="140" cy="190" r="5" fill="#3B82F6"/>
  <line x1="70" y1="190" x2="105" y2="155" stroke="#3B82F6" stroke-width="3"/>
  <line x1="105" y1="155" x2="140" y2="190" stroke="#3B82F6" stroke-width="3"/>
  <line x1="105" y1="155" x2="90" y2="140" stroke="#3B82F6" stroke-width="3"/>
  <line x1="90" y1="140" x2="75" y2="140" stroke="#3B82F6" stroke-width="3"/>
  <line x1="105" y1="155" x2="120" y2="148" stroke="#3B82F6" stroke-width="2"/>
  <line x1="115" y1="145" x2="125" y2="145" stroke="#3B82F6" stroke-width="3"/>
  <circle cx="100" cy="80" r="25" fill="#FCD34D" opacity="0.12"/>
  <circle cx="100" cy="80" r="12" fill="#FCD34D" opacity="0.25"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="30" r="1" fill="#FCD34D" opacity="0.2"/>
  <circle cx="160" cy="60" r="2" fill="#FCD34D" opacity="0.25"/>
</svg>`,
  "the-broken-window": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="150" width="200" height="130" fill="#13112A"/>
  <rect x="25" y="40" width="150" height="200" rx="4" fill="#1E1C38"/>
  <rect x="35" y="50" width="130" height="180" rx="3" fill="#252340"/>
  <rect x="45" y="60" width="45" height="70" rx="2" fill="#1a1828"/>
  <rect x="100" y="60" width="55" height="70" rx="2" fill="#1a1828"/>
  <rect x="45" y="140" width="45" height="80" rx="2" fill="#1a1828"/>
  <rect x="100" y="140" width="55" height="80" rx="2" fill="#A78BFA" opacity="0.08"/>
  <line x1="110" y1="142" x2="148" y2="218" stroke="#A78BFA" stroke-width="1.5" opacity="0.6"/>
  <line x1="148" y1="142" x2="100" y2="195" stroke="#A78BFA" stroke-width="1.5" opacity="0.5"/>
  <line x1="100" y1="158" x2="155" y2="175" stroke="#A78BFA" stroke-width="1" opacity="0.4"/>
  <line x1="125" y1="142" x2="105" y2="218" stroke="#A78BFA" stroke-width="1" opacity="0.3"/>
  <circle cx="130" cy="180" r="8" fill="#A78BFA" opacity="0.1"/>
  <circle cx="20" cy="30" r="1.5" fill="#A78BFA" opacity="0.4"/>
  <circle cx="180" cy="25" r="1" fill="#A78BFA" opacity="0.3"/>
  <circle cx="170" cy="50" r="2" fill="#A78BFA" opacity="0.25"/>
</svg>`,
  "the-clock-tower": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="200" width="200" height="80" fill="#13112A"/>
  <rect x="75" y="80" width="50" height="140" fill="#1E1C38"/>
  <rect x="70" y="70" width="60" height="20" rx="3" fill="#252340"/>
  <rect x="65" y="60" width="70" height="16" rx="3" fill="#2A2848"/>
  <polygon points="100,30 140,60 60,60" fill="#252340"/>
  <circle cx="100" cy="90" r="25" fill="#1a1828" stroke="#A78BFA" stroke-width="2"/>
  <circle cx="100" cy="90" r="20" fill="#1C1A2E"/>
  <circle cx="100" cy="90" r="3" fill="#A78BFA"/>
  <line x1="100" y1="90" x2="100" y2="72" stroke="#A78BFA" stroke-width="2"/>
  <line x1="100" y1="90" x2="100" y2="72" stroke="#A78BFA" stroke-width="2"/>
  <line x1="100" y1="90" x2="114" y2="98" stroke="#A78BFA" stroke-width="1.5"/>
  <rect x="85" y="135" width="30" height="65" rx="2" fill="#1a1828"/>
  <rect x="90" y="140" width="20" height="45" rx="1" fill="#1C1A2E"/>
  <circle cx="20" cy="30" r="2" fill="#A78BFA" opacity="0.4"/>
  <circle cx="180" cy="25" r="1.5" fill="#A78BFA" opacity="0.35"/>
  <circle cx="165" cy="50" r="1" fill="#A78BFA" opacity="0.25"/>
  <circle cx="35" cy="55" r="1.5" fill="#A78BFA" opacity="0.2"/>
  <ellipse cx="100" cy="270" rx="60" ry="6" fill="#A78BFA" opacity="0.04"/>
</svg>`,
  "the-coffee-bean-journey": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0F1A24"/>
  <ellipse cx="100" cy="230" rx="55" ry="20" fill="#1a2a35"/>
  <rect x="65" y="180" width="70" height="55" rx="35" fill="#2a1a0a"/>
  <ellipse cx="100" cy="178" rx="35" ry="12" fill="#3a2510"/>
  <ellipse cx="100" cy="175" rx="30" ry="10" fill="#1a0a00" opacity="0.8"/>
  <path d="M90 155 Q100 130 110 155" stroke="#67E8F9" stroke-width="2" fill="none" opacity="0.7"/>
  <path d="M85 150 Q100 115 115 150" stroke="#67E8F9" stroke-width="1.5" fill="none" opacity="0.4"/>
  <path d="M80 145 Q100 100 120 145" stroke="#67E8F9" stroke-width="1" fill="none" opacity="0.2"/>
  <ellipse cx="60" cy="80" rx="12" ry="18" fill="#1a4a1a"/>
  <ellipse cx="60" cy="62" rx="14" ry="16" fill="#0f3010"/>
  <ellipse cx="85" cy="70" rx="10" ry="15" fill="#1a4a1a"/>
  <ellipse cx="85" cy="55" rx="12" ry="14" fill="#0f3010"/>
  <circle cx="58" cy="72" r="5" fill="#8B2500" opacity="0.9"/>
  <circle cx="65" cy="65" r="4" fill="#8B2500" opacity="0.8"/>
  <circle cx="83" cy="68" r="4.5" fill="#8B2500" opacity="0.9"/>
  <path d="M30 100 Q60 85 100 95 Q140 105 170 90" stroke="#67E8F9" stroke-width="1" fill="none" opacity="0.15"/>
  <circle cx="150" cy="50" r="2" fill="#67E8F9" opacity="0.3"/>
  <circle cx="170" cy="70" r="1.5" fill="#67E8F9" opacity="0.2"/>
</svg>`,
  "the-empty-house": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="200" width="200" height="80" fill="#13112A"/>
  <polygon points="100,50 170,110 30,110" fill="#1E1C38"/>
  <rect x="40" y="110" width="120" height="110" fill="#252340"/>
  <rect x="55" y="125" width="30" height="40" rx="2" fill="#1a1828"/>
  <rect x="115" y="125" width="30" height="40" rx="2" fill="#A78BFA" opacity="0.12"/>
  <rect x="80" y="150" width="40" height="70" rx="2" fill="#1E1C38"/>
  <rect x="90" y="160" width="20" height="35" rx="1" fill="#1a1828"/>
  <circle cx="130" cy="148" r="15" fill="#A78BFA" opacity="0.08"/>
  <rect x="55" y="180" width="30" height="4" rx="1" fill="#A78BFA" opacity="0.15"/>
  <rect x="35" y="60" width="20" height="8" rx="2" fill="#1a1828"/>
  <rect x="145" y="65" width="20" height="8" rx="2" fill="#1a1828"/>
  <circle cx="25" cy="35" r="1.5" fill="#A78BFA" opacity="0.4"/>
  <circle cx="175" cy="30" r="1" fill="#A78BFA" opacity="0.3"/>
  <circle cx="165" cy="55" r="2" fill="#A78BFA" opacity="0.2"/>
</svg>`,
  "the-inheritance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="190" width="200" height="90" fill="#13100A"/>
  <rect x="30" y="80" width="140" height="120" rx="6" fill="#2E1A08"/>
  <rect x="38" y="88" width="124" height="104" rx="5" fill="#3A2010"/>
  <line x1="48" y1="105" x2="152" y2="105" stroke="#FCD34D" stroke-width="1" opacity="0.3"/>
  <line x1="48" y1="118" x2="152" y2="118" stroke="#FCD34D" stroke-width="1" opacity="0.25"/>
  <line x1="48" y1="131" x2="140" y2="131" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <line x1="48" y1="144" x2="145" y2="144" stroke="#FCD34D" stroke-width="1" opacity="0.18"/>
  <line x1="48" y1="157" x2="130" y2="157" stroke="#FCD34D" stroke-width="1" opacity="0.15"/>
  <line x1="48" y1="170" x2="120" y2="170" stroke="#FCD34D" stroke-width="1" opacity="0.12"/>
  <rect x="88" y="185" width="24" height="4" rx="2" fill="#FCD34D" opacity="0.3"/>
  <circle cx="100" cy="50" r="22" fill="#241A08"/>
  <circle cx="100" cy="50" r="15" fill="#FCD34D" opacity="0.2"/>
  <path d="M88 50 L95 57 L115 38" stroke="#FCD34D" stroke-width="2.5" fill="none" opacity="0.6"/>
  <circle cx="30" cy="35" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="40" r="1" fill="#FCD34D" opacity="0.2"/>
  <rect x="0" y="75" width="200" height="2" fill="#FCD34D" opacity="0.05"/>
</svg>`,
  "the-kind-stranger": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="200" width="200" height="80" fill="#13100A"/>
  <rect x="15" y="80" width="35" height="130" rx="3" fill="#241A08"/>
  <rect x="60" y="100" width="30" height="110" rx="3" fill="#241A08"/>
  <rect x="110" y="70" width="40" height="140" rx="3" fill="#241A08"/>
  <rect x="160" y="90" width="30" height="120" rx="3" fill="#241A08"/>
  <rect x="18" y="85" width="10" height="15" rx="1" fill="#FCD34D" opacity="0.3"/>
  <rect x="32" y="85" width="10" height="15" rx="1" fill="#FCD34D" opacity="0.2"/>
  <rect x="18" y="108" width="10" height="15" rx="1" fill="#FCD34D" opacity="0.25"/>
  <rect x="113" y="75" width="12" height="18" rx="1" fill="#FCD34D" opacity="0.35"/>
  <rect x="129" y="78" width="12" height="18" rx="1" fill="#FCD34D" opacity="0.2"/>
  <ellipse cx="75" cy="185" rx="14" ry="22" fill="#5C3D1A"/>
  <circle cx="75" cy="165" rx="12" r="12" fill="#7A5225"/>
  <ellipse cx="120" cy="182" rx="13" ry="20" fill="#3A5C1A"/>
  <circle cx="120" cy="163" r="11" fill="#4A7520"/>
  <path d="M87 190 L113 188" stroke="#FCD34D" stroke-width="2" opacity="0.5"/>
  <circle cx="100" cy="188" r="5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="100" cy="40" r="18" fill="#FCD34D" opacity="0.12"/>
  <circle cx="100" cy="40" r="8" fill="#FCD34D" opacity="0.2"/>
</svg>`,
  "the-last-library": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0A1628"/>
  <rect x="0" y="0" width="200" height="100" fill="#060E1E"/>
  <circle cx="100" cy="30" r="40" fill="#38BDF8" opacity="0.05"/>
  <circle cx="100" cy="30" r="25" fill="#38BDF8" opacity="0.08"/>
  <circle cx="100" cy="30" r="12" fill="#38BDF8" opacity="0.12"/>
  <rect x="20" y="100" width="160" height="160" rx="6" fill="#0F1E30"/>
  <rect x="28" y="108" width="20" height="144" rx="3" fill="#1a3a50"/>
  <rect x="52" y="108" width="16" height="144" rx="3" fill="#152d40"/>
  <rect x="72" y="108" width="22" height="144" rx="3" fill="#1E4060"/>
  <rect x="98" y="108" width="18" height="144" rx="3" fill="#1a3550"/>
  <rect x="120" y="108" width="20" height="144" rx="3" fill="#162d42"/>
  <rect x="144" y="108" width="16" height="144" rx="3" fill="#1C3A52"/>
  <rect x="28" y="108" width="4" height="144" fill="#38BDF8" opacity="0.1"/>
  <rect x="48" y="108" width="4" height="144" fill="#38BDF8" opacity="0.08"/>
  <ellipse cx="100" cy="195" rx="22" ry="30" fill="#0d1f30"/>
  <circle cx="100" cy="167" r="14" fill="#1a3045"/>
  <circle cx="100" cy="165" r="8" fill="#38BDF8" opacity="0.2"/>
  <circle cx="30" cy="50" r="2" fill="#38BDF8" opacity="0.3"/>
  <circle cx="170" cy="45" r="1.5" fill="#38BDF8" opacity="0.25"/>
</svg>`,
  "the-last-train-home": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="200" width="200" height="80" fill="#13112A"/>
  <line x1="0" y1="210" x2="200" y2="210" stroke="#A78BFA" stroke-width="2" opacity="0.3"/>
  <line x1="0" y1="220" x2="200" y2="220" stroke="#A78BFA" stroke-width="2" opacity="0.3"/>
  <rect x="0" y="120" width="160" height="85" rx="10" fill="#252340"/>
  <rect x="10" y="133" width="28" height="22" rx="3" fill="#A78BFA" opacity="0.5"/>
  <rect x="48" y="133" width="28" height="22" rx="3" fill="#A78BFA" opacity="0.3"/>
  <rect x="86" y="133" width="28" height="22" rx="3" fill="#1C1A2E"/>
  <rect x="124" y="133" width="28" height="22" rx="3" fill="#1C1A2E"/>
  <polygon points="160,120 200,100 200,205 160,205" fill="#1E1C38"/>
  <circle cx="20" cy="207" r="8" fill="#1C1A2E" stroke="#A78BFA" stroke-width="2"/>
  <circle cx="140" cy="207" r="8" fill="#1C1A2E" stroke="#A78BFA" stroke-width="2"/>
  <circle cx="100" cy="50" r="3" fill="#fff" opacity="0.8"/>
  <circle cx="40" cy="30" r="2" fill="#fff" opacity="0.6"/>
  <circle cx="160" cy="40" r="1.5" fill="#fff" opacity="0.5"/>
  <circle cx="170" cy="80" r="1" fill="#fff" opacity="0.4"/>
  <circle cx="20" cy="70" r="1.5" fill="#fff" opacity="0.3"/>
  <line x1="40" y1="210" x2="40" y2="225" stroke="#A78BFA" stroke-width="2" opacity="0.4"/>
  <line x1="80" y1="210" x2="80" y2="225" stroke="#A78BFA" stroke-width="2" opacity="0.4"/>
  <line x1="120" y1="210" x2="120" y2="225" stroke="#A78BFA" stroke-width="2" opacity="0.4"/>
  <line x1="160" y1="210" x2="160" y2="225" stroke="#A78BFA" stroke-width="2" opacity="0.4"/>
</svg>`,
  "the-little-bird": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="200" width="200" height="80" fill="#13100A"/>
  <rect x="85" y="50" width="8" height="160" fill="#3A2510"/>
  <ellipse cx="89" cy="48" rx="30" ry="35" fill="#1a4a1a"/>
  <ellipse cx="89" cy="30" rx="25" ry="28" fill="#0f3010"/>
  <ellipse cx="120" cy="80" rx="22" ry="28" fill="#1a4a1a"/>
  <ellipse cx="120" cy="63" rx="18" ry="22" fill="#0f3010"/>
  <ellipse cx="65" cy="90" rx="20" ry="25" fill="#1a4a1a"/>
  <ellipse cx="65" cy="74" rx="16" ry="20" fill="#0f3010"/>
  <path d="M70 155 Q89 148 108 155" stroke="#5A3510" stroke-width="3" fill="none"/>
  <ellipse cx="89" cy="153" rx="12" ry="5" fill="#4A3010"/>
  <ellipse cx="89" cy="148" rx="9" ry="7" fill="#8B6030" opacity="0.8"/>
  <circle cx="86" cy="145" r="2.5" fill="#1A1208"/>
  <circle cx="92" cy="145" r="2.5" fill="#1A1208"/>
  <path d="M80 148 L75 145 L70 148" fill="none" stroke="#8B6030" stroke-width="1.5"/>
  <circle cx="100" cy="40" r="15" fill="#FCD34D" opacity="0.15"/>
  <circle cx="100" cy="40" r="7" fill="#FCD34D" opacity="0.25"/>
</svg>`,
  "the-lost-dog": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="200" width="200" height="80" fill="#13100A"/>
  <ellipse cx="100" cy="200" rx="100" ry="15" fill="#1E1810"/>
  <ellipse cx="60" cy="195" rx="15" ry="10" fill="#1a4a20"/>
  <ellipse cx="140" cy="192" rx="12" ry="9" fill="#1a4a20"/>
  <ellipse cx="100" cy="197" rx="18" ry="11" fill="#1a4a20"/>
  <rect x="75" y="155" width="50" height="40" rx="25" fill="#8B6914"/>
  <ellipse cx="100" cy="158" rx="22" ry="18" fill="#A07820"/>
  <ellipse cx="85" cy="148" rx="10" ry="14" fill="#8B6914"/>
  <ellipse cx="115" cy="150" rx="10" ry="14" fill="#8B6914"/>
  <circle cx="93" cy="157" r="3" fill="#1A1208"/>
  <circle cx="107" cy="157" r="3" fill="#1A1208"/>
  <ellipse cx="100" cy="164" rx="5" ry="3" fill="#8B3A14"/>
  <path d="M78 168 Q100 175 122 168" stroke="#8B6914" stroke-width="3" fill="none"/>
  <path d="M125 175 Q140 185 145 195" stroke="#8B6914" stroke-width="3" fill="none"/>
  <circle cx="145" cy="195" r="4" fill="#8B6914"/>
  <circle cx="100" cy="80" r="20" fill="#FCD34D" opacity="0.15"/>
  <circle cx="100" cy="80" r="10" fill="#FCD34D" opacity="0.3"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.4"/>
  <circle cx="170" cy="50" r="1" fill="#FCD34D" opacity="0.3"/>
</svg>`,
  "the-marathon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0F1A24"/>
  <rect x="0" y="230" width="200" height="50" fill="#0A1018"/>
  <line x1="0" y1="225" x2="200" y2="225" stroke="#67E8F9" stroke-width="1.5" opacity="0.3"/>
  <line x1="0" y1="228" x2="200" y2="228" stroke="#67E8F9" stroke-width="1.5" opacity="0.3"/>
  <ellipse cx="100" cy="185" rx="18" ry="35" fill="#1a2a35"/>
  <circle cx="100" cy="152" r="14" fill="#243545"/>
  <line x1="82" y1="195" x2="75" y2="220" stroke="#1a2a35" stroke-width="4"/>
  <line x1="100" y1="218" x2="95" y2="225" stroke="#1a2a35" stroke-width="4"/>
  <line x1="100" y1="218" x2="110" y2="223" stroke="#1a2a35" stroke-width="4"/>
  <line x1="100" y1="160" x2="115" y2="185" stroke="#1a2a35" stroke-width="4"/>
  <line x1="115" y1="185" x2="130" y2="175" stroke="#1a2a35" stroke-width="3"/>
  <circle cx="100" cy="80" r="30" fill="none" stroke="#67E8F9" stroke-width="1" opacity="0.2"/>
  <circle cx="100" cy="80" r="20" fill="none" stroke="#67E8F9" stroke-width="1" opacity="0.15"/>
  <circle cx="100" cy="80" r="10" fill="#67E8F9" opacity="0.1"/>
  <path d="M20 80 Q60 60 100 80 Q140 100 180 75" stroke="#67E8F9" stroke-width="1.5" fill="none" opacity="0.25"/>
  <path d="M20 100 Q60 85 100 100 Q140 115 180 95" stroke="#67E8F9" stroke-width="1" fill="none" opacity="0.15"/>
  <circle cx="30" cy="40" r="2" fill="#67E8F9" opacity="0.3"/>
  <circle cx="170" cy="35" r="1.5" fill="#67E8F9" opacity="0.25"/>
</svg>`,
  "the-missing-key": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <circle cx="100" cy="80" r="60" fill="#2A2545" opacity="0.8"/>
  <circle cx="100" cy="80" r="40" fill="#1C1A2E" stroke="#A78BFA" stroke-width="2"/>
  <rect x="88" y="76" width="24" height="14" rx="4" fill="none" stroke="#A78BFA" stroke-width="2"/>
  <rect x="100" y="90" width="3" height="20" fill="#A78BFA"/>
  <rect x="96" y="106" width="11" height="4" rx="2" fill="#A78BFA"/>
  <circle cx="100" cy="75" r="3" fill="#A78BFA"/>
  <rect x="60" y="160" width="80" height="50" rx="6" fill="#2A2545" stroke="#A78BFA" stroke-width="1.5"/>
  <rect x="75" y="160" width="10" height="8" rx="2" fill="#1C1A2E" stroke="#A78BFA" stroke-width="1"/>
  <line x1="40" y1="200" x2="160" y2="200" stroke="#A78BFA" stroke-width="0.5" opacity="0.3"/>
  <circle cx="30" cy="40" r="2" fill="#A78BFA" opacity="0.5"/>
  <circle cx="170" cy="60" r="1.5" fill="#A78BFA" opacity="0.4"/>
  <circle cx="50" cy="240" r="1" fill="#A78BFA" opacity="0.3"/>
  <circle cx="160" cy="250" r="1.5" fill="#A78BFA" opacity="0.4"/>
</svg>`,
  "the-musician": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="220" width="200" height="60" fill="#100C04"/>
  <ellipse cx="100" cy="220" rx="80" ry="15" fill="#130F07"/>
  <ellipse cx="100" cy="155" rx="45" ry="30" fill="#5C3D1A"/>
  <ellipse cx="100" cy="150" rx="40" ry="26" fill="#6B4A20"/>
  <ellipse cx="100" cy="148" rx="20" ry="22" fill="#5C3D1A"/>
  <ellipse cx="100" cy="145" rx="16" ry="18" fill="#4A3010"/>
  <rect x="118" y="120" width="4" height="55" rx="2" fill="#8B6030"/>
  <ellipse cx="120" cy="118" rx="5" ry="8" fill="#6B4020"/>
  <line x1="70" y1="148" x2="130" y2="148" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <line x1="72" y1="156" x2="128" y2="156" stroke="#FCD34D" stroke-width="1" opacity="0.15"/>
  <ellipse cx="100" cy="195" rx="20" ry="28" fill="#4A2E10"/>
  <circle cx="100" cy="170" r="14" fill="#6B4525"/>
  <path d="M60 140 Q100 110 140 140" stroke="#FCD34D" stroke-width="1" fill="none" opacity="0.15"/>
  <path d="M50 160 Q100 125 150 160" stroke="#FCD34D" stroke-width="0.8" fill="none" opacity="0.1"/>
  <circle cx="30" cy="40" r="1.5" fill="#FCD34D" opacity="0.3"/>
  <circle cx="170" cy="35" r="1" fill="#FCD34D" opacity="0.2"/>
  <circle cx="160" cy="60" r="2" fill="#FCD34D" opacity="0.25"/>
</svg>`,
  "the-night-bus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1C1A2E"/>
  <rect x="0" y="180" width="200" height="100" fill="#13112A"/>
  <rect x="10" y="160" width="180" height="70" rx="12" fill="#2A2545"/>
  <rect x="20" y="170" width="25" height="18" rx="2" fill="#FCD34D" opacity="0.9"/>
  <rect x="55" y="170" width="25" height="18" rx="2" fill="#FCD34D" opacity="0.7"/>
  <rect x="90" y="170" width="25" height="18" rx="2" fill="#FCD34D" opacity="0.5"/>
  <rect x="125" y="170" width="25" height="18" rx="2" fill="#1C1A2E"/>
  <rect x="155" y="170" width="25" height="18" rx="2" fill="#1C1A2E"/>
  <circle cx="40" cy="235" r="14" fill="#1C1A2E" stroke="#A78BFA" stroke-width="3"/>
  <circle cx="40" cy="235" r="5" fill="#A78BFA"/>
  <circle cx="160" cy="235" r="14" fill="#1C1A2E" stroke="#A78BFA" stroke-width="3"/>
  <circle cx="160" cy="235" r="5" fill="#A78BFA"/>
  <circle cx="100" cy="60" r="25" fill="#FCD34D" opacity="0.15"/>
  <circle cx="100" cy="60" r="12" fill="#FCD34D" opacity="0.9"/>
  <line x1="0" y1="155" x2="200" y2="155" stroke="#A78BFA" stroke-width="0.5" opacity="0.4"/>
  <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.6"/>
  <circle cx="80" cy="20" r="1" fill="#fff" opacity="0.5"/>
  <circle cx="150" cy="40" r="2" fill="#fff" opacity="0.4"/>
  <circle cx="170" cy="100" r="1" fill="#fff" opacity="0.3"/>
</svg>`,
  "the-old-photograph": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="35" y="60" width="130" height="160" rx="4" fill="#2E1A08" transform="rotate(-4 100 140)"/>
  <rect x="42" y="67" width="116" height="146" rx="3" fill="#3A2010" transform="rotate(-4 100 140)"/>
  <rect x="48" y="73" width="104" height="130" rx="2" fill="#1a1208" transform="rotate(-4 100 140)"/>
  <ellipse cx="97" cy="125" rx="25" ry="32" fill="#3A2A18" transform="rotate(-4 97 125)"/>
  <circle cx="95" cy="107" r="16" fill="#4A3520" transform="rotate(-4 95 107)"/>
  <line x1="60" y1="185" x2="138" y2="183" stroke="#FCD34D" stroke-width="0.8" opacity="0.15" transform="rotate(-4 100 183)"/>
  <line x1="60" y1="192" x2="135" y2="190" stroke="#FCD34D" stroke-width="0.8" opacity="0.1" transform="rotate(-4 100 190)"/>
  <rect x="55" y="230" width="90" height="20" rx="3" fill="#241A08"/>
  <line x1="62" y1="237" x2="138" y2="237" stroke="#FCD34D" stroke-width="1" opacity="0.3"/>
  <line x1="62" y1="244" x2="125" y2="244" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <circle cx="25" cy="40" r="1.5" fill="#FCD34D" opacity="0.25"/>
  <circle cx="175" cy="35" r="1" fill="#FCD34D" opacity="0.2"/>
</svg>`,
  "the-painter-upstairs": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="30" y="40" width="140" height="170" rx="4" fill="#241A0E"/>
  <rect x="40" y="50" width="50" height="70" rx="2" fill="#2E2010"/>
  <rect x="100" y="50" width="60" height="70" rx="2" fill="#2E2010"/>
  <rect x="40" y="130" width="50" height="70" rx="2" fill="#2E2010"/>
  <rect x="100" y="130" width="60" height="70" rx="2" fill="#FCD34D" opacity="0.15"/>
  <rect x="108" y="138" width="44" height="54" rx="1" fill="#3A2A10"/>
  <rect x="112" y="142" width="36" height="42" rx="1" fill="#FCD34D" opacity="0.1"/>
  <ellipse cx="130" cy="163" rx="12" ry="15" fill="#FCD34D" opacity="0.2"/>
  <line x1="118" y1="155" x2="148" y2="155" stroke="#FCD34D" stroke-width="1" opacity="0.3"/>
  <line x1="118" y1="162" x2="145" y2="162" stroke="#FCD34D" stroke-width="1" opacity="0.25"/>
  <line x1="118" y1="169" x2="140" y2="169" stroke="#FCD34D" stroke-width="1" opacity="0.2"/>
  <path d="M30 215 L170 215 L160 240 L40 240Z" fill="#1E1408"/>
  <path d="M60" y1="215" x2="60" y2="240"/>
  <line x1="60" y1="215" x2="60" y2="240" stroke="#FCD34D" stroke-width="0.5" opacity="0.2"/>
  <line x1="100" y1="215" x2="100" y2="240" stroke="#FCD34D" stroke-width="0.5" opacity="0.2"/>
  <line x1="140" y1="215" x2="140" y2="240" stroke="#FCD34D" stroke-width="0.5" opacity="0.2"/>
  <ellipse cx="100" cy="270" rx="70" ry="8" fill="#FCD34D" opacity="0.05"/>
</svg>`,
  "the-rainy-afternoon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#1A1208"/>
  <rect x="0" y="0" width="200" height="120" fill="#1a2030"/>
  <rect x="20" y="20" width="60" height="40" rx="20" fill="#253040"/>
  <rect x="60" y="15" width="80" height="45" rx="22" fill="#2a3545"/>
  <rect x="120" y="22" width="55" height="38" rx="18" fill="#253040"/>
  <line x1="35" y1="65" x2="30" y2="90" stroke="#67a8c0" stroke-width="1.5" opacity="0.5"/>
  <line x1="55" y1="62" x2="50" y2="87" stroke="#67a8c0" stroke-width="1.5" opacity="0.4"/>
  <line x1="80" y1="63" x2="75" y2="88" stroke="#67a8c0" stroke-width="1.5" opacity="0.5"/>
  <line x1="105" y1="60" x2="100" y2="85" stroke="#67a8c0" stroke-width="1.5" opacity="0.4"/>
  <line x1="130" y1="62" x2="125" y2="87" stroke="#67a8c0" stroke-width="1.5" opacity="0.5"/>
  <line x1="155" y1="65" x2="150" y2="90" stroke="#67a8c0" stroke-width="1.5" opacity="0.4"/>
  <line x1="175" y1="63" x2="170" y2="88" stroke="#67a8c0" stroke-width="1.5" opacity="0.3"/>
  <rect x="30" y="160" width="140" height="90" rx="6" fill="#241A0A"/>
  <rect x="45" y="170" width="50" height="40" rx="3" fill="#FCD34D" opacity="0.15"/>
  <rect x="50" y="175" width="40" height="30" rx="2" fill="#FCD34D" opacity="0.1"/>
  <ellipse cx="70" cy="185" rx="12" ry="10" fill="#7A5225" opacity="0.6"/>
  <ellipse cx="70" cy="177" rx="9" ry="9" fill="#8B6030" opacity="0.7"/>
  <ellipse cx="130" cy="188" rx="10" ry="8" fill="#5A3A1A" opacity="0.7"/>
  <ellipse cx="130" cy="181" rx="8" ry="8" fill="#6B4520" opacity="0.8"/>
  <path d="M85 210 Q100 200 115 210 Q100 220 85 210Z" fill="#FCD34D" opacity="0.3"/>
</svg>`,
  "the-rivers-edge": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0D2016"/>
  <rect x="0" y="150" width="200" height="130" fill="#0A1A10"/>
  <path d="M0 150 Q50 130 100 155 Q150 175 200 150 L200 280 L0 280Z" fill="#0F2A1A"/>
  <path d="M0 170 Q40 155 80 170 Q120 185 160 165 Q180 158 200 165 L200 280 L0 280Z" fill="#1a3d25" opacity="0.7"/>
  <rect x="0" y="175" width="200" height="3" fill="#4ADE80" opacity="0.25"/>
  <ellipse cx="60" cy="165" rx="8" ry="20" fill="#1a4a25"/>
  <ellipse cx="80" cy="155" rx="6" ry="18" fill="#1a4a25"/>
  <ellipse cx="130" cy="160" rx="9" ry="22" fill="#1a4a25"/>
  <ellipse cx="155" cy="150" rx="7" ry="16" fill="#1a4a25"/>
  <ellipse cx="60" cy="145" rx="18" ry="22" fill="#0f3518"/>
  <ellipse cx="80" cy="135" rx="14" ry="20" fill="#0f3518"/>
  <ellipse cx="130" cy="138" rx="20" ry="25" fill="#0f3518"/>
  <ellipse cx="155" cy="132" rx="16" ry="18" fill="#0f3518"/>
  <path d="M85 175 L95 90 L105 175" fill="none" stroke="#4ADE80" stroke-width="1" opacity="0.4"/>
  <circle cx="95" cy="88" r="4" fill="#4ADE80" opacity="0.6"/>
  <path d="M20 200 Q60 195 100 200 Q140 205 180 198" stroke="#4ADE80" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M10 215 Q55 208 100 215 Q145 222 190 212" stroke="#4ADE80" stroke-width="1" fill="none" opacity="0.2"/>
</svg>`,
  "why-we-dream": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <rect width="200" height="280" fill="#0F1A24"/>
  <ellipse cx="100" cy="140" rx="75" ry="90" fill="#162030" opacity="0.8"/>
  <ellipse cx="100" cy="140" rx="55" ry="70" fill="#1a2840" opacity="0.6"/>
  <ellipse cx="80" cy="120" rx="30" ry="25" fill="#1E3550" opacity="0.5"/>
  <path d="M55 100 Q80 70 110 85 Q135 98 125 120 Q115 142 90 138 Q60 133 55 100Z" fill="#243A55" opacity="0.7"/>
  <circle cx="85" cy="108" r="8" fill="#67E8F9" opacity="0.15"/>
  <circle cx="105" cy="100" r="5" fill="#67E8F9" opacity="0.1"/>
  <path d="M65 80 Q100 50 140 75" stroke="#67E8F9" stroke-width="1" fill="none" opacity="0.3"/>
  <path d="M50 110 Q45 90 60 75 Q80 55 105 65 Q130 75 125 100" stroke="#67E8F9" stroke-width="0.8" fill="none" opacity="0.2"/>
  <circle cx="100" cy="30" r="15" fill="none" stroke="#67E8F9" stroke-width="1" opacity="0.4"/>
  <circle cx="100" cy="30" r="8" fill="#67E8F9" opacity="0.2"/>
  <path d="M85 30 Q100 20 115 30 Q100 40 85 30Z" fill="#67E8F9" opacity="0.5"/>
  <circle cx="30" cy="50" r="2" fill="#fff" opacity="0.5"/>
  <circle cx="170" cy="40" r="1.5" fill="#fff" opacity="0.4"/>
  <circle cx="160" cy="70" r="1" fill="#fff" opacity="0.3"/>
  <circle cx="20" cy="90" r="1.5" fill="#fff" opacity="0.3"/>
  <path d="M100 200 Q130 220 100 240 Q70 220 100 200Z" fill="#67E8F9" opacity="0.1"/>
</svg>`,
};

export function StoryCard({ story }: { story: Story }) {
  const { t } = useT();
  const svg = COVERS[story.slug];

  return (
    <Link to="/story/$slug" params={{ slug: story.slug }}>
      <div className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${story.coverHue}`}>
          {svg ? (
            <div
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{ lineHeight: 0 }}
            />
          ) : (
            <span className="text-5xl drop-shadow-sm">{story.cover}</span>
          )}
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>{t(`genre.${story.genre}`)}</span>
            <span aria-hidden>·</span>
            <span>{t(`level.${story.level}`)}</span>
            <span aria-hidden>·</span>
            <span>{story.minutes} {t("common.minutes")}</span>
          </div>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
            {story.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{story.blurb}</p>
        </div>
      </div>
    </Link>
  );
}