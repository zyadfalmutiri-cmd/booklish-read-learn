// src/lib/cover-svg-generator.ts
import type { Story } from "@/lib/types";

/**
 * توليد غلاف القصة كـ SVG بالكامل — بدون أي ذكاء اصطناعي وبدون أي استدعاء
 * شبكة خارجي. الأيقونة + الخلفية + العنوان كلها تُرسم برمجيًا هنا، فالنتيجة
 * مضمونة 100% نفس الستايل كل مرة، وفورية (ما فيه انتظار أو Rate Limit أو
 * Quota لأنه ما يتصل بأي API).
 */

const ICONS: Record<string, string> = {
  "key": `<circle cx="110" cy="90" r="45" fill="none" stroke="currentColor" stroke-width="18"/><rect x="150" y="80" width="120" height="20" rx="6"/><rect x="220" y="100" width="18" height="35"/><rect x="255" y="100" width="18" height="45"/>`,
  "bus": `<rect x="40" y="90" width="220" height="110" rx="20"/><rect x="65" y="115" width="45" height="40" fill="#fff" opacity="0.85"/><rect x="125" y="115" width="45" height="40" fill="#fff" opacity="0.85"/><rect x="185" y="115" width="45" height="40" fill="#fff" opacity="0.85"/><circle cx="95" cy="210" r="22"/><circle cx="215" cy="210" r="22"/>`,
  "wave": `<path d="M20 160 Q 70 120 120 160 T 220 160 T 300 160 V 260 H 20 Z"/><path d="M20 200 Q 70 170 120 200 T 220 200 T 300 200 V 260 H 20 Z" opacity="0.6"/>`,
  "lighthouse": `<polygon points="130,40 170,40 190,220 110,220"/><rect x="95" y="220" width="110" height="24" rx="4"/><rect x="115" y="70" width="70" height="18" fill="#fff" opacity="0.9"/><path d="M195 60 L260 30 L260 50 L200 78 Z" opacity="0.7"/>`,
  "coffee-cup": `<path d="M70 110 H210 V190 Q210 230 150 230 Q90 230 90 190 Z"/><path d="M210 125 Q255 125 255 160 Q255 195 210 190" fill="none" stroke="currentColor" stroke-width="16"/><path d="M110 60 Q120 80 110 95" fill="none" stroke="currentColor" stroke-width="10" opacity="0.7"/><path d="M150 55 Q160 75 150 90" fill="none" stroke="currentColor" stroke-width="10" opacity="0.7"/>`,
  "satellite": `<rect x="120" y="90" width="60" height="110" rx="14"/><polygon points="150,40 180,90 120,90"/><rect x="60" y="110" width="55" height="35" opacity="0.75"/><rect x="185" y="110" width="55" height="35" opacity="0.75"/><circle cx="150" cy="230" r="10"/>`,
  "paintbrush": `<rect x="60" y="60" width="150" height="120" fill="none" stroke="currentColor" stroke-width="14"/><rect x="90" y="90" width="90" height="60" opacity="0.6"/><path d="M215 70 L260 25 L275 40 L230 85 Z"/><rect x="205" y="80" width="20" height="20" transform="rotate(45 215 90)"/>`,
  "moon-stars": `<path d="M180 50 A80 80 0 1 0 200 210 A65 65 0 1 1 180 50 Z"/><circle cx="245" cy="70" r="8"/><circle cx="220" cy="120" r="5"/><circle cx="260" cy="130" r="6"/>`,
  "dog": `<ellipse cx="150" cy="170" rx="80" ry="55"/><circle cx="150" cy="105" r="50"/><ellipse cx="105" cy="70" rx="22" ry="34" transform="rotate(-20 105 70)"/><ellipse cx="195" cy="70" rx="22" ry="34" transform="rotate(20 195 70)"/><rect x="230" y="150" width="55" height="16" rx="8" transform="rotate(30 230 150)"/>`,
  "friendship": `<circle cx="110" cy="90" r="40"/><rect x="65" y="130" width="90" height="100" rx="30"/><circle cx="200" cy="100" r="34"/><rect x="163" y="134" width="78" height="90" rx="26" opacity="0.85"/>`,
  "umbrella": `<path d="M40 140 A110 110 0 0 1 260 140 Z"/><rect x="142" y="140" width="16" height="110" rx="8"/><path d="M158 235 q0 25 -25 25" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="70" cy="140" r="10"/><circle cx="150" cy="130" r="10"/><circle cx="230" cy="140" r="10"/>`,
  "bicycle": `<circle cx="80" cy="190" r="48" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="220" cy="190" r="48" fill="none" stroke="currentColor" stroke-width="14"/><path d="M80 190 L140 90 L220 190 M140 90 L110 190 M140 90 L175 130" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><circle cx="175" cy="130" r="14"/>`,
  "cooking": `<path d="M75 130 Q75 80 150 80 Q225 80 225 130 Z"/><rect x="65" y="130" width="170" height="18" rx="8"/><rect x="90" y="160" width="120" height="70" rx="10" fill="none" stroke="currentColor" stroke-width="16"/>`,
  "house": `<polygon points="150,50 260,140 40,140"/><rect x="70" y="140" width="160" height="110"/><rect x="130" y="180" width="40" height="70" fill="#fff" opacity="0.85"/>`,
  "letter": `<rect x="50" y="80" width="200" height="140" rx="10"/><polyline points="55,90 150,170 245,90" fill="none" stroke="#fff" stroke-width="12" opacity="0.9"/>`,
  "city-skyline": `<rect x="40" y="140" width="45" height="110"/><rect x="95" y="100" width="55" height="150"/><rect x="160" y="120" width="45" height="130"/><rect x="215" y="80" width="50" height="170"/><rect x="105" y="120" width="12" height="12" fill="#fff" opacity="0.8"/><rect x="230" y="105" width="12" height="12" fill="#fff" opacity="0.8"/>`,
  "runner": `<circle cx="165" cy="55" r="26"/><path d="M165 85 L130 150 L175 160 L150 240 M165 85 L215 130 L190 175 M130 150 L75 130 M175 160 L235 190" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>`,
  "photo-frame": `<rect x="55" y="55" width="190" height="190" rx="8" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="115" cy="120" r="22"/><polygon points="80,210 140,140 180,180 210,150 240,210"/>`,
  "music-note": `<circle cx="90" cy="215" r="30"/><circle cx="210" cy="195" r="30"/><rect x="115" y="70" width="14" height="150"/><rect x="235" y="55" width="14" height="145"/><path d="M115 70 L249 55 V90 L115 105 Z"/>`,
  "open-book": `<path d="M150 80 Q90 50 40 75 V210 Q90 185 150 210 Z"/><path d="M150 80 Q210 50 260 75 V210 Q210 185 150 210 Z" opacity="0.8"/>`,
  "archive-folder": `<path d="M40 90 H130 L150 115 H260 V225 H40 Z"/><rect x="70" y="150" width="160" height="14" fill="#fff" opacity="0.6"/><rect x="70" y="180" width="120" height="14" fill="#fff" opacity="0.6"/>`,
  "speech-bubbles": `<path d="M40 60 H180 V150 H100 L70 180 V150 H40 Z"/><path d="M260 100 H130 V190 H175 L205 220 V190 H260 Z" opacity="0.8"/>`,
  "clock": `<circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" stroke-width="18"/><line x1="150" y1="150" x2="150" y2="80" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><line x1="150" y1="150" x2="205" y2="175" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><circle cx="150" cy="150" r="10"/>`,
  "tree": `<circle cx="150" cy="100" r="80"/><rect x="132" y="170" width="36" height="80" rx="8"/>`,
  "plate-food": `<circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="120" cy="130" r="25"/><circle cx="175" cy="150" r="18"/><circle cx="140" cy="185" r="15"/>`,
  "radio": `<rect x="55" y="110" width="190" height="120" rx="14"/><circle cx="110" cy="170" r="28" fill="none" stroke="#fff" stroke-width="10" opacity="0.85"/><rect x="170" y="150" width="55" height="40" fill="#fff" opacity="0.7"/><rect x="90" y="70" width="14" height="45" transform="rotate(-25 97 92)"/><circle cx="90" cy="70" r="10"/>`,
  "basket": `<path d="M60 130 H240 L215 235 H85 Z"/><path d="M100 130 Q150 60 200 130" fill="none" stroke="currentColor" stroke-width="14"/><circle cx="120" cy="175" r="14" fill="#fff" opacity="0.8"/><circle cx="160" cy="185" r="16" fill="#fff" opacity="0.8"/><circle cx="200" cy="170" r="13" fill="#fff" opacity="0.8"/>`,
  "cat": `<ellipse cx="150" cy="185" rx="75" ry="50"/><circle cx="150" cy="115" r="55"/><polygon points="105,80 90,30 135,75"/><polygon points="195,80 210,30 165,75"/><ellipse cx="230" cy="200" rx="10" ry="45" transform="rotate(40 230 200)"/>`,
  "backpack": `<rect x="80" y="90" width="140" height="150" rx="26"/><rect x="105" y="60" width="90" height="45" rx="20"/><rect x="115" y="140" width="70" height="55" rx="10" fill="#fff" opacity="0.7"/>`,
  "briefcase": `<rect x="55" y="110" width="190" height="130" rx="14"/><rect x="120" y="80" width="60" height="35" rx="10" fill="none" stroke="currentColor" stroke-width="14"/><rect x="55" y="160" width="190" height="18" opacity="0.6"/>`,
  "phone": `<rect x="100" y="40" width="100" height="220" rx="20" fill="none" stroke="currentColor" stroke-width="16"/><line x1="130" y1="220" x2="170" y2="220" stroke="currentColor" stroke-width="10" stroke-linecap="round"/><line x1="115" y1="80" x2="185" y2="180" stroke="currentColor" stroke-width="10" opacity="0.8"/><line x1="185" y1="90" x2="130" y2="170" stroke="currentColor" stroke-width="10" opacity="0.8"/>`,
  "moving-boxes": `<rect x="50" y="140" width="95" height="95"/><rect x="155" y="110" width="105" height="125"/><line x1="97" y1="140" x2="97" y2="235" stroke="#fff" stroke-width="8" opacity="0.6"/><line x1="50" y1="187" x2="145" y2="187" stroke="#fff" stroke-width="8" opacity="0.6"/><line x1="207" y1="110" x2="207" y2="235" stroke="#fff" stroke-width="8" opacity="0.6"/><line x1="155" y1="172" x2="260" y2="172" stroke="#fff" stroke-width="8" opacity="0.6"/>`,
  "wallet": `<rect x="45" y="90" width="210" height="140" rx="16"/><rect x="150" y="140" width="80" height="55" rx="10" fill="#fff" opacity="0.85"/><circle cx="205" cy="167" r="10"/>`,
  "chalkboard": `<rect x="45" y="60" width="210" height="140" rx="10" fill="none" stroke="currentColor" stroke-width="16"/><line x1="80" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="10" opacity="0.7"/><line x1="80" y1="130" x2="220" y2="130" stroke="currentColor" stroke-width="10" opacity="0.7"/><line x1="80" y1="160" x2="150" y2="160" stroke="currentColor" stroke-width="10" opacity="0.7"/><rect x="120" y="210" width="60" height="14" rx="6"/>`,
  "suitcase": `<rect x="50" y="110" width="200" height="130" rx="16"/><rect x="120" y="80" width="60" height="35" rx="10" fill="none" stroke="currentColor" stroke-width="14"/><line x1="150" y1="110" x2="150" y2="240" stroke="#fff" stroke-width="8" opacity="0.6"/>`,
  "crossroads": `<line x1="150" y1="40" x2="150" y2="260" stroke="currentColor" stroke-width="16"/><line x1="60" y1="150" x2="240" y2="90" stroke="currentColor" stroke-width="16"/><line x1="60" y1="150" x2="240" y2="210" stroke="currentColor" stroke-width="16"/><circle cx="150" cy="150" r="16"/>`,
  "mountain": `<polygon points="150,50 260,240 40,240"/><polygon points="150,50 200,240 100,240" opacity="0.6"/><circle cx="205" cy="90" r="24"/>`,
  "garden": `<rect x="30" y="220" width="240" height="20"/><circle cx="90" cy="150" r="45"/><rect x="80" y="195" width="20" height="30"/><circle cx="170" cy="120" r="55"/><rect x="158" y="172" width="24" height="53"/><circle cx="240" cy="160" r="35"/><rect x="230" y="195" width="20" height="30"/>`,
  "heart": `<path d="M150 235 C 40 160 40 80 105 65 C 135 58 150 90 150 90 C 150 90 165 58 195 65 C 260 80 260 160 150 235 Z"/>`,
  "megaphone": `<polygon points="60,120 170,70 170,220 60,170"/><rect x="30" y="130" width="35" height="50" rx="10"/><path d="M170 90 Q230 100 230 140 Q230 180 170 190" fill="none" stroke="currentColor" stroke-width="16"/>`,
  "justice-scale": `<line x1="150" y1="45" x2="150" y2="230" stroke="currentColor" stroke-width="16"/><line x1="70" y1="90" x2="230" y2="90" stroke="currentColor" stroke-width="14"/><circle cx="150" cy="45" r="14"/><path d="M70 90 L45 150 A30 24 0 0 0 95 150 Z"/><path d="M230 90 L205 150 A30 24 0 0 0 255 150 Z"/><rect x="100" y="230" width="100" height="18" rx="8"/>`,
  "peace-dove": `<ellipse cx="160" cy="150" rx="70" ry="40" transform="rotate(-10 160 150)"/><circle cx="95" cy="130" r="24"/><polygon points="200,110 270,70 220,150"/><polygon points="80,110 45,90 90,140"/>`,
  "globe": `<circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" stroke-width="16"/><ellipse cx="150" cy="150" rx="45" ry="105" fill="none" stroke="currentColor" stroke-width="10"/><line x1="45" y1="150" x2="255" y2="150" stroke="currentColor" stroke-width="10"/><line x1="60" y1="95" x2="240" y2="95" stroke="currentColor" stroke-width="8" opacity="0.7"/><line x1="60" y1="205" x2="240" y2="205" stroke="currentColor" stroke-width="8" opacity="0.7"/>`,
  "brain-ai": `<path d="M150 60 C90 60 70 110 90 140 C 70 160 80 210 130 220 C 140 235 165 235 175 220 C 225 210 235 160 215 140 C 235 110 210 60 150 60 Z"/><line x1="150" y1="80" x2="150" y2="215" stroke="#fff" stroke-width="8" opacity="0.5"/><circle cx="110" cy="120" r="8" fill="#fff" opacity="0.7"/><circle cx="190" cy="120" r="8" fill="#fff" opacity="0.7"/><circle cx="110" cy="175" r="8" fill="#fff" opacity="0.7"/><circle cx="190" cy="175" r="8" fill="#fff" opacity="0.7"/>`,
  "crown": `<polygon points="55,220 55,120 105,165 150,90 195,165 245,120 245,220"/><rect x="55" y="220" width="190" height="24" rx="6"/>`,
  "sun": `<circle cx="150" cy="150" r="55"/><g stroke="currentColor" stroke-width="14" stroke-linecap="round"><line x1="150" y1="40" x2="150" y2="15"/><line x1="150" y1="260" x2="150" y2="285"/><line x1="40" y1="150" x2="15" y2="150"/><line x1="260" y1="150" x2="285" y2="150"/><line x1="72" y1="72" x2="53" y2="53"/><line x1="228" y1="228" x2="247" y2="247"/><line x1="228" y1="72" x2="247" y2="53"/><line x1="72" y1="228" x2="53" y2="247"/></g>`,
  "virus": `<circle cx="150" cy="150" r="55"/><g stroke="currentColor" stroke-width="12" stroke-linecap="round"><line x1="150" y1="85" x2="150" y2="55"/><line x1="150" y1="215" x2="150" y2="245"/><line x1="85" y1="150" x2="55" y2="150"/><line x1="215" y1="150" x2="245" y2="150"/><line x1="107" y1="107" x2="85" y2="85"/><line x1="193" y1="193" x2="215" y2="215"/><line x1="193" y1="107" x2="215" y2="85"/><line x1="107" y1="193" x2="85" y2="215"/></g><circle cx="150" cy="85" r="10"/><circle cx="150" cy="215" r="10"/><circle cx="85" cy="150" r="10"/><circle cx="215" cy="150" r="10"/>`,
  "bee": `<ellipse cx="150" cy="160" rx="60" ry="45"/><rect x="100" y="140" width="100" height="14" fill="#fff" opacity="0.85"/><rect x="100" y="170" width="100" height="14" fill="#fff" opacity="0.85"/><circle cx="150" cy="100" r="28"/><ellipse cx="105" cy="100" rx="35" ry="20" opacity="0.6" transform="rotate(-20 105 100)"/><ellipse cx="195" cy="100" rx="35" ry="20" opacity="0.6" transform="rotate(20 195 100)"/>`,
  "nesting-doll": `<path d="M150 50 C120 50 110 75 115 95 C90 110 80 150 90 180 C 80 210 100 250 150 250 C200 250 220 210 210 180 C 220 150 210 110 185 95 C 190 75 180 50 150 50 Z"/><circle cx="150" cy="90" r="18" fill="#fff" opacity="0.7"/><path d="M120 140 Q150 155 180 140" fill="none" stroke="#fff" stroke-width="8" opacity="0.7"/>`,
  "ancient-column": `<rect x="80" y="55" width="140" height="24"/><rect x="100" y="85" width="100" height="150"/><rect x="75" y="235" width="150" height="22"/><line x1="115" y1="90" x2="115" y2="230" stroke="#fff" stroke-width="6" opacity="0.4"/><line x1="150" y1="90" x2="150" y2="230" stroke="#fff" stroke-width="6" opacity="0.4"/><line x1="185" y1="90" x2="185" y2="230" stroke="#fff" stroke-width="6" opacity="0.4"/>`,
  "soccer": `<circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" stroke-width="16"/><polygon points="150,110 175,130 165,160 135,160 125,130" fill="currentColor"/><line x1="150" y1="110" x2="150" y2="60" stroke="currentColor" stroke-width="10"/><line x1="175" y1="130" x2="220" y2="105" stroke="currentColor" stroke-width="10"/><line x1="165" y1="160" x2="190" y2="205" stroke="currentColor" stroke-width="10"/><line x1="135" y1="160" x2="110" y2="205" stroke="currentColor" stroke-width="10"/><line x1="125" y1="130" x2="80" y2="105" stroke="currentColor" stroke-width="10"/>`,
  "growth-chart": `<rect x="50" y="190" width="40" height="60"/><rect x="110" y="150" width="40" height="100"/><rect x="170" y="100" width="40" height="150"/><rect x="230" y="60" width="30" height="190"/><path d="M55 150 L120 110 L180 80 L250 40" fill="none" stroke="currentColor" stroke-width="10" opacity="0.6"/>`,
  "atom": `<circle cx="150" cy="150" r="16"/><ellipse cx="150" cy="150" rx="110" ry="42" fill="none" stroke="currentColor" stroke-width="12"/><ellipse cx="150" cy="150" rx="110" ry="42" fill="none" stroke="currentColor" stroke-width="12" transform="rotate(60 150 150)"/><ellipse cx="150" cy="150" rx="110" ry="42" fill="none" stroke="currentColor" stroke-width="12" transform="rotate(120 150 150)"/>`,
  "face-emotion": `<circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="115" cy="130" r="12"/><circle cx="185" cy="130" r="12"/><path d="M110 190 Q150 220 190 190" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>`,
  "compass": `<circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" stroke-width="14"/><polygon points="150,85 175,150 150,145 125,150"/><polygon points="150,215 125,150 150,155 175,150" opacity="0.6"/>`,
  "broken-window": `<rect x="55" y="55" width="190" height="190" fill="none" stroke="currentColor" stroke-width="14"/><line x1="150" y1="55" x2="150" y2="245" stroke="currentColor" stroke-width="10"/><line x1="55" y1="150" x2="245" y2="150" stroke="currentColor" stroke-width="10"/><path d="M150 150 L110 90 M150 150 L195 75 M150 150 L210 175 M150 150 L100 200" stroke="currentColor" stroke-width="8" opacity="0.7"/>`,
  "cake": `<rect x="65" y="150" width="170" height="90" rx="10"/><rect x="65" y="120" width="170" height="30" opacity="0.8"/><rect x="140" y="70" width="20" height="45"/><ellipse cx="150" cy="65" rx="10" ry="14"/><line x1="105" y1="150" x2="105" y2="240" stroke="#fff" stroke-width="6" opacity="0.5"/><line x1="195" y1="150" x2="195" y2="240" stroke="#fff" stroke-width="6" opacity="0.5"/>`,
  "bird-small": `<ellipse cx="160" cy="160" rx="55" ry="38" transform="rotate(-15 160 160)"/><circle cx="105" cy="140" r="22"/><polygon points="190,130 240,110 205,155"/><polygon points="80,150 55,175 100,165" opacity="0.7"/>`,
};

interface GenrePalette {
  bgTop: string;
  bgBottom: string;
  accent: string;
}

const GENRE_PALETTE: Record<string, GenrePalette> = {
  mystery: { bgTop: "#3a3d5c", bgBottom: "#2b2d42", accent: "#f2c14e" },
  romance: { bgTop: "#f9dde6", bgBottom: "#f4c2c2", accent: "#b5495b" },
  "sci-fi": { bgTop: "#cdd6f4", bgBottom: "#a9b6e8", accent: "#3d4a8a" },
  adventure: { bgTop: "#aee0f0", bgBottom: "#f6e3a1", accent: "#2e6f8e" },
  drama: { bgTop: "#ecd3c8", bgBottom: "#d9a9a9", accent: "#6b3e3e" },
  "non-fiction": { bgTop: "#f3e7c4", bgBottom: "#e0c58e", accent: "#7a5c3e" },
};

const DEFAULT_PALETTE: GenrePalette = { bgTop: "#e9e4f0", bgBottom: "#cfc6e0", accent: "#4a3f6b" };

const GENRE_DEFAULT_ICON: Record<string, string> = {
  mystery: "compass",
  romance: "heart",
  "sci-fi": "satellite",
  adventure: "compass",
  drama: "face-emotion",
  "non-fiction": "open-book",
};

// خريطة slug القصة → اسم الأيقونة الأنسب لموضوعها (مبنية يدويًا من عنوان/بلورب كل قصة)
const SLUG_ICON_MAP: Record<string, string> = {
  "the-missing-key": "key",
  "the-night-bus": "bus",
  "the-rivers-edge": "wave",
  "letters-from-the-lighthouse": "lighthouse",
  "the-coffee-bean-journey": "coffee-cup",
  "echoes-of-mars": "satellite",
  "the-painter-upstairs": "paintbrush",
  "the-last-train-home": "bus",
  "why-we-dream": "moon-stars",
  "the-lost-dog": "dog",
  "a-new-friend": "friendship",
  "the-rainy-afternoon": "umbrella",
  "the-blue-bicycle": "bicycle",
  "grandmothers-recipe": "cooking",
  "first-day": "cooking",
  "the-kind-stranger": "heart",
  "the-broken-window": "broken-window",
  "the-little-bird": "bird-small",
  "a-birthday-surprise": "cake",
  "the-empty-house": "house",
  "a-letter-from-paris": "letter",
  "lost-in-the-city": "city-skyline",
  "the-marathon": "runner",
  "the-old-photograph": "photo-frame",
  "a-strange-discovery": "wave",
  "the-musician": "music-note",
  "the-last-library": "open-book",
  "the-inheritance": "archive-folder",
  "between-two-worlds": "speech-bubbles",
  "the-clock-tower": "clock",
  "the-red-umbrella": "umbrella",
  "my-morning-coffee": "coffee-cup",
  "a-walk-in-the-park": "tree",
  "the-new-neighbor": "house",
  "my-favorite-food": "plate-food",
  "the-old-radio": "radio",
  "a-day-at-the-market": "basket",
  "the-little-cat": "cat",
  "my-school-bag": "backpack",
  "the-quiet-morning": "sun",
  "the-summer-job": "briefcase",
  "a-letter-to-mom": "letter",
  "the-broken-phone": "phone",
  "moving-to-a-new-city": "moving-boxes",
  "the-cooking-class": "cooking",
  "a-weekend-trip": "compass",
  "the-lost-wallet": "wallet",
  "learning-to-swim": "wave",
  "the-new-teacher": "chalkboard",
  "a-surprise-visit": "suitcase",
  "the-job-interview": "briefcase",
  "a-difficult-decision": "crossroads",
  "the-family-reunion": "friendship",
  "starting-a-business": "cooking",
  "the-hiking-accident": "mountain",
  "a-misunderstanding": "speech-bubbles",
  "the-online-friend": "speech-bubbles",
  "changing-careers": "briefcase",
  "the-neighborhood-garden": "garden",
  "a-second-chance": "heart",
  "the-whistleblower": "megaphone",
  "a-question-of-trust": "justice-scale",
  "the-art-forger": "paintbrush",
  "negotiating-peace": "peace-dove",
  "the-refugee-story": "suitcase",
  "an-unexpected-inheritance": "archive-folder",
  "the-climate-scientist": "globe",
  "a-city-divided": "city-skyline",
  "the-memory-thief": "brain-ai",
  "breaking-the-silence": "megaphone",
  "the-philosopher-king": "crown",
  "a-matter-of-perspective": "speech-bubbles",
  "the-linguist": "open-book",
  "echoes-of-the-past": "ancient-column",
  "the-diplomat": "globe",
  "an-ethical-dilemma": "justice-scale",
  "the-archivist": "archive-folder",
  "shadows-of-empire": "ancient-column",
  "the-consciousness-question": "brain-ai",
  "a-fragile-peace": "peace-dove",
  "ronaldo-from-poverty-to-glory": "soccer",
  "messi-overcoming-growth-hormone-deficiency": "soccer",
  "roberto-baggio-died-standing": "soccer",
  "vitamin-d-sunshine-vitamin": "sun",
  "queen-elizabeth-longest-reign": "crown",
  "covid-19-global-pandemic": "virus",
  "bees-tiny-workers": "bee",
  "matryoshka-russian-doll": "nesting-doll",
  "nanotechnology-tiny-machines": "atom",
  "madain-saleh-hegra": "ancient-column",
  "understanding-emotions": "face-emotion",
  "inflation-rising-prices": "growth-chart",
  "child-aggression-understanding": "friendship",

  // ── قصص الأخبار الجديدة (news-a1 / news-a2 / news-b1) ──
  "a-new-moon-mission": "satellite",
  "a-robot-taxi-in-the-sky": "bus",
  "the-world-cup-in-three-countries": "soccer",
  "ice-and-snow-in-italy": "mountain",
  "a-woman-wins-the-derby": "runner",
  "a-big-birthday-for-america": "cake",
  "the-sun-disappears": "moon-stars",
  "a-new-baby-panda": "cat",
  "millions-walk-to-mecca": "compass",
  "a-fast-train-opens": "bus",
  "mosquitoes-with-a-mission": "bee",
  "the-uae-leaves-an-old-club": "briefcase",
  "a-star-bigger-than-our-solar-system": "satellite",
  "building-vertiports": "city-skyline",
  "the-olympic-torch-travels": "sun",
  "a-sequel-after-20-years": "photo-frame",
  "farmers-face-a-dry-year": "garden",
  "a-city-rebuilds-after-an-earthquake": "broken-window",
  "new-rules-for-online-privacy": "justice-scale",
  "a-museum-celebrates-250-years": "ancient-column",
  "when-ai-learns-to-talk-back": "brain-ai",
  "a-health-emergency-in-central-africa": "virus",
  "locking-the-world-out-of-ai": "globe",
  "graves-moved-for-a-golf-resort": "ancient-column",
  "womens-rights-on-a-global-stage": "justice-scale",
  "drones-cross-a-border": "satellite",
  "a-smoke-cloud-over-a-city": "city-skyline",
  "the-cost-of-flying-taxis": "growth-chart",
  "a-sacred-statue-goes-missing": "ancient-column",
  "coral-reefs-under-pressure": "wave",
};

function pickIcon(story: Story): string {
  const bySlug = SLUG_ICON_MAP[story.slug];
  if (bySlug && ICONS[bySlug]) return bySlug;
  return GENRE_DEFAULT_ICON[story.genre] || "open-book";
}

// يلف نص العنوان لأسطر متعددة حسب عدد الحروف التقريبي المسموح بالسطر
function wrapTitle(title: string, maxCharsPerLine: number): string[] {
  const words = title.toUpperCase().split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * يبني SVG كامل لغلاف القصة: خلفية متدرجة حسب النوع + أيقونة رمزية
 * بمنتصف/أسفل الغلاف + عنوان القصة كنص SVG حقيقي بالأعلى (واضح ومقروء
 * دائمًا لأنه نص SVG فعلي، مو رسمة ذكاء اصطناعي).
 */
export function buildCoverSVG(story: Story): string {
  const width = 800;
  const height = 1200;
  const palette = GENRE_PALETTE[story.genre] || DEFAULT_PALETTE;
  const iconKey = pickIcon(story);
  const iconBody = ICONS[iconKey] || ICONS["open-book"];

  const lines = wrapTitle(story.title, 16).slice(0, 3);
  let fontSize = 62;
  if (lines.length === 2) fontSize = 52;
  if (lines.length >= 3) fontSize = 42;

  const titleZoneHeight = height * 0.3;
  const lineHeight = fontSize * 1.2;
  const blockHeight = lines.length * lineHeight;
  const startY = titleZoneHeight / 2 - blockHeight / 2 + fontSize * 0.85;

  const textTspans = lines
    .map(
      (line, i) =>
        `<tspan x="${width / 2}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  // الأيقونة مرسومة أصلًا بصندوق 300x300، نكبّرها ونمركزها بالثلثين السفليين
  const iconScale = 2.05;
  const iconBoxSize = 300 * iconScale;
  const iconX = (width - iconBoxSize) / 2;
  const iconY = titleZoneHeight + (height - titleZoneHeight - iconBoxSize) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.bgTop}"/>
      <stop offset="100%" stop-color="${palette.bgBottom}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <g transform="translate(${iconX} ${iconY}) scale(${iconScale})" style="color:${palette.accent}" fill="${palette.accent}">
    ${iconBody}
  </g>
  <text
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="800"
    font-size="${fontSize}"
    fill="#1a1a1a"
    text-anchor="middle"
    style="paint-order: stroke; stroke: rgba(255,255,255,0.5); stroke-width: ${Math.max(3, fontSize * 0.05)}px;"
  >${textTspans}</text>
</svg>`;
}

/**
 * تحويل SVG string إلى Blob جاهز للرفع لـ Supabase Storage (نوعه image/svg+xml)
 */
export function svgToBlob(svg: string): Blob {
  return new Blob([svg], { type: "image/svg+xml" });
}
