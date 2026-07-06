import { Link, useNavigate } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";

const COVERS: Record<string, string> = {
  "a-birthday-surprise": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgabirthdaysurprise" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shabirthdaysurprise" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgabirthdaysurprise)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shabirthdaysurprise)">
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="url(#gaabirthdaysurprise)"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="url(#gaabirthdaysurprise)"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="url(#gbabirthdaysurprise)"/>
</g>
<rect width="200" height="150" fill="url(#snabirthdaysurprise)"/>
</svg>`,
  "a-letter-from-paris": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaaletterfromparis" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbaletterfromparis" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcaletterfromparis" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdaletterfromparis" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgaletterfromparis" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shaletterfromparis" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snaletterfromparis" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgaletterfromparis)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shaletterfromparis)">
<rect x="40" y="120" width="120" height="80" rx="6" fill="url(#gaaletterfromparis)"/>
<polygon points="40,120 100,165 160,120" fill="url(#gbaletterfromparis)"/>
<polygon points="90,60 110,60 118,100 82,100" fill="url(#gdaletterfromparis)"/>
<line x1="95" y1="70" x2="105" y2="70" stroke="#4A241C" stroke-width="3"/>
</g>
<rect width="200" height="150" fill="url(#snaletterfromparis)"/>
</svg>`,
  "a-new-friend": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaanewfriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbanewfriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcanewfriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdanewfriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bganewfriend" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shanewfriend" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snanewfriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bganewfriend)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shanewfriend)">
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="url(#gaanewfriend)"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="url(#gaanewfriend)"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="url(#gbanewfriend)"/>
</g>
<rect width="200" height="150" fill="url(#snanewfriend)"/>
</svg>`,
  "a-strange-discovery": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaastrangediscovery" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbastrangediscovery" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcastrangediscovery" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdastrangediscovery" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgastrangediscovery" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shastrangediscovery" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snastrangediscovery" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgastrangediscovery)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shastrangediscovery)">
<circle cx="75" cy="150" r="28" fill="url(#gaastrangediscovery)"/>
<circle cx="125" cy="150" r="28" fill="url(#gaastrangediscovery)"/>
<rect x="90" y="130" width="20" height="20" fill="url(#gaastrangediscovery)"/>
<circle cx="75" cy="150" r="14" fill="url(#gcastrangediscovery)"/>
<circle cx="125" cy="150" r="14" fill="url(#gcastrangediscovery)"/>
<rect x="65" y="115" width="10" height="18" rx="3" fill="url(#gbastrangediscovery)" transform="rotate(-20 70 124)"/>
<rect x="125" y="115" width="10" height="18" rx="3" fill="url(#gbastrangediscovery)" transform="rotate(20 130 124)"/>
</g>
<rect width="200" height="150" fill="url(#snastrangediscovery)"/>
</svg>`,
  "between-two-worlds": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gabetweentwoworlds" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbbetweentwoworlds" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcbetweentwoworlds" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdbetweentwoworlds" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgbetweentwoworlds" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shbetweentwoworlds" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snbetweentwoworlds" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgbetweentwoworlds)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shbetweentwoworlds)">
<rect x="0" y="0" width="100" height="280" fill="url(#gabetweentwoworlds)"/>
<rect x="100" y="0" width="100" height="280" fill="url(#gbbetweentwoworlds)"/>
<circle cx="55" cy="140" r="30" fill="url(#gcbetweentwoworlds)"/>
<circle cx="145" cy="140" r="30" fill="url(#gcbetweentwoworlds)"/>
</g>
<rect width="200" height="150" fill="url(#snbetweentwoworlds)"/>
</svg>`,
  "echoes-of-mars": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaechoesofmars" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbechoesofmars" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcechoesofmars" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdechoesofmars" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgechoesofmars" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shechoesofmars" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snechoesofmars" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgechoesofmars)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shechoesofmars)">
<circle cx="100" cy="90" r="40" fill="url(#gcechoesofmars)" opacity="0.4"/>
<path d="M100 60 Q120 100 110 160 L90 160 Q80 100 100 60Z" fill="url(#gaechoesofmars)"/>
<circle cx="100" cy="110" r="10" fill="url(#gcechoesofmars)"/>
<polygon points="90,160 75,190 90,180" fill="url(#gbechoesofmars)"/>
<polygon points="110,160 125,190 110,180" fill="url(#gbechoesofmars)"/>
<polygon points="92,180 100,205 108,180" fill="url(#gdechoesofmars)"/>
</g>
<rect width="200" height="150" fill="url(#snechoesofmars)"/>
</svg>`,
  "first-day": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gafirstday" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbfirstday" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcfirstday" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdfirstday" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgfirstday" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shfirstday" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snfirstday" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgfirstday)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shfirstday)">
<rect x="55" y="110" width="90" height="100" rx="14" fill="url(#gafirstday)"/>
<rect x="70" y="90" width="60" height="35" rx="16" fill="none" stroke="#4A3212" stroke-width="8"/>
<rect x="70" y="140" width="60" height="45" rx="6" fill="url(#gcfirstday)"/>
<circle cx="100" cy="162" r="5" fill="url(#gbfirstday)"/>
</g>
<rect width="200" height="150" fill="url(#snfirstday)"/>
</svg>`,
  "grandmothers-recipe": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gagrandmothersrecipe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbgrandmothersrecipe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcgrandmothersrecipe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdgrandmothersrecipe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bggrandmothersrecipe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shgrandmothersrecipe" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="sngrandmothersrecipe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bggrandmothersrecipe)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shgrandmothersrecipe)">
<rect x="65" y="150" width="70" height="60" rx="8" fill="url(#gagrandmothersrecipe)"/>
<rect x="70" y="155" width="60" height="30" fill="url(#gcgrandmothersrecipe)"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#sngrandmothersrecipe)"/>
</svg>`,
  "letters-from-the-lighthouse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="galettersfromthelighthouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gblettersfromthelighthouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gclettersfromthelighthouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdlettersfromthelighthouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bglettersfromthelighthouse" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shlettersfromthelighthouse" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snlettersfromthelighthouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bglettersfromthelighthouse)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shlettersfromthelighthouse)">
<polygon points="90,80 110,80 118,200 82,200" fill="url(#galettersfromthelighthouse)"/>
<rect x="85" y="65" width="30" height="18" fill="url(#gblettersfromthelighthouse)"/>
<circle cx="100" cy="60" r="14" fill="url(#gclettersfromthelighthouse)"/>
<rect x="60" y="200" width="80" height="14" fill="url(#gdlettersfromthelighthouse)"/>
</g>
<rect width="200" height="150" fill="url(#snlettersfromthelighthouse)"/>
</svg>`,
  "lost-in-the-city": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="galostinthecity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gblostinthecity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gclostinthecity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdlostinthecity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bglostinthecity" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shlostinthecity" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snlostinthecity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bglostinthecity)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shlostinthecity)">
<rect x="30" y="120" width="30" height="90" fill="url(#galostinthecity)"/>
<rect x="65" y="90" width="35" height="120" fill="url(#gblostinthecity)"/>
<rect x="105" y="130" width="30" height="80" fill="url(#galostinthecity)"/>
<rect x="140" y="100" width="30" height="110" fill="url(#gblostinthecity)"/>
<rect x="40" y="135" width="8" height="10" fill="url(#gclostinthecity)"/>
<rect x="75" y="105" width="8" height="10" fill="url(#gclostinthecity)"/>
<rect x="115" y="145" width="8" height="10" fill="url(#gclostinthecity)"/>
<rect x="150" y="115" width="8" height="10" fill="url(#gclostinthecity)"/>
</g>
<rect width="200" height="150" fill="url(#snlostinthecity)"/>
</svg>`,
  "the-blue-bicycle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathebluebicycle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthebluebicycle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthebluebicycle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthebluebicycle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthebluebicycle" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthebluebicycle" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthebluebicycle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthebluebicycle)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthebluebicycle)">
<circle cx="65" cy="185" r="32" fill="none" stroke="#6B8CAE" stroke-width="7"/>
<circle cx="135" cy="185" r="32" fill="none" stroke="#6B8CAE" stroke-width="7"/>
<circle cx="65" cy="185" r="5" fill="url(#gdthebluebicycle)"/>
<circle cx="135" cy="185" r="5" fill="url(#gdthebluebicycle)"/>
<path d="M65 185 L100 130 L135 185 M100 130 L85 130 L65 185 M100 130 L120 130" stroke="#33506B" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<rect width="200" height="150" fill="url(#snthebluebicycle)"/>
</svg>`,
  "the-broken-window": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathebrokenwindow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbthebrokenwindow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcthebrokenwindow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdthebrokenwindow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgthebrokenwindow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shthebrokenwindow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snthebrokenwindow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthebrokenwindow)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shthebrokenwindow)">
<rect x="45" y="80" width="110" height="120" rx="6" fill="url(#gathebrokenwindow)"/>
<rect x="55" y="90" width="90" height="100" fill="url(#gcthebrokenwindow)"/>
<line x1="100" y1="90" x2="100" y2="190" stroke="#9B87C4" stroke-width="4"/>
<line x1="55" y1="140" x2="145" y2="140" stroke="#9B87C4" stroke-width="4"/>
<line x1="75" y1="95" x2="60" y2="135" stroke="#2F2444" stroke-width="2"/>
<line x1="90" y1="95" x2="105" y2="135" stroke="#2F2444" stroke-width="2"/>
</g>
<rect width="200" height="150" fill="url(#snthebrokenwindow)"/>
</svg>`,
  "the-clock-tower": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheclocktower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbtheclocktower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gctheclocktower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdtheclocktower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgtheclocktower" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shtheclocktower" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="sntheclocktower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheclocktower)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shtheclocktower)">
<circle cx="100" cy="140" r="55" fill="url(#gatheclocktower)"/>
<circle cx="100" cy="140" r="45" fill="url(#gctheclocktower)"/>
<line x1="100" y1="140" x2="100" y2="105" stroke="#2F2444" stroke-width="5" stroke-linecap="round"/>
<line x1="100" y1="140" x2="125" y2="150" stroke="#2F2444" stroke-width="5" stroke-linecap="round"/>
<circle cx="100" cy="140" r="6" fill="url(#gbtheclocktower)"/>
</g>
<rect width="200" height="150" fill="url(#sntheclocktower)"/>
</svg>`,
  "the-coffee-bean-journey": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathecoffeebeanjourney" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbthecoffeebeanjourney" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcthecoffeebeanjourney" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdthecoffeebeanjourney" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgthecoffeebeanjourney" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shthecoffeebeanjourney" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snthecoffeebeanjourney" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthecoffeebeanjourney)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shthecoffeebeanjourney)">
<rect x="65" y="150" width="70" height="60" rx="8" fill="url(#gathecoffeebeanjourney)"/>
<rect x="70" y="155" width="60" height="30" fill="url(#gcthecoffeebeanjourney)"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snthecoffeebeanjourney)"/>
</svg>`,
  "the-empty-house": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheemptyhouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbtheemptyhouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gctheemptyhouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdtheemptyhouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgtheemptyhouse" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shtheemptyhouse" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="sntheemptyhouse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheemptyhouse)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shtheemptyhouse)">
<polygon points="100,55 165,105 35,105" fill="url(#gbtheemptyhouse)"/>
<rect x="50" y="105" width="100" height="100" fill="url(#gatheemptyhouse)"/>
<rect x="88" y="150" width="24" height="55" fill="url(#gdtheemptyhouse)"/>
<rect x="60" y="120" width="24" height="24" fill="url(#gctheemptyhouse)"/>
<rect x="116" y="120" width="24" height="24" fill="url(#gctheemptyhouse)"/>
</g>
<rect width="200" height="150" fill="url(#sntheemptyhouse)"/>
</svg>`,
  "the-inheritance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbtheinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gctheinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdtheinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bgtheinheritance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shtheinheritance" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="sntheinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheinheritance)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shtheinheritance)">
<rect x="60" y="70" width="80" height="130" rx="6" fill="url(#gatheinheritance)"/>
<circle cx="100" cy="140" r="8" fill="url(#gdtheinheritance)"/>
<circle cx="150" cy="150" r="16" fill="none" stroke="#7C2A14" stroke-width="8"/>
<rect x="164" y="146" width="26" height="8" fill="url(#gbtheinheritance)"/>
<rect x="182" y="146" width="6" height="14" fill="url(#gbtheinheritance)"/>
</g>
<rect width="200" height="150" fill="url(#sntheinheritance)"/>
</svg>`,
  "the-kind-stranger": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathekindstranger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthekindstranger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthekindstranger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthekindstranger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthekindstranger" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthekindstranger" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthekindstranger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthekindstranger)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthekindstranger)">
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="url(#gathekindstranger)"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="url(#gathekindstranger)"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="url(#gbthekindstranger)"/>
</g>
<rect width="200" height="150" fill="url(#snthekindstranger)"/>
</svg>`,
  "the-last-library": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelastlibrary" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthelastlibrary" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthelastlibrary" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthelastlibrary" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthelastlibrary" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthelastlibrary" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthelastlibrary" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelastlibrary)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthelastlibrary)">
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="url(#gathelastlibrary)"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="url(#gbthelastlibrary)"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F4F8F9" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F4F8F9" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F4F8F9" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F4F8F9" stroke-width="3"/>
</g>
<rect width="200" height="150" fill="url(#snthelastlibrary)"/>
</svg>`,
  "the-last-train-home": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelasttrainhome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbthelasttrainhome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcthelasttrainhome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdthelasttrainhome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgthelasttrainhome" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shthelasttrainhome" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snthelasttrainhome" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelasttrainhome)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shthelasttrainhome)">
<rect x="35" y="110" width="130" height="70" rx="14" fill="url(#gathelasttrainhome)"/>
<rect x="50" y="122" width="30" height="26" rx="4" fill="url(#gcthelasttrainhome)"/>
<rect x="90" y="122" width="30" height="26" rx="4" fill="url(#gcthelasttrainhome)"/>
<circle cx="60" cy="188" r="10" fill="url(#gdthelasttrainhome)"/>
<circle cx="140" cy="188" r="10" fill="url(#gdthelasttrainhome)"/>
<rect x="150" y="95" width="15" height="20" fill="url(#gbthelasttrainhome)"/>
</g>
<rect width="200" height="150" fill="url(#snthelasttrainhome)"/>
</svg>`,
  "the-little-bird": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelittlebird" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbthelittlebird" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcthelittlebird" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdthelittlebird" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgthelittlebird" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shthelittlebird" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snthelittlebird" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelittlebird)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shthelittlebird)">
<ellipse cx="100" cy="185" rx="45" ry="16" fill="url(#gbthelittlebird)"/>
<ellipse cx="90" cy="140" rx="28" ry="24" fill="url(#gathelittlebird)"/>
<circle cx="115" cy="130" r="14" fill="url(#gathelittlebird)"/>
<polygon points="128,130 145,133 128,138" fill="url(#gdthelittlebird)"/>
<circle cx="120" cy="126" r="3" fill="url(#gdthelittlebird)"/>
</g>
<rect width="200" height="150" fill="url(#snthelittlebird)"/>
</svg>`,
  "the-lost-dog": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelostdog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthelostdog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthelostdog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthelostdog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthelostdog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthelostdog" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthelostdog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelostdog)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthelostdog)">
<ellipse cx="100" cy="155" rx="42" ry="32" fill="url(#gathelostdog)"/>
<circle cx="70" cy="120" r="24" fill="url(#gathelostdog)"/>
<ellipse cx="55" cy="105" rx="10" ry="18" fill="url(#gbthelostdog)"/>
<ellipse cx="88" cy="105" rx="9" ry="16" fill="url(#gbthelostdog)"/>
<circle cx="63" cy="122" r="3" fill="url(#gdthelostdog)"/>
<circle cx="78" cy="122" r="3" fill="url(#gdthelostdog)"/>
<ellipse cx="70" cy="132" rx="5" ry="3" fill="url(#gdthelostdog)"/>
</g>
<rect width="200" height="150" fill="url(#snthelostdog)"/>
</svg>`,
  "the-marathon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathemarathon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbthemarathon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gcthemarathon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdthemarathon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgthemarathon" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shthemarathon" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snthemarathon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthemarathon)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shthemarathon)">
<circle cx="115" cy="90" r="14" fill="url(#gathemarathon)"/>
<path d="M110 105 L95 140 L70 160" stroke="#5E9C92" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M110 105 L130 130 L155 120" stroke="#5E9C92" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M95 140 L100 180 L80 205" stroke="#2E5D55" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M95 140 L120 175 L115 205" stroke="#2E5D55" stroke-width="10" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snthemarathon)"/>
</svg>`,
  "the-missing-key": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathemissingkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbthemissingkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcthemissingkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdthemissingkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgthemissingkey" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shthemissingkey" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snthemissingkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthemissingkey)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shthemissingkey)">
<rect x="65" y="130" width="70" height="60" rx="8" fill="url(#gathemissingkey)"/>
<path d="M78 130 L78 105 Q78 80 100 80 Q122 80 122 105 L122 130" stroke="#5B4685" stroke-width="10" fill="none"/>
<circle cx="100" cy="155" r="8" fill="url(#gdthemissingkey)"/>
<rect x="97" y="160" width="6" height="14" fill="url(#gdthemissingkey)"/>
</g>
<rect width="200" height="150" fill="url(#snthemissingkey)"/>
</svg>`,
  "the-musician": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathemusician" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbthemusician" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcthemusician" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdthemusician" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgthemusician" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shthemusician" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snthemusician" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthemusician)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shthemusician)">
<circle cx="70" cy="185" r="16" fill="url(#gathemusician)"/>
<circle cx="140" cy="175" r="16" fill="url(#gathemusician)"/>
<rect x="83" y="100" width="6" height="85" fill="url(#gdthemusician)"/>
<rect x="153" y="90" width="6" height="85" fill="url(#gdthemusician)"/>
<path d="M83 100 L159 90 L159 110 L83 120Z" fill="url(#gdthemusician)"/>
</g>
<rect width="200" height="150" fill="url(#snthemusician)"/>
</svg>`,
  "the-night-bus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathenightbus" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthenightbus" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthenightbus" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthenightbus" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthenightbus" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthenightbus" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthenightbus" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthenightbus)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthenightbus)">
<rect x="35" y="110" width="130" height="70" rx="14" fill="url(#gathenightbus)"/>
<rect x="50" y="122" width="30" height="26" rx="4" fill="url(#gcthenightbus)"/>
<rect x="90" y="122" width="30" height="26" rx="4" fill="url(#gcthenightbus)"/>
<circle cx="60" cy="188" r="10" fill="url(#gdthenightbus)"/>
<circle cx="140" cy="188" r="10" fill="url(#gdthenightbus)"/>
<rect x="150" y="95" width="15" height="20" fill="url(#gbthenightbus)"/>
</g>
<rect width="200" height="150" fill="url(#snthenightbus)"/>
</svg>`,
  "the-old-photograph": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheoldphotograph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbtheoldphotograph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gctheoldphotograph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdtheoldphotograph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bgtheoldphotograph" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shtheoldphotograph" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="sntheoldphotograph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheoldphotograph)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shtheoldphotograph)">
<rect x="45" y="60" width="110" height="140" rx="4" fill="url(#gatheoldphotograph)" transform="rotate(-4 100 130)"/>
<rect x="55" y="70" width="90" height="90" fill="url(#gctheoldphotograph)" transform="rotate(-4 100 115)"/>
<circle cx="90" cy="105" r="20" fill="url(#gbtheoldphotograph)" transform="rotate(-4 100 115)"/>
</g>
<rect width="200" height="150" fill="url(#sntheoldphotograph)"/>
</svg>`,
  "the-painter-upstairs": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathepainterupstairs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthepainterupstairs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthepainterupstairs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthepainterupstairs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthepainterupstairs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthepainterupstairs" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthepainterupstairs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthepainterupstairs)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthepainterupstairs)">
<rect x="65" y="80" width="70" height="90" fill="url(#gcthepainterupstairs)"/>
<rect x="55" y="75" width="90" height="10" fill="url(#gathepainterupstairs)"/>
<line x1="70" y1="170" x2="55" y2="210" stroke="#8B5E22" stroke-width="7"/>
<line x1="130" y1="170" x2="145" y2="210" stroke="#8B5E22" stroke-width="7"/>
<line x1="100" y1="170" x2="100" y2="200" stroke="#8B5E22" stroke-width="7"/>
<circle cx="95" cy="115" r="14" fill="url(#gathepainterupstairs)"/>
<path d="M75 150 Q100 130 125 150" stroke="#8B5E22" stroke-width="4" fill="none"/>
</g>
<rect width="200" height="150" fill="url(#snthepainterupstairs)"/>
</svg>`,
  "the-rainy-afternoon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatherainyafternoon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbtherainyafternoon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gctherainyafternoon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdtherainyafternoon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgtherainyafternoon" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shtherainyafternoon" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="sntherainyafternoon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtherainyafternoon)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shtherainyafternoon)">
<path d="M40 135 Q100 55 160 135 Q130 115 100 122 Q70 115 40 135Z" fill="url(#gatherainyafternoon)"/>
<rect x="97" y="130" width="6" height="75" rx="3" fill="url(#gdtherainyafternoon)"/>
<path d="M97 203 q-2 14 14 12" stroke="#1D2E3D" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="220" r="10" fill="url(#gbtherainyafternoon)"/>
<circle cx="60" cy="225" r="5" fill="url(#gbtherainyafternoon)"/>
<circle cx="140" cy="222" r="6" fill="url(#gbtherainyafternoon)"/>
</g>
<rect width="200" height="150" fill="url(#sntherainyafternoon)"/>
</svg>`,
  "the-rivers-edge": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheriversedge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbtheriversedge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gctheriversedge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdtheriversedge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgtheriversedge" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shtheriversedge" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="sntheriversedge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheriversedge)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shtheriversedge)">
<path d="M0 160 Q60 140 100 165 Q140 190 200 160 L200 280 L0 280Z" fill="url(#gatheriversedge)"/>
<path d="M0 190 Q60 175 100 195 Q140 215 200 190 L200 280 L0 280Z" fill="url(#gbtheriversedge)" opacity="0.7"/>
<ellipse cx="60" cy="130" rx="18" ry="26" fill="url(#gctheriversedge)"/>
<ellipse cx="140" cy="125" rx="20" ry="30" fill="url(#gctheriversedge)"/>
</g>
<rect width="200" height="150" fill="url(#sntheriversedge)"/>
</svg>`,
  "why-we-dream": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gawhywedream" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbwhywedream" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcwhywedream" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdwhywedream" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgwhywedream" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shwhywedream" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snwhywedream" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgwhywedream)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shwhywedream)">
<path d="M130 70 A45 45 0 1 0 150 155 A35 35 0 1 1 130 70Z" fill="url(#gawhywedream)"/>
<circle cx="55" cy="190" r="6" fill="url(#gcwhywedream)"/>
<circle cx="75" cy="210" r="4" fill="url(#gcwhywedream)"/>
<circle cx="45" cy="215" r="3" fill="url(#gcwhywedream)"/>
</g>
<rect width="200" height="150" fill="url(#snwhywedream)"/>
</svg>`,
  "the-red-umbrella": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheredumbrella" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbtheredumbrella" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gctheredumbrella" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdtheredumbrella" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bgtheredumbrella" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shtheredumbrella" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="sntheredumbrella" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheredumbrella)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shtheredumbrella)">
<path d="M40 135 Q100 55 160 135 Q130 115 100 122 Q70 115 40 135Z" fill="url(#gatheredumbrella)"/>
<rect x="97" y="130" width="6" height="75" rx="3" fill="url(#gdtheredumbrella)"/>
<path d="M97 203 q-2 14 14 12" stroke="#3D1F12" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="220" r="10" fill="url(#gbtheredumbrella)"/>
<circle cx="60" cy="225" r="5" fill="url(#gbtheredumbrella)"/>
<circle cx="140" cy="222" r="6" fill="url(#gbtheredumbrella)"/>
</g>
<rect width="200" height="150" fill="url(#sntheredumbrella)"/>
</svg>`,
  "my-morning-coffee": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gamymorningcoffee" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbmymorningcoffee" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcmymorningcoffee" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdmymorningcoffee" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgmymorningcoffee" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shmymorningcoffee" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snmymorningcoffee" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgmymorningcoffee)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shmymorningcoffee)">
<rect x="65" y="150" width="70" height="60" rx="8" fill="url(#gamymorningcoffee)"/>
<rect x="70" y="155" width="60" height="30" fill="url(#gcmymorningcoffee)"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#E0A83E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snmymorningcoffee)"/>
</svg>`,
  "a-walk-in-the-park": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaawalkinthepark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbawalkinthepark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcawalkinthepark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdawalkinthepark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgawalkinthepark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shawalkinthepark" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snawalkinthepark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgawalkinthepark)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shawalkinthepark)">
<circle cx="90" cy="110" r="45" fill="url(#gaawalkinthepark)"/>
<circle cx="130" cy="130" r="32" fill="url(#gbawalkinthepark)"/>
<rect x="83" y="150" width="14" height="55" fill="url(#gdawalkinthepark)"/>
<rect x="40" y="205" width="120" height="10" rx="3" fill="url(#gbawalkinthepark)"/>
<rect x="50" y="215" width="10" height="20" fill="url(#gdawalkinthepark)"/>
<rect x="140" y="215" width="10" height="20" fill="url(#gdawalkinthepark)"/>
</g>
<rect width="200" height="150" fill="url(#snawalkinthepark)"/>
</svg>`,
  "the-new-neighbor": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathenewneighbor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbthenewneighbor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcthenewneighbor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdthenewneighbor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgthenewneighbor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shthenewneighbor" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snthenewneighbor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthenewneighbor)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shthenewneighbor)">
<polygon points="100,55 165,105 35,105" fill="url(#gbthenewneighbor)"/>
<rect x="50" y="105" width="100" height="100" fill="url(#gathenewneighbor)"/>
<rect x="88" y="150" width="24" height="55" fill="url(#gdthenewneighbor)"/>
<rect x="60" y="120" width="24" height="24" fill="url(#gcthenewneighbor)"/>
<rect x="116" y="120" width="24" height="24" fill="url(#gcthenewneighbor)"/>
</g>
<rect width="200" height="150" fill="url(#snthenewneighbor)"/>
</svg>`,
  "my-favorite-food": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gamyfavoritefood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbmyfavoritefood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcmyfavoritefood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdmyfavoritefood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgmyfavoritefood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shmyfavoritefood" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snmyfavoritefood" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgmyfavoritefood)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shmyfavoritefood)">
<rect x="65" y="150" width="70" height="60" rx="8" fill="url(#gamyfavoritefood)"/>
<rect x="70" y="155" width="60" height="30" fill="url(#gcmyfavoritefood)"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snmyfavoritefood)"/>
</svg>`,
  "the-old-radio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheoldradio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbtheoldradio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gctheoldradio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdtheoldradio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgtheoldradio" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shtheoldradio" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="sntheoldradio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheoldradio)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shtheoldradio)">
<rect x="45" y="120" width="110" height="75" rx="10" fill="url(#gatheoldradio)"/>
<circle cx="80" cy="157" r="20" fill="url(#gctheoldradio)"/>
<circle cx="80" cy="157" r="10" fill="url(#gdtheoldradio)"/>
<rect x="115" y="140" width="28" height="10" rx="3" fill="url(#gctheoldradio)"/>
<circle cx="120" cy="170" r="6" fill="url(#gbtheoldradio)"/>
<circle cx="138" cy="170" r="6" fill="url(#gbtheoldradio)"/>
<path d="M60 120 L75 85 M140 120 L125 85" stroke="#33200F" stroke-width="5" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#sntheoldradio)"/>
</svg>`,
  "a-day-at-the-market": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaadayatthemarket" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbadayatthemarket" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcadayatthemarket" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdadayatthemarket" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgadayatthemarket" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shadayatthemarket" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snadayatthemarket" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgadayatthemarket)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shadayatthemarket)">
<path d="M45 110 L155 110 L145 90 L55 90Z" fill="url(#gbadayatthemarket)"/>
<rect x="50" y="110" width="100" height="80" fill="url(#gcadayatthemarket)"/>
<circle cx="80" cy="150" r="16" fill="url(#gaadayatthemarket)"/>
<circle cx="110" cy="155" r="14" fill="url(#gbadayatthemarket)"/>
<circle cx="95" cy="170" r="12" fill="url(#gaadayatthemarket)"/>
<line x1="45" y1="110" x2="45" y2="190" stroke="#4A3212" stroke-width="6"/>
<line x1="155" y1="110" x2="155" y2="190" stroke="#4A3212" stroke-width="6"/>
</g>
<rect width="200" height="150" fill="url(#snadayatthemarket)"/>
</svg>`,
  "the-little-cat": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelittlecat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthelittlecat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthelittlecat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthelittlecat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthelittlecat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthelittlecat" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthelittlecat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelittlecat)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthelittlecat)">
<ellipse cx="100" cy="175" rx="45" ry="35" fill="url(#gathelittlecat)"/>
<circle cx="100" cy="120" r="35" fill="url(#gathelittlecat)"/>
<polygon points="72,95 80,125 60,115" fill="url(#gathelittlecat)"/>
<polygon points="128,95 120,125 140,115" fill="url(#gathelittlecat)"/>
<circle cx="88" cy="118" r="5" fill="url(#gdthelittlecat)"/>
<circle cx="112" cy="118" r="5" fill="url(#gdthelittlecat)"/>
<ellipse cx="100" cy="130" rx="5" ry="3" fill="url(#gbthelittlecat)"/>
</g>
<rect width="200" height="150" fill="url(#snthelittlecat)"/>
</svg>`,
  "my-school-bag": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gamyschoolbag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbmyschoolbag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcmyschoolbag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdmyschoolbag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgmyschoolbag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shmyschoolbag" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snmyschoolbag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgmyschoolbag)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shmyschoolbag)">
<rect x="55" y="110" width="90" height="100" rx="14" fill="url(#gamyschoolbag)"/>
<rect x="70" y="90" width="60" height="35" rx="16" fill="none" stroke="#2F2444" stroke-width="8"/>
<rect x="70" y="140" width="60" height="45" rx="6" fill="url(#gcmyschoolbag)"/>
<circle cx="100" cy="162" r="5" fill="url(#gbmyschoolbag)"/>
</g>
<rect width="200" height="150" fill="url(#snmyschoolbag)"/>
</svg>`,
  "the-quiet-morning": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathequietmorning" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbthequietmorning" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcthequietmorning" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdthequietmorning" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgthequietmorning" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shthequietmorning" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snthequietmorning" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthequietmorning)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shthequietmorning)">
<path d="M130 70 A45 45 0 1 0 150 155 A35 35 0 1 1 130 70Z" fill="url(#gathequietmorning)"/>
<circle cx="55" cy="190" r="6" fill="url(#gcthequietmorning)"/>
<circle cx="75" cy="210" r="4" fill="url(#gcthequietmorning)"/>
<circle cx="45" cy="215" r="3" fill="url(#gcthequietmorning)"/>
</g>
<rect width="200" height="150" fill="url(#snthequietmorning)"/>
</svg>`,
  "the-summer-job": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathesummerjob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbthesummerjob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gcthesummerjob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdthesummerjob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgthesummerjob" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shthesummerjob" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snthesummerjob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthesummerjob)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shthesummerjob)">
<rect x="45" y="120" width="110" height="75" rx="8" fill="url(#gathesummerjob)"/>
<rect x="80" y="100" width="40" height="22" rx="6" fill="none" stroke="#173330" stroke-width="7"/>
<rect x="45" y="150" width="110" height="12" fill="url(#gbthesummerjob)"/>
<rect x="92" y="150" width="16" height="16" rx="3" fill="url(#gcthesummerjob)"/>
</g>
<rect width="200" height="150" fill="url(#snthesummerjob)"/>
</svg>`,
  "a-letter-to-mom": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaalettertomom" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbalettertomom" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcalettertomom" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdalettertomom" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgalettertomom" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shalettertomom" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snalettertomom" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgalettertomom)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shalettertomom)">
<rect x="40" y="105" width="120" height="85" rx="6" fill="url(#gaalettertomom)"/>
<polygon points="40,105 100,155 160,105" fill="url(#gbalettertomom)"/>
<polygon points="40,190 85,145 40,145" fill="url(#gbalettertomom)" opacity="0.5"/>
<polygon points="160,190 115,145 160,145" fill="url(#gbalettertomom)" opacity="0.5"/>
</g>
<rect width="200" height="150" fill="url(#snalettertomom)"/>
</svg>`,
  "the-broken-phone": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathebrokenphone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthebrokenphone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthebrokenphone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthebrokenphone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthebrokenphone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthebrokenphone" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthebrokenphone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthebrokenphone)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthebrokenphone)">
<rect x="70" y="60" width="60" height="150" rx="12" fill="url(#gathebrokenphone)"/>
<rect x="78" y="75" width="44" height="105" fill="url(#gcthebrokenphone)"/>
<line x1="88" y1="90" x2="90" y2="160" stroke="#33506B" stroke-width="3" opacity="0.7"/>
<line x1="105" y1="80" x2="98" y2="170" stroke="#33506B" stroke-width="4" opacity="0.9"/>
<circle cx="100" cy="192" r="6" fill="url(#gdthebrokenphone)"/>
</g>
<rect width="200" height="150" fill="url(#snthebrokenphone)"/>
</svg>`,
  "moving-to-a-new-city": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gamovingtoanewcity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbmovingtoanewcity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcmovingtoanewcity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdmovingtoanewcity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgmovingtoanewcity" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shmovingtoanewcity" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snmovingtoanewcity" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgmovingtoanewcity)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shmovingtoanewcity)">
<polygon points="100,55 165,105 35,105" fill="url(#gbmovingtoanewcity)"/>
<rect x="50" y="105" width="100" height="100" fill="url(#gamovingtoanewcity)"/>
<rect x="88" y="150" width="24" height="55" fill="url(#gdmovingtoanewcity)"/>
<rect x="60" y="120" width="24" height="24" fill="url(#gcmovingtoanewcity)"/>
<rect x="116" y="120" width="24" height="24" fill="url(#gcmovingtoanewcity)"/>
</g>
<rect width="200" height="150" fill="url(#snmovingtoanewcity)"/>
</svg>`,
  "the-cooking-class": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathecookingclass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbthecookingclass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gcthecookingclass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdthecookingclass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bgthecookingclass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shthecookingclass" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="snthecookingclass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthecookingclass)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shthecookingclass)">
<rect x="65" y="150" width="70" height="60" rx="8" fill="url(#gathecookingclass)"/>
<rect x="70" y="155" width="60" height="30" fill="url(#gcthecookingclass)"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#C2552F" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snthecookingclass)"/>
</svg>`,
  "a-weekend-trip": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaaweekendtrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbaweekendtrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gcaweekendtrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdaweekendtrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgaweekendtrip" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shaweekendtrip" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snaweekendtrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgaweekendtrip)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shaweekendtrip)">
<polygon points="30,200 90,100 130,150 160,110 190,200" fill="url(#gaaweekendtrip)"/>
<polygon points="90,100 110,135 70,135" fill="url(#gcaweekendtrip)"/>
<polygon points="160,110 175,135 145,135" fill="url(#gcaweekendtrip)"/>
<circle cx="150" cy="70" r="18" fill="url(#gbaweekendtrip)"/>
</g>
<rect width="200" height="150" fill="url(#snaweekendtrip)"/>
</svg>`,
  "the-lost-wallet": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelostwallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthelostwallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthelostwallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthelostwallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthelostwallet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthelostwallet" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthelostwallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelostwallet)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthelostwallet)">
<rect x="45" y="120" width="110" height="80" rx="10" fill="url(#gathelostwallet)"/>
<rect x="45" y="120" width="110" height="30" rx="10" fill="url(#gbthelostwallet)"/>
<circle cx="140" cy="160" r="10" fill="url(#gdthelostwallet)"/>
<rect x="55" y="160" width="40" height="6" rx="3" fill="url(#gcthelostwallet)"/>
</g>
<rect width="200" height="150" fill="url(#snthelostwallet)"/>
</svg>`,
  "learning-to-swim": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="galearningtoswim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gblearningtoswim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gclearningtoswim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdlearningtoswim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bglearningtoswim" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shlearningtoswim" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snlearningtoswim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bglearningtoswim)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shlearningtoswim)">
<path d="M20 180 Q40 165 60 180 Q80 195 100 180 Q120 165 140 180 Q160 195 180 180" stroke="#6B8CAE" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M20 205 Q40 190 60 205 Q80 220 100 205 Q120 190 140 205 Q160 220 180 205" stroke="#33506B" stroke-width="8" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="90" r="30" fill="url(#gclearningtoswim)"/>
</g>
<rect width="200" height="150" fill="url(#snlearningtoswim)"/>
</svg>`,
  "the-new-teacher": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathenewteacher" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbthenewteacher" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcthenewteacher" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdthenewteacher" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgthenewteacher" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shthenewteacher" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snthenewteacher" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthenewteacher)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shthenewteacher)">
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="url(#gathenewteacher)"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="url(#gbthenewteacher)"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F6F2FB" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F6F2FB" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F6F2FB" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F6F2FB" stroke-width="3"/>
</g>
<rect width="200" height="150" fill="url(#snthenewteacher)"/>
</svg>`,
  "a-surprise-visit": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaasurprisevisit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbasurprisevisit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcasurprisevisit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdasurprisevisit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgasurprisevisit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shasurprisevisit" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snasurprisevisit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgasurprisevisit)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shasurprisevisit)">
<rect x="50" y="110" width="100" height="80" rx="10" fill="url(#gaasurprisevisit)"/>
<rect x="82" y="90" width="36" height="24" rx="8" fill="none" stroke="#4A241C" stroke-width="7"/>
<rect x="50" y="140" width="100" height="10" fill="url(#gbasurprisevisit)"/>
<circle cx="100" cy="150" r="6" fill="url(#gcasurprisevisit)"/>
</g>
<rect width="200" height="150" fill="url(#snasurprisevisit)"/>
</svg>`,
  "the-job-interview": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathejobinterview" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthejobinterview" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthejobinterview" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthejobinterview" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthejobinterview" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthejobinterview" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthejobinterview" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthejobinterview)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthejobinterview)">
<rect x="45" y="120" width="110" height="75" rx="8" fill="url(#gathejobinterview)"/>
<rect x="80" y="100" width="40" height="22" rx="6" fill="none" stroke="#1D2E3D" stroke-width="7"/>
<rect x="45" y="150" width="110" height="12" fill="url(#gbthejobinterview)"/>
<rect x="92" y="150" width="16" height="16" rx="3" fill="url(#gcthejobinterview)"/>
</g>
<rect width="200" height="150" fill="url(#snthejobinterview)"/>
</svg>`,
  "a-difficult-decision": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaadifficultdecision" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbadifficultdecision" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcadifficultdecision" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdadifficultdecision" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgadifficultdecision" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shadifficultdecision" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snadifficultdecision" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgadifficultdecision)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shadifficultdecision)">
<rect x="97" y="70" width="6" height="120" fill="url(#gdadifficultdecision)"/>
<line x1="50" y1="100" x2="150" y2="100" stroke="#2E3B26" stroke-width="5"/>
<path d="M35 100 Q50 135 65 100Z" fill="url(#gaadifficultdecision)"/>
<path d="M135 100 Q150 135 165 100Z" fill="url(#gbadifficultdecision)"/>
<rect x="75" y="190" width="50" height="12" rx="4" fill="url(#gdadifficultdecision)"/>
</g>
<rect width="200" height="150" fill="url(#snadifficultdecision)"/>
</svg>`,
  "the-family-reunion": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathefamilyreunion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbthefamilyreunion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gcthefamilyreunion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdthefamilyreunion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bgthefamilyreunion" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shthefamilyreunion" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="snthefamilyreunion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthefamilyreunion)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shthefamilyreunion)">
<circle cx="75" cy="120" r="22" fill="url(#gathefamilyreunion)"/>
<rect x="55" y="142" width="40" height="55" rx="14" fill="url(#gathefamilyreunion)"/>
<circle cx="130" cy="115" r="26" fill="url(#gbthefamilyreunion)"/>
<rect x="106" y="141" width="48" height="60" rx="16" fill="url(#gbthefamilyreunion)"/>
<circle cx="100" cy="160" r="14" fill="url(#gdthefamilyreunion)"/>
<rect x="88" y="174" width="24" height="30" rx="10" fill="url(#gdthefamilyreunion)"/>
</g>
<rect width="200" height="150" fill="url(#snthefamilyreunion)"/>
</svg>`,
  "starting-a-business": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gastartingabusiness" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbstartingabusiness" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcstartingabusiness" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdstartingabusiness" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgstartingabusiness" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shstartingabusiness" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snstartingabusiness" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgstartingabusiness)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shstartingabusiness)">
<rect x="50" y="130" width="100" height="65" rx="8" fill="url(#gastartingabusiness)"/>
<polygon points="70,130 130,130 150,90 50,90" fill="url(#gbstartingabusiness)"/>
<circle cx="100" cy="110" r="12" fill="url(#gcstartingabusiness)"/>
<rect x="93" y="103" width="14" height="14" fill="url(#gdstartingabusiness)"/>
</g>
<rect width="200" height="150" fill="url(#snstartingabusiness)"/>
</svg>`,
  "the-hiking-accident": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathehikingaccident" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbthehikingaccident" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcthehikingaccident" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdthehikingaccident" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgthehikingaccident" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shthehikingaccident" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snthehikingaccident" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthehikingaccident)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shthehikingaccident)">
<polygon points="30,200 90,100 130,150 160,110 190,200" fill="url(#gathehikingaccident)"/>
<polygon points="90,100 110,135 70,135" fill="url(#gcthehikingaccident)"/>
<polygon points="160,110 175,135 145,135" fill="url(#gcthehikingaccident)"/>
<circle cx="150" cy="70" r="18" fill="url(#gbthehikingaccident)"/>
</g>
<rect width="200" height="150" fill="url(#snthehikingaccident)"/>
</svg>`,
  "a-misunderstanding": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaamisunderstanding" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbamisunderstanding" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcamisunderstanding" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdamisunderstanding" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgamisunderstanding" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shamisunderstanding" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snamisunderstanding" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgamisunderstanding)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shamisunderstanding)">
<rect x="40" y="90" width="120" height="80" rx="16" fill="url(#gaamisunderstanding)"/>
<polygon points="70,170 90,170 65,200" fill="url(#gaamisunderstanding)"/>
<circle cx="75" cy="130" r="7" fill="url(#gcamisunderstanding)"/>
<circle cx="100" cy="130" r="7" fill="url(#gcamisunderstanding)"/>
<circle cx="125" cy="130" r="7" fill="url(#gcamisunderstanding)"/>
</g>
<rect width="200" height="150" fill="url(#snamisunderstanding)"/>
</svg>`,
  "the-online-friend": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheonlinefriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbtheonlinefriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gctheonlinefriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdtheonlinefriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgtheonlinefriend" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shtheonlinefriend" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="sntheonlinefriend" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheonlinefriend)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shtheonlinefriend)">
<rect x="70" y="60" width="60" height="150" rx="12" fill="url(#gatheonlinefriend)"/>
<rect x="78" y="75" width="44" height="105" fill="url(#gctheonlinefriend)"/>
<line x1="88" y1="90" x2="90" y2="160" stroke="#5B4685" stroke-width="3" opacity="0.7"/>
<line x1="105" y1="80" x2="98" y2="170" stroke="#5B4685" stroke-width="4" opacity="0.9"/>
<circle cx="100" cy="192" r="6" fill="url(#gdtheonlinefriend)"/>
</g>
<rect width="200" height="150" fill="url(#sntheonlinefriend)"/>
</svg>`,
  "changing-careers": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gachangingcareers" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbchangingcareers" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gcchangingcareers" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdchangingcareers" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgchangingcareers" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shchangingcareers" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snchangingcareers" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgchangingcareers)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shchangingcareers)">
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="url(#gachangingcareers)"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="url(#gbchangingcareers)"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F0F7F5" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F0F7F5" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F0F7F5" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F0F7F5" stroke-width="3"/>
</g>
<rect width="200" height="150" fill="url(#snchangingcareers)"/>
</svg>`,
  "the-neighborhood-garden": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheneighborhoodgarden" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbtheneighborhoodgarden" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gctheneighborhoodgarden" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdtheneighborhoodgarden" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgtheneighborhoodgarden" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shtheneighborhoodgarden" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="sntheneighborhoodgarden" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheneighborhoodgarden)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shtheneighborhoodgarden)">
<path d="M60 150 L60 200 L140 200 L140 150 Z" fill="url(#gatheneighborhoodgarden)"/>
<ellipse cx="80" cy="130" rx="16" ry="24" fill="url(#gbtheneighborhoodgarden)"/>
<ellipse cx="110" cy="120" rx="18" ry="28" fill="url(#gbtheneighborhoodgarden)"/>
<ellipse cx="130" cy="140" rx="14" ry="20" fill="url(#gbtheneighborhoodgarden)"/>
<rect x="80" y="150" width="6" height="30" fill="url(#gdtheneighborhoodgarden)"/>
<rect x="110" y="150" width="6" height="35" fill="url(#gdtheneighborhoodgarden)"/>
</g>
<rect width="200" height="150" fill="url(#sntheneighborhoodgarden)"/>
</svg>`,
  "a-second-chance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaasecondchance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbasecondchance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcasecondchance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdasecondchance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgasecondchance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shasecondchance" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snasecondchance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgasecondchance)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shasecondchance)">
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="url(#gaasecondchance)"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="url(#gaasecondchance)"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="url(#gbasecondchance)"/>
</g>
<rect width="200" height="150" fill="url(#snasecondchance)"/>
</svg>`,
  "the-whistleblower": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathewhistleblower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthewhistleblower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthewhistleblower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthewhistleblower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthewhistleblower" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthewhistleblower" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthewhistleblower" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthewhistleblower)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthewhistleblower)">
<rect x="40" y="90" width="120" height="80" rx="16" fill="url(#gathewhistleblower)"/>
<polygon points="70,170 90,170 65,200" fill="url(#gathewhistleblower)"/>
<circle cx="75" cy="130" r="7" fill="url(#gcthewhistleblower)"/>
<circle cx="100" cy="130" r="7" fill="url(#gcthewhistleblower)"/>
<circle cx="125" cy="130" r="7" fill="url(#gcthewhistleblower)"/>
</g>
<rect width="200" height="150" fill="url(#snthewhistleblower)"/>
</svg>`,
  "a-question-of-trust": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaaquestionoftrust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbaquestionoftrust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcaquestionoftrust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdaquestionoftrust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgaquestionoftrust" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shaquestionoftrust" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snaquestionoftrust" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgaquestionoftrust)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shaquestionoftrust)">
<ellipse cx="75" cy="130" rx="35" ry="45" fill="url(#gaaquestionoftrust)"/>
<ellipse cx="125" cy="130" rx="35" ry="45" fill="url(#gbaquestionoftrust)"/>
<rect x="94" y="90" width="12" height="80" fill="#ECE7F5"/>
</g>
<rect width="200" height="150" fill="url(#snaquestionoftrust)"/>
</svg>`,
  "the-art-forger": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheartforger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbtheartforger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gctheartforger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdtheartforger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgtheartforger" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shtheartforger" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="sntheartforger" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheartforger)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shtheartforger)">
<ellipse cx="100" cy="140" rx="60" ry="45" fill="url(#gatheartforger)"/>
<ellipse cx="115" cy="150" rx="18" ry="14" fill="#F3E3D3"/>
<circle cx="70" cy="120" r="8" fill="url(#gbtheartforger)"/>
<circle cx="95" cy="105" r="8" fill="url(#gctheartforger)"/>
<circle cx="125" cy="110" r="8" fill="url(#gdtheartforger)"/>
<circle cx="60" cy="150" r="8" fill="url(#gdtheartforger)"/>
<rect x="120" y="80" width="6" height="50" fill="url(#gdtheartforger)" transform="rotate(30 123 105)"/>
</g>
<rect width="200" height="150" fill="url(#sntheartforger)"/>
</svg>`,
  "negotiating-peace": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="ganegotiatingpeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbnegotiatingpeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcnegotiatingpeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdnegotiatingpeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgnegotiatingpeace" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shnegotiatingpeace" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snnegotiatingpeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgnegotiatingpeace)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shnegotiatingpeace)">
<ellipse cx="100" cy="140" rx="40" ry="26" fill="url(#ganegotiatingpeace)"/>
<circle cx="140" cy="120" r="14" fill="url(#ganegotiatingpeace)"/>
<polygon points="152,118 168,122 152,126" fill="url(#gbnegotiatingpeace)"/>
<path d="M70 150 Q40 160 20 145" stroke="#4F6B44" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M100 165 Q80 190 55 190" stroke="#F7F5E8" stroke-width="6" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snnegotiatingpeace)"/>
</svg>`,
  "the-refugee-story": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatherefugeestory" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbtherefugeestory" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gctherefugeestory" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdtherefugeestory" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgtherefugeestory" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shtherefugeestory" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="sntherefugeestory" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtherefugeestory)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shtherefugeestory)">
<rect x="40" y="80" width="120" height="120" fill="url(#gctherefugeestory)"/>
<path d="M40 80 L100 100 L160 80 L160 200 L100 180 L40 200Z" fill="url(#gatherefugeestory)"/>
<circle cx="100" cy="140" r="10" fill="url(#gbtherefugeestory)"/>
<path d="M100 140 L100 120" stroke="#2E5D55" stroke-width="3"/>
<circle cx="70" cy="110" r="4" fill="url(#gdtherefugeestory)"/>
<circle cx="130" cy="160" r="4" fill="url(#gdtherefugeestory)"/>
</g>
<rect width="200" height="150" fill="url(#sntherefugeestory)"/>
</svg>`,
  "an-unexpected-inheritance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaanunexpectedinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbanunexpectedinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcanunexpectedinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdanunexpectedinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bganunexpectedinheritance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shanunexpectedinheritance" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snanunexpectedinheritance" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bganunexpectedinheritance)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shanunexpectedinheritance)">
<rect x="60" y="70" width="80" height="130" rx="6" fill="url(#gaanunexpectedinheritance)"/>
<circle cx="100" cy="140" r="8" fill="url(#gdanunexpectedinheritance)"/>
<circle cx="150" cy="150" r="16" fill="none" stroke="#8B5E22" stroke-width="8"/>
<rect x="164" y="146" width="26" height="8" fill="url(#gbanunexpectedinheritance)"/>
<rect x="182" y="146" width="6" height="14" fill="url(#gbanunexpectedinheritance)"/>
</g>
<rect width="200" height="150" fill="url(#snanunexpectedinheritance)"/>
</svg>`,
  "the-climate-scientist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheclimatescientist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbtheclimatescientist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gctheclimatescientist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdtheclimatescientist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgtheclimatescientist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shtheclimatescientist" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="sntheclimatescientist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheclimatescientist)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shtheclimatescientist)">
<ellipse cx="90" cy="110" rx="45" ry="28" fill="url(#gctheclimatescientist)"/>
<ellipse cx="130" cy="120" rx="35" ry="22" fill="url(#gctheclimatescientist)"/>
<rect x="95" y="130" width="10" height="60" rx="5" fill="url(#gatheclimatescientist)"/>
<circle cx="100" cy="195" r="16" fill="url(#gatheclimatescientist)"/>
<rect x="97" y="140" width="6" height="40" fill="url(#gbtheclimatescientist)"/>
</g>
<rect width="200" height="150" fill="url(#sntheclimatescientist)"/>
</svg>`,
  "a-city-divided": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaacitydivided" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbacitydivided" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcacitydivided" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdacitydivided" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgacitydivided" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shacitydivided" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snacitydivided" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgacitydivided)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shacitydivided)">
<rect x="30" y="120" width="30" height="90" fill="url(#gaacitydivided)"/>
<rect x="65" y="90" width="35" height="120" fill="url(#gbacitydivided)"/>
<rect x="105" y="130" width="30" height="80" fill="url(#gaacitydivided)"/>
<rect x="140" y="100" width="30" height="110" fill="url(#gbacitydivided)"/>
<rect x="40" y="135" width="8" height="10" fill="url(#gcacitydivided)"/>
<rect x="75" y="105" width="8" height="10" fill="url(#gcacitydivided)"/>
<rect x="115" y="145" width="8" height="10" fill="url(#gcacitydivided)"/>
<rect x="150" y="115" width="8" height="10" fill="url(#gcacitydivided)"/>
</g>
<rect width="200" height="150" fill="url(#snacitydivided)"/>
</svg>`,
  "the-memory-thief": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathememorythief" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbthememorythief" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gcthememorythief" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdthememorythief" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgthememorythief" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shthememorythief" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="snthememorythief" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthememorythief)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shthememorythief)">
<path d="M70 100 Q50 100 50 130 Q40 140 55 155 Q50 175 75 180 Q90 195 110 180 Q135 175 130 155 Q145 140 135 130 Q135 100 110 100 Q100 90 85 95 Q80 90 70 100Z" fill="url(#gathememorythief)"/>
<path d="M100 100 L100 180" stroke="#ECE7F5" stroke-width="4"/>
<circle cx="80" cy="130" r="4" fill="url(#gdthememorythief)"/>
<circle cx="120" cy="140" r="4" fill="url(#gdthememorythief)"/>
</g>
<rect width="200" height="150" fill="url(#snthememorythief)"/>
</svg>`,
  "breaking-the-silence": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gabreakingthesilence" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gbbreakingthesilence" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b16a5f"/><stop offset="100%" stop-color="#843c32"/></linearGradient><linearGradient id="gcbreakingthesilence" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbf1ea"/><stop offset="100%" stop-color="#cdc3bc"/></linearGradient><linearGradient id="gdbreakingthesilence" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a4b44"/><stop offset="100%" stop-color="#3c1d16"/></linearGradient><linearGradient id="bgbreakingthesilence" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9ebe9"/><stop offset="100%" stop-color="#e8d3d0"/></linearGradient><filter id="shbreakingthesilence" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A241C" flood-opacity="0.28"/></filter><linearGradient id="snbreakingthesilence" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgbreakingthesilence)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shbreakingthesilence)">
<rect x="40" y="90" width="120" height="80" rx="16" fill="url(#gabreakingthesilence)"/>
<polygon points="70,170 90,170 65,200" fill="url(#gabreakingthesilence)"/>
<circle cx="75" cy="130" r="7" fill="url(#gcbreakingthesilence)"/>
<circle cx="100" cy="130" r="7" fill="url(#gcbreakingthesilence)"/>
<circle cx="125" cy="130" r="7" fill="url(#gcbreakingthesilence)"/>
</g>
<rect width="200" height="150" fill="url(#snbreakingthesilence)"/>
</svg>`,
  "the-philosopher-king": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathephilosopherking" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbthephilosopherking" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcthephilosopherking" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdthephilosopherking" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgthephilosopherking" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shthephilosopherking" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snthephilosopherking" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthephilosopherking)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shthephilosopherking)">
<polygon points="55,140 75,90 100,120 125,90 145,140" fill="url(#gathephilosopherking)"/>
<rect x="55" y="140" width="90" height="20" fill="url(#gathephilosopherking)"/>
<circle cx="75" cy="90" r="7" fill="url(#gbthephilosopherking)"/>
<circle cx="100" cy="118" r="7" fill="url(#gbthephilosopherking)"/>
<circle cx="125" cy="90" r="7" fill="url(#gbthephilosopherking)"/>
</g>
<rect width="200" height="150" fill="url(#snthephilosopherking)"/>
</svg>`,
  "a-matter-of-perspective": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaamatterofperspective" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbamatterofperspective" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcamatterofperspective" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdamatterofperspective" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgamatterofperspective" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shamatterofperspective" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snamatterofperspective" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgamatterofperspective)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shamatterofperspective)">
<ellipse cx="75" cy="130" rx="35" ry="45" fill="url(#gaamatterofperspective)"/>
<ellipse cx="125" cy="130" rx="35" ry="45" fill="url(#gbamatterofperspective)"/>
<rect x="94" y="90" width="12" height="80" fill="#E7EEF2"/>
</g>
<rect width="200" height="150" fill="url(#snamatterofperspective)"/>
</svg>`,
  "the-linguist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathelinguist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3b395"/><stop offset="100%" stop-color="#758567"/></linearGradient><linearGradient id="gbthelinguist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6e8565"/><stop offset="100%" stop-color="#405737"/></linearGradient><linearGradient id="gcthelinguist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8f6ec"/><stop offset="100%" stop-color="#cac8be"/></linearGradient><linearGradient id="gdthelinguist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#535e4d"/><stop offset="100%" stop-color="#25301f"/></linearGradient><linearGradient id="bgthelinguist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f3ea"/><stop offset="100%" stop-color="#dedfd2"/></linearGradient><filter id="shthelinguist" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2E3B26" flood-opacity="0.28"/></filter><linearGradient id="snthelinguist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthelinguist)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f6f6ef" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#8FA37E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#4F6B44" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#8FA37E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#4F6B44" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2E3B26" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2E3B26" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2E3B26" opacity="0.14"/>
<g filter="url(#shthelinguist)">
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="url(#gathelinguist)"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="url(#gbthelinguist)"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F7F5E8" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F7F5E8" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F7F5E8" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F7F5E8" stroke-width="3"/>
</g>
<rect width="200" height="150" fill="url(#snthelinguist)"/>
</svg>`,
  "echoes-of-the-past": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaechoesofthepast" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbechoesofthepast" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcechoesofthepast" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdechoesofthepast" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgechoesofthepast" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shechoesofthepast" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snechoesofthepast" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgechoesofthepast)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shechoesofthepast)">
<rect x="55" y="90" width="90" height="110" fill="url(#gcechoesofthepast)"/>
<rect x="45" y="85" width="110" height="16" rx="8" fill="url(#gaechoesofthepast)"/>
<rect x="45" y="185" width="110" height="16" rx="8" fill="url(#gaechoesofthepast)"/>
<line x1="70" y1="120" x2="130" y2="120" stroke="#6E3B22" stroke-width="4"/>
<line x1="70" y1="140" x2="130" y2="140" stroke="#6E3B22" stroke-width="4"/>
<line x1="70" y1="160" x2="110" y2="160" stroke="#6E3B22" stroke-width="4"/>
</g>
<rect width="200" height="150" fill="url(#snechoesofthepast)"/>
</svg>`,
  "the-diplomat": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathediplomat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#85a0bc"/><stop offset="100%" stop-color="#57728e"/></linearGradient><linearGradient id="gbthediplomat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#576f85"/><stop offset="100%" stop-color="#294157"/></linearGradient><linearGradient id="gcthediplomat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f9fa"/><stop offset="100%" stop-color="#c8cbcc"/></linearGradient><linearGradient id="gdthediplomat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#45535f"/><stop offset="100%" stop-color="#172532"/></linearGradient><linearGradient id="bgthediplomat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff3f6"/><stop offset="100%" stop-color="#d9dfe3"/></linearGradient><filter id="shthediplomat" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1D2E3D" flood-opacity="0.28"/></filter><linearGradient id="snthediplomat" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthediplomat)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f3f6f8" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#6B8CAE" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#33506B" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#6B8CAE" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#33506B" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#1D2E3D" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#1D2E3D" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#1D2E3D" opacity="0.14"/>
<g filter="url(#shthediplomat)">
<rect x="30" y="140" width="60" height="24" rx="12" fill="url(#gathediplomat)" transform="rotate(-10 60 152)"/>
<rect x="110" y="140" width="60" height="24" rx="12" fill="url(#gbthediplomat)" transform="rotate(10 140 152)"/>
<circle cx="100" cy="150" r="14" fill="url(#gdthediplomat)"/>
</g>
<rect width="200" height="150" fill="url(#snthediplomat)"/>
</svg>`,
  "an-ethical-dilemma": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaanethicaldilemma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cc7354"/><stop offset="100%" stop-color="#9f4526"/></linearGradient><linearGradient id="gbanethicaldilemma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#93503e"/><stop offset="100%" stop-color="#652210"/></linearGradient><linearGradient id="gcanethicaldilemma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1d2b7"/><stop offset="100%" stop-color="#c3a489"/></linearGradient><linearGradient id="gdanethicaldilemma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5f473c"/><stop offset="100%" stop-color="#32190e"/></linearGradient><linearGradient id="bganethicaldilemma" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8eee5"/><stop offset="100%" stop-color="#e6d8cb"/></linearGradient><filter id="shanethicaldilemma" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3D1F12" flood-opacity="0.28"/></filter><linearGradient id="snanethicaldilemma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bganethicaldilemma)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#faf2eb" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#C2552F" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#7C2A14" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#C2552F" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#7C2A14" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#3D1F12" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#3D1F12" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#3D1F12" opacity="0.14"/>
<g filter="url(#shanethicaldilemma)">
<rect x="97" y="70" width="6" height="120" fill="url(#gdanethicaldilemma)"/>
<line x1="50" y1="100" x2="150" y2="100" stroke="#3D1F12" stroke-width="5"/>
<path d="M35 100 Q50 135 65 100Z" fill="url(#gaanethicaldilemma)"/>
<path d="M135 100 Q150 135 165 100Z" fill="url(#gbanethicaldilemma)"/>
<rect x="75" y="190" width="50" height="12" rx="4" fill="url(#gdanethicaldilemma)"/>
</g>
<rect width="200" height="150" fill="url(#snanethicaldilemma)"/>
</svg>`,
  "the-archivist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gathearchivist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c58a6d"/><stop offset="100%" stop-color="#975c3f"/></linearGradient><linearGradient id="gbthearchivist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#885e49"/><stop offset="100%" stop-color="#5a301b"/></linearGradient><linearGradient id="gcthearchivist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8dfc9"/><stop offset="100%" stop-color="#cab19b"/></linearGradient><linearGradient id="gdthearchivist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#57483a"/><stop offset="100%" stop-color="#291a0c"/></linearGradient><linearGradient id="bgthearchivist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7ece2"/><stop offset="100%" stop-color="#e4d5c6"/></linearGradient><filter id="shthearchivist" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#33200F" flood-opacity="0.28"/></filter><linearGradient id="snthearchivist" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgthearchivist)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f9f1e9" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#B9714E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#6E3B22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#B9714E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#6E3B22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#33200F" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#33200F" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#33200F" opacity="0.14"/>
<g filter="url(#shthearchivist)">
<rect x="55" y="80" width="90" height="130" rx="4" fill="url(#gathearchivist)"/>
<rect x="55" y="80" width="90" height="38" fill="url(#gbthearchivist)"/>
<circle cx="100" cy="99" r="5" fill="url(#gcthearchivist)"/>
<rect x="55" y="130" width="90" height="38" fill="url(#gbthearchivist)" opacity="0.85"/>
<circle cx="100" cy="149" r="5" fill="url(#gcthearchivist)"/>
<rect x="55" y="180" width="90" height="30" fill="url(#gbthearchivist)" opacity="0.7"/>
<circle cx="100" cy="195" r="5" fill="url(#gcthearchivist)"/>
</g>
<rect width="200" height="150" fill="url(#snthearchivist)"/>
</svg>`,
  "shadows-of-empire": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gashadowsofempire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e5b760"/><stop offset="100%" stop-color="#b78932"/></linearGradient><linearGradient id="gbshadowsofempire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9f7a49"/><stop offset="100%" stop-color="#714d1b"/></linearGradient><linearGradient id="gcshadowsofempire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7e9"/><stop offset="100%" stop-color="#d1c9bb"/></linearGradient><linearGradient id="gdshadowsofempire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6a563c"/><stop offset="100%" stop-color="#3c290e"/></linearGradient><linearGradient id="bgshadowsofempire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcf5e6"/><stop offset="100%" stop-color="#ebe1cc"/></linearGradient><filter id="shshadowsofempire" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3212" flood-opacity="0.28"/></filter><linearGradient id="snshadowsofempire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgshadowsofempire)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fdf7ec" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#E0A83E" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#8B5E22" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#E0A83E" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#8B5E22" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A3212" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A3212" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A3212" opacity="0.14"/>
<g filter="url(#shshadowsofempire)">
<rect x="55" y="200" width="90" height="12" fill="url(#gbshadowsofempire)"/>
<rect x="65" y="90" width="20" height="110" fill="url(#gashadowsofempire)"/>
<rect x="95" y="90" width="20" height="110" fill="url(#gashadowsofempire)"/>
<rect x="125" y="90" width="20" height="110" fill="url(#gashadowsofempire)"/>
<rect x="55" y="78" width="90" height="14" fill="url(#gbshadowsofempire)"/>
<polygon points="45,78 155,78 100,50" fill="url(#gdshadowsofempire)"/>
</g>
<rect width="200" height="150" fill="url(#snshadowsofempire)"/>
</svg>`,
  "the-consciousness-question": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gatheconsciousnessquestion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ad9cce"/><stop offset="100%" stop-color="#7f6ea0"/></linearGradient><linearGradient id="gbtheconsciousnessquestion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#78679a"/><stop offset="100%" stop-color="#4a396d"/></linearGradient><linearGradient id="gctheconsciousnessquestion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7f4fb"/><stop offset="100%" stop-color="#c9c6cd"/></linearGradient><linearGradient id="gdtheconsciousnessquestion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#544b65"/><stop offset="100%" stop-color="#261d37"/></linearGradient><linearGradient id="bgtheconsciousnessquestion" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2eff8"/><stop offset="100%" stop-color="#ddd9e6"/></linearGradient><filter id="shtheconsciousnessquestion" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2F2444" flood-opacity="0.28"/></filter><linearGradient id="sntheconsciousnessquestion" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgtheconsciousnessquestion)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f5f3fa" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#9B87C4" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#5B4685" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#9B87C4" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#5B4685" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#2F2444" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#2F2444" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#2F2444" opacity="0.14"/>
<g filter="url(#shtheconsciousnessquestion)">
<rect x="65" y="110" width="70" height="60" rx="10" fill="url(#gatheconsciousnessquestion)"/>
<circle cx="85" cy="135" r="8" fill="url(#gctheconsciousnessquestion)"/>
<circle cx="115" cy="135" r="8" fill="url(#gctheconsciousnessquestion)"/>
<rect x="80" y="155" width="40" height="8" rx="4" fill="url(#gdtheconsciousnessquestion)"/>
<rect x="95" y="90" width="10" height="20" fill="url(#gbtheconsciousnessquestion)"/>
<circle cx="100" cy="85" r="8" fill="url(#gbtheconsciousnessquestion)"/>
<rect x="60" y="175" width="80" height="20" rx="6" fill="url(#gbtheconsciousnessquestion)"/>
</g>
<rect width="200" height="150" fill="url(#sntheconsciousnessquestion)"/>
</svg>`,
  "a-fragile-peace": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaafragilepeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7aada5"/><stop offset="100%" stop-color="#4d7f77"/></linearGradient><linearGradient id="gbafragilepeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#537a73"/><stop offset="100%" stop-color="#254c45"/></linearGradient><linearGradient id="gcafragilepeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2f8f6"/><stop offset="100%" stop-color="#c4cac8"/></linearGradient><linearGradient id="gdafragilepeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#405755"/><stop offset="100%" stop-color="#122927"/></linearGradient><linearGradient id="bgafragilepeace" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecf3f2"/><stop offset="100%" stop-color="#d5dfdd"/></linearGradient><filter id="shafragilepeace" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#173330" flood-opacity="0.28"/></filter><linearGradient id="snafragilepeace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
<rect width="200" height="280" fill="url(#bgafragilepeace)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#f1f6f5" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#5E9C92" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#2E5D55" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#5E9C92" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#2E5D55" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#173330" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#173330" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#173330" opacity="0.14"/>
<g filter="url(#shafragilepeace)">
<ellipse cx="100" cy="140" rx="40" ry="26" fill="url(#gaafragilepeace)"/>
<circle cx="140" cy="120" r="14" fill="url(#gaafragilepeace)"/>
<polygon points="152,118 168,122 152,126" fill="url(#gbafragilepeace)"/>
<path d="M70 150 Q40 160 20 145" stroke="#2E5D55" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M100 165 Q80 190 55 190" stroke="#F0F7F5" stroke-width="6" fill="none" stroke-linecap="round"/>
</g>
<rect width="200" height="150" fill="url(#snafragilepeace)"/>
</svg>`,
};

export function StoryCard({ story }: { story: Story }) {
  const { t } = useT();
  const navigate = useNavigate();
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

          {story.audio && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate({ to: "/listen/$slug", params: { slug: story.slug } });
              }}
              className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <Headphones className="h-3.5 w-3.5" />
الاستماع للقصة
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
