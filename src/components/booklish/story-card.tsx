import { Link, useNavigate } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";

const COVERS: Record<string, string> = {
  "a-birthday-surprise": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="#D88C7A"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="#D88C7A"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="#A14A3D"/>
</svg>`,
  "a-letter-from-paris": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<rect x="40" y="120" width="120" height="80" rx="6" fill="#D88C7A"/>
<polygon points="40,120 100,165 160,120" fill="#A14A3D"/>
<polygon points="90,60 110,60 118,100 82,100" fill="#4A241C"/>
<line x1="95" y1="70" x2="105" y2="70" stroke="#4A241C" stroke-width="3"/>
</svg>`,
  "a-new-friend": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="#8FA37E"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="#8FA37E"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="#4F6B44"/>
</svg>`,
  "a-strange-discovery": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<circle cx="75" cy="150" r="28" fill="#6B8CAE"/>
<circle cx="125" cy="150" r="28" fill="#6B8CAE"/>
<rect x="90" y="130" width="20" height="20" fill="#6B8CAE"/>
<circle cx="75" cy="150" r="14" fill="#F4F8F9"/>
<circle cx="125" cy="150" r="14" fill="#F4F8F9"/>
<rect x="65" y="115" width="10" height="18" rx="3" fill="#33506B" transform="rotate(-20 70 124)"/>
<rect x="125" y="115" width="10" height="18" rx="3" fill="#33506B" transform="rotate(20 130 124)"/>
</svg>`,
  "between-two-worlds": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="0" y="0" width="100" height="280" fill="#9B87C4"/>
<rect x="100" y="0" width="100" height="280" fill="#5B4685"/>
<circle cx="55" cy="140" r="30" fill="#F6F2FB"/>
<circle cx="145" cy="140" r="30" fill="#F6F2FB"/>
</svg>`,
  "echoes-of-mars": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<circle cx="100" cy="90" r="40" fill="#F4F8F9" opacity="0.4"/>
<path d="M100 60 Q120 100 110 160 L90 160 Q80 100 100 60Z" fill="#6B8CAE"/>
<circle cx="100" cy="110" r="10" fill="#F4F8F9"/>
<polygon points="90,160 75,190 90,180" fill="#33506B"/>
<polygon points="110,160 125,190 110,180" fill="#33506B"/>
<polygon points="92,180 100,205 108,180" fill="#1D2E3D"/>
</svg>`,
  "first-day": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="55" y="110" width="90" height="100" rx="14" fill="#E0A83E"/>
<rect x="70" y="90" width="60" height="35" rx="16" fill="none" stroke="#4A3212" stroke-width="8"/>
<rect x="70" y="140" width="60" height="45" rx="6" fill="#FFF6E5"/>
<circle cx="100" cy="162" r="5" fill="#8B5E22"/>
</svg>`,
  "grandmothers-recipe": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="65" y="150" width="70" height="60" rx="8" fill="#B9714E"/>
<rect x="70" y="155" width="60" height="30" fill="#F7D9BE"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
  "letters-from-the-lighthouse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<polygon points="90,80 110,80 118,200 82,200" fill="#5E9C92"/>
<rect x="85" y="65" width="30" height="18" fill="#2E5D55"/>
<circle cx="100" cy="60" r="14" fill="#F0F7F5"/>
<rect x="60" y="200" width="80" height="14" fill="#173330"/>
</svg>`,
  "lost-in-the-city": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="30" y="120" width="30" height="90" fill="#6B8CAE"/>
<rect x="65" y="90" width="35" height="120" fill="#33506B"/>
<rect x="105" y="130" width="30" height="80" fill="#6B8CAE"/>
<rect x="140" y="100" width="30" height="110" fill="#33506B"/>
<rect x="40" y="135" width="8" height="10" fill="#F4F8F9"/>
<rect x="75" y="105" width="8" height="10" fill="#F4F8F9"/>
<rect x="115" y="145" width="8" height="10" fill="#F4F8F9"/>
<rect x="150" y="115" width="8" height="10" fill="#F4F8F9"/>
</svg>`,
  "the-blue-bicycle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<circle cx="65" cy="185" r="32" fill="none" stroke="#6B8CAE" stroke-width="7"/>
<circle cx="135" cy="185" r="32" fill="none" stroke="#6B8CAE" stroke-width="7"/>
<circle cx="65" cy="185" r="5" fill="#1D2E3D"/>
<circle cx="135" cy="185" r="5" fill="#1D2E3D"/>
<path d="M65 185 L100 130 L135 185 M100 130 L85 130 L65 185 M100 130 L120 130" stroke="#33506B" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "the-broken-window": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="45" y="80" width="110" height="120" rx="6" fill="#9B87C4"/>
<rect x="55" y="90" width="90" height="100" fill="#F6F2FB"/>
<line x1="100" y1="90" x2="100" y2="190" stroke="#9B87C4" stroke-width="4"/>
<line x1="55" y1="140" x2="145" y2="140" stroke="#9B87C4" stroke-width="4"/>
<line x1="75" y1="95" x2="60" y2="135" stroke="#2F2444" stroke-width="2"/>
<line x1="90" y1="95" x2="105" y2="135" stroke="#2F2444" stroke-width="2"/>
</svg>`,
  "the-clock-tower": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<circle cx="100" cy="140" r="55" fill="#9B87C4"/>
<circle cx="100" cy="140" r="45" fill="#F6F2FB"/>
<line x1="100" y1="140" x2="100" y2="105" stroke="#2F2444" stroke-width="5" stroke-linecap="round"/>
<line x1="100" y1="140" x2="125" y2="150" stroke="#2F2444" stroke-width="5" stroke-linecap="round"/>
<circle cx="100" cy="140" r="6" fill="#5B4685"/>
</svg>`,
  "the-coffee-bean-journey": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="65" y="150" width="70" height="60" rx="8" fill="#B9714E"/>
<rect x="70" y="155" width="60" height="30" fill="#F7D9BE"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
  "the-empty-house": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<polygon points="100,55 165,105 35,105" fill="#5B4685"/>
<rect x="50" y="105" width="100" height="100" fill="#9B87C4"/>
<rect x="88" y="150" width="24" height="55" fill="#2F2444"/>
<rect x="60" y="120" width="24" height="24" fill="#F6F2FB"/>
<rect x="116" y="120" width="24" height="24" fill="#F6F2FB"/>
</svg>`,
  "the-inheritance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<rect x="60" y="70" width="80" height="130" rx="6" fill="#C2552F"/>
<circle cx="100" cy="140" r="8" fill="#3D1F12"/>
<circle cx="150" cy="150" r="16" fill="none" stroke="#7C2A14" stroke-width="8"/>
<rect x="164" y="146" width="26" height="8" fill="#7C2A14"/>
<rect x="182" y="146" width="6" height="14" fill="#7C2A14"/>
</svg>`,
  "the-kind-stranger": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="#E0A83E"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="#E0A83E"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="#8B5E22"/>
</svg>`,
  "the-last-library": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="#6B8CAE"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="#33506B"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F4F8F9" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F4F8F9" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F4F8F9" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F4F8F9" stroke-width="3"/>
</svg>`,
  "the-last-train-home": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="35" y="110" width="130" height="70" rx="14" fill="#9B87C4"/>
<rect x="50" y="122" width="30" height="26" rx="4" fill="#F6F2FB"/>
<rect x="90" y="122" width="30" height="26" rx="4" fill="#F6F2FB"/>
<circle cx="60" cy="188" r="10" fill="#2F2444"/>
<circle cx="140" cy="188" r="10" fill="#2F2444"/>
<rect x="150" y="95" width="15" height="20" fill="#5B4685"/>
</svg>`,
  "the-little-bird": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<ellipse cx="100" cy="185" rx="45" ry="16" fill="#4F6B44"/>
<ellipse cx="90" cy="140" rx="28" ry="24" fill="#8FA37E"/>
<circle cx="115" cy="130" r="14" fill="#8FA37E"/>
<polygon points="128,130 145,133 128,138" fill="#2E3B26"/>
<circle cx="120" cy="126" r="3" fill="#2E3B26"/>
</svg>`,
  "the-lost-dog": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<ellipse cx="100" cy="155" rx="42" ry="32" fill="#E0A83E"/>
<circle cx="70" cy="120" r="24" fill="#E0A83E"/>
<ellipse cx="55" cy="105" rx="10" ry="18" fill="#8B5E22"/>
<ellipse cx="88" cy="105" rx="9" ry="16" fill="#8B5E22"/>
<circle cx="63" cy="122" r="3" fill="#4A3212"/>
<circle cx="78" cy="122" r="3" fill="#4A3212"/>
<ellipse cx="70" cy="132" rx="5" ry="3" fill="#4A3212"/>
</svg>`,
  "the-marathon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<circle cx="115" cy="90" r="14" fill="#5E9C92"/>
<path d="M110 105 L95 140 L70 160" stroke="#5E9C92" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M110 105 L130 130 L155 120" stroke="#5E9C92" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M95 140 L100 180 L80 205" stroke="#2E5D55" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M95 140 L120 175 L115 205" stroke="#2E5D55" stroke-width="10" fill="none" stroke-linecap="round"/>
</svg>`,
  "the-missing-key": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="65" y="130" width="70" height="60" rx="8" fill="#9B87C4"/>
<path d="M78 130 L78 105 Q78 80 100 80 Q122 80 122 105 L122 130" stroke="#5B4685" stroke-width="10" fill="none"/>
<circle cx="100" cy="155" r="8" fill="#2F2444"/>
<rect x="97" y="160" width="6" height="14" fill="#2F2444"/>
</svg>`,
  "the-musician": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<circle cx="70" cy="185" r="16" fill="#B9714E"/>
<circle cx="140" cy="175" r="16" fill="#B9714E"/>
<rect x="83" y="100" width="6" height="85" fill="#33200F"/>
<rect x="153" y="90" width="6" height="85" fill="#33200F"/>
<path d="M83 100 L159 90 L159 110 L83 120Z" fill="#33200F"/>
</svg>`,
  "the-night-bus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="35" y="110" width="130" height="70" rx="14" fill="#6B8CAE"/>
<rect x="50" y="122" width="30" height="26" rx="4" fill="#F4F8F9"/>
<rect x="90" y="122" width="30" height="26" rx="4" fill="#F4F8F9"/>
<circle cx="60" cy="188" r="10" fill="#1D2E3D"/>
<circle cx="140" cy="188" r="10" fill="#1D2E3D"/>
<rect x="150" y="95" width="15" height="20" fill="#33506B"/>
</svg>`,
  "the-old-photograph": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<rect x="45" y="60" width="110" height="140" rx="4" fill="#C2552F" transform="rotate(-4 100 130)"/>
<rect x="55" y="70" width="90" height="90" fill="#EFC9A8" transform="rotate(-4 100 115)"/>
<circle cx="90" cy="105" r="20" fill="#7C2A14" transform="rotate(-4 100 115)"/>
</svg>`,
  "the-painter-upstairs": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="65" y="80" width="70" height="90" fill="#FFF6E5"/>
<rect x="55" y="75" width="90" height="10" fill="#E0A83E"/>
<line x1="70" y1="170" x2="55" y2="210" stroke="#8B5E22" stroke-width="7"/>
<line x1="130" y1="170" x2="145" y2="210" stroke="#8B5E22" stroke-width="7"/>
<line x1="100" y1="170" x2="100" y2="200" stroke="#8B5E22" stroke-width="7"/>
<circle cx="95" cy="115" r="14" fill="#E0A83E"/>
<path d="M75 150 Q100 130 125 150" stroke="#8B5E22" stroke-width="4" fill="none"/>
</svg>`,
  "the-rainy-afternoon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<path d="M40 135 Q100 55 160 135 Q130 115 100 122 Q70 115 40 135Z" fill="#6B8CAE"/>
<rect x="97" y="130" width="6" height="75" rx="3" fill="#1D2E3D"/>
<path d="M97 203 q-2 14 14 12" stroke="#1D2E3D" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="220" r="10" fill="#33506B"/>
<circle cx="60" cy="225" r="5" fill="#33506B"/>
<circle cx="140" cy="222" r="6" fill="#33506B"/>
</svg>`,
  "the-rivers-edge": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<path d="M0 160 Q60 140 100 165 Q140 190 200 160 L200 280 L0 280Z" fill="#8FA37E"/>
<path d="M0 190 Q60 175 100 195 Q140 215 200 190 L200 280 L0 280Z" fill="#4F6B44" opacity="0.7"/>
<ellipse cx="60" cy="130" rx="18" ry="26" fill="#F7F5E8"/>
<ellipse cx="140" cy="125" rx="20" ry="30" fill="#F7F5E8"/>
</svg>`,
  "why-we-dream": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<path d="M130 70 A45 45 0 1 0 150 155 A35 35 0 1 1 130 70Z" fill="#9B87C4"/>
<circle cx="55" cy="190" r="6" fill="#F6F2FB"/>
<circle cx="75" cy="210" r="4" fill="#F6F2FB"/>
<circle cx="45" cy="215" r="3" fill="#F6F2FB"/>
</svg>`,
  "the-red-umbrella": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<path d="M40 135 Q100 55 160 135 Q130 115 100 122 Q70 115 40 135Z" fill="#C2552F"/>
<rect x="97" y="130" width="6" height="75" rx="3" fill="#3D1F12"/>
<path d="M97 203 q-2 14 14 12" stroke="#3D1F12" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="220" r="10" fill="#7C2A14"/>
<circle cx="60" cy="225" r="5" fill="#7C2A14"/>
<circle cx="140" cy="222" r="6" fill="#7C2A14"/>
</svg>`,
  "my-morning-coffee": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="65" y="150" width="70" height="60" rx="8" fill="#E0A83E"/>
<rect x="70" y="155" width="60" height="30" fill="#FFF6E5"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#E0A83E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#8B5E22" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
  "a-walk-in-the-park": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<circle cx="90" cy="110" r="45" fill="#8FA37E"/>
<circle cx="130" cy="130" r="32" fill="#4F6B44"/>
<rect x="83" y="150" width="14" height="55" fill="#2E3B26"/>
<rect x="40" y="205" width="120" height="10" rx="3" fill="#4F6B44"/>
<rect x="50" y="215" width="10" height="20" fill="#2E3B26"/>
<rect x="140" y="215" width="10" height="20" fill="#2E3B26"/>
</svg>`,
  "the-new-neighbor": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<polygon points="100,55 165,105 35,105" fill="#A14A3D"/>
<rect x="50" y="105" width="100" height="100" fill="#D88C7A"/>
<rect x="88" y="150" width="24" height="55" fill="#4A241C"/>
<rect x="60" y="120" width="24" height="24" fill="#FBEEE6"/>
<rect x="116" y="120" width="24" height="24" fill="#FBEEE6"/>
</svg>`,
  "my-favorite-food": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="65" y="150" width="70" height="60" rx="8" fill="#B9714E"/>
<rect x="70" y="155" width="60" height="30" fill="#F7D9BE"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#B9714E" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#6E3B22" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
  "the-old-radio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="45" y="120" width="110" height="75" rx="10" fill="#B9714E"/>
<circle cx="80" cy="157" r="20" fill="#F7D9BE"/>
<circle cx="80" cy="157" r="10" fill="#33200F"/>
<rect x="115" y="140" width="28" height="10" rx="3" fill="#F7D9BE"/>
<circle cx="120" cy="170" r="6" fill="#6E3B22"/>
<circle cx="138" cy="170" r="6" fill="#6E3B22"/>
<path d="M60 120 L75 85 M140 120 L125 85" stroke="#33200F" stroke-width="5" fill="none" stroke-linecap="round"/>
</svg>`,
  "a-day-at-the-market": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<path d="M45 110 L155 110 L145 90 L55 90Z" fill="#8B5E22"/>
<rect x="50" y="110" width="100" height="80" fill="#FFF6E5"/>
<circle cx="80" cy="150" r="16" fill="#E0A83E"/>
<circle cx="110" cy="155" r="14" fill="#8B5E22"/>
<circle cx="95" cy="170" r="12" fill="#E0A83E"/>
<line x1="45" y1="110" x2="45" y2="190" stroke="#4A3212" stroke-width="6"/>
<line x1="155" y1="110" x2="155" y2="190" stroke="#4A3212" stroke-width="6"/>
</svg>`,
  "the-little-cat": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<ellipse cx="100" cy="175" rx="45" ry="35" fill="#E0A83E"/>
<circle cx="100" cy="120" r="35" fill="#E0A83E"/>
<polygon points="72,95 80,125 60,115" fill="#E0A83E"/>
<polygon points="128,95 120,125 140,115" fill="#E0A83E"/>
<circle cx="88" cy="118" r="5" fill="#4A3212"/>
<circle cx="112" cy="118" r="5" fill="#4A3212"/>
<ellipse cx="100" cy="130" rx="5" ry="3" fill="#8B5E22"/>
</svg>`,
  "my-school-bag": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="55" y="110" width="90" height="100" rx="14" fill="#9B87C4"/>
<rect x="70" y="90" width="60" height="35" rx="16" fill="none" stroke="#2F2444" stroke-width="8"/>
<rect x="70" y="140" width="60" height="45" rx="6" fill="#F6F2FB"/>
<circle cx="100" cy="162" r="5" fill="#5B4685"/>
</svg>`,
  "the-quiet-morning": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<path d="M130 70 A45 45 0 1 0 150 155 A35 35 0 1 1 130 70Z" fill="#D88C7A"/>
<circle cx="55" cy="190" r="6" fill="#FBEEE6"/>
<circle cx="75" cy="210" r="4" fill="#FBEEE6"/>
<circle cx="45" cy="215" r="3" fill="#FBEEE6"/>
</svg>`,
  "the-summer-job": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<rect x="45" y="120" width="110" height="75" rx="8" fill="#5E9C92"/>
<rect x="80" y="100" width="40" height="22" rx="6" fill="none" stroke="#173330" stroke-width="7"/>
<rect x="45" y="150" width="110" height="12" fill="#2E5D55"/>
<rect x="92" y="150" width="16" height="16" rx="3" fill="#F0F7F5"/>
</svg>`,
  "a-letter-to-mom": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<rect x="40" y="105" width="120" height="85" rx="6" fill="#D88C7A"/>
<polygon points="40,105 100,155 160,105" fill="#A14A3D"/>
<polygon points="40,190 85,145 40,145" fill="#A14A3D" opacity="0.5"/>
<polygon points="160,190 115,145 160,145" fill="#A14A3D" opacity="0.5"/>
</svg>`,
  "the-broken-phone": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="70" y="60" width="60" height="150" rx="12" fill="#6B8CAE"/>
<rect x="78" y="75" width="44" height="105" fill="#F4F8F9"/>
<line x1="88" y1="90" x2="90" y2="160" stroke="#33506B" stroke-width="3" opacity="0.7"/>
<line x1="105" y1="80" x2="98" y2="170" stroke="#33506B" stroke-width="4" opacity="0.9"/>
<circle cx="100" cy="192" r="6" fill="#1D2E3D"/>
</svg>`,
  "moving-to-a-new-city": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<polygon points="100,55 165,105 35,105" fill="#33506B"/>
<rect x="50" y="105" width="100" height="100" fill="#6B8CAE"/>
<rect x="88" y="150" width="24" height="55" fill="#1D2E3D"/>
<rect x="60" y="120" width="24" height="24" fill="#F4F8F9"/>
<rect x="116" y="120" width="24" height="24" fill="#F4F8F9"/>
</svg>`,
  "the-cooking-class": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<rect x="65" y="150" width="70" height="60" rx="8" fill="#C2552F"/>
<rect x="70" y="155" width="60" height="30" fill="#EFC9A8"/>
<path d="M135 160 q25 0 25 20 q0 20 -25 20" stroke="#C2552F" stroke-width="8" fill="none"/>
<path d="M80 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M100 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M120 130 q6 -14 0 -25" stroke="#7C2A14" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
  "a-weekend-trip": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<polygon points="30,200 90,100 130,150 160,110 190,200" fill="#5E9C92"/>
<polygon points="90,100 110,135 70,135" fill="#F0F7F5"/>
<polygon points="160,110 175,135 145,135" fill="#F0F7F5"/>
<circle cx="150" cy="70" r="18" fill="#2E5D55"/>
</svg>`,
  "the-lost-wallet": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="45" y="120" width="110" height="80" rx="10" fill="#E0A83E"/>
<rect x="45" y="120" width="110" height="30" rx="10" fill="#8B5E22"/>
<circle cx="140" cy="160" r="10" fill="#4A3212"/>
<rect x="55" y="160" width="40" height="6" rx="3" fill="#FFF6E5"/>
</svg>`,
  "learning-to-swim": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<path d="M20 180 Q40 165 60 180 Q80 195 100 180 Q120 165 140 180 Q160 195 180 180" stroke="#6B8CAE" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M20 205 Q40 190 60 205 Q80 220 100 205 Q120 190 140 205 Q160 220 180 205" stroke="#33506B" stroke-width="8" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="90" r="30" fill="#F4F8F9"/>
</svg>`,
  "the-new-teacher": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="#9B87C4"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="#5B4685"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F6F2FB" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F6F2FB" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F6F2FB" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F6F2FB" stroke-width="3"/>
</svg>`,
  "a-surprise-visit": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<rect x="50" y="110" width="100" height="80" rx="10" fill="#D88C7A"/>
<rect x="82" y="90" width="36" height="24" rx="8" fill="none" stroke="#4A241C" stroke-width="7"/>
<rect x="50" y="140" width="100" height="10" fill="#A14A3D"/>
<circle cx="100" cy="150" r="6" fill="#FBEEE6"/>
</svg>`,
  "the-job-interview": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="45" y="120" width="110" height="75" rx="8" fill="#6B8CAE"/>
<rect x="80" y="100" width="40" height="22" rx="6" fill="none" stroke="#1D2E3D" stroke-width="7"/>
<rect x="45" y="150" width="110" height="12" fill="#33506B"/>
<rect x="92" y="150" width="16" height="16" rx="3" fill="#F4F8F9"/>
</svg>`,
  "a-difficult-decision": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<rect x="97" y="70" width="6" height="120" fill="#2E3B26"/>
<line x1="50" y1="100" x2="150" y2="100" stroke="#2E3B26" stroke-width="5"/>
<path d="M35 100 Q50 135 65 100Z" fill="#8FA37E"/>
<path d="M135 100 Q150 135 165 100Z" fill="#4F6B44"/>
<rect x="75" y="190" width="50" height="12" rx="4" fill="#2E3B26"/>
</svg>`,
  "the-family-reunion": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<circle cx="75" cy="120" r="22" fill="#C2552F"/>
<rect x="55" y="142" width="40" height="55" rx="14" fill="#C2552F"/>
<circle cx="130" cy="115" r="26" fill="#7C2A14"/>
<rect x="106" y="141" width="48" height="60" rx="16" fill="#7C2A14"/>
<circle cx="100" cy="160" r="14" fill="#3D1F12"/>
<rect x="88" y="174" width="24" height="30" rx="10" fill="#3D1F12"/>
</svg>`,
  "starting-a-business": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="50" y="130" width="100" height="65" rx="8" fill="#E0A83E"/>
<polygon points="70,130 130,130 150,90 50,90" fill="#8B5E22"/>
<circle cx="100" cy="110" r="12" fill="#FFF6E5"/>
<rect x="93" y="103" width="14" height="14" fill="#4A3212"/>
</svg>`,
  "the-hiking-accident": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<polygon points="30,200 90,100 130,150 160,110 190,200" fill="#8FA37E"/>
<polygon points="90,100 110,135 70,135" fill="#F7F5E8"/>
<polygon points="160,110 175,135 145,135" fill="#F7F5E8"/>
<circle cx="150" cy="70" r="18" fill="#4F6B44"/>
</svg>`,
  "a-misunderstanding": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<rect x="40" y="90" width="120" height="80" rx="16" fill="#D88C7A"/>
<polygon points="70,170 90,170 65,200" fill="#D88C7A"/>
<circle cx="75" cy="130" r="7" fill="#FBEEE6"/>
<circle cx="100" cy="130" r="7" fill="#FBEEE6"/>
<circle cx="125" cy="130" r="7" fill="#FBEEE6"/>
</svg>`,
  "the-online-friend": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="70" y="60" width="60" height="150" rx="12" fill="#9B87C4"/>
<rect x="78" y="75" width="44" height="105" fill="#F6F2FB"/>
<line x1="88" y1="90" x2="90" y2="160" stroke="#5B4685" stroke-width="3" opacity="0.7"/>
<line x1="105" y1="80" x2="98" y2="170" stroke="#5B4685" stroke-width="4" opacity="0.9"/>
<circle cx="100" cy="192" r="6" fill="#2F2444"/>
</svg>`,
  "changing-careers": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="#5E9C92"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="#2E5D55"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F0F7F5" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F0F7F5" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F0F7F5" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F0F7F5" stroke-width="3"/>
</svg>`,
  "the-neighborhood-garden": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<path d="M60 150 L60 200 L140 200 L140 150 Z" fill="#8FA37E"/>
<ellipse cx="80" cy="130" rx="16" ry="24" fill="#4F6B44"/>
<ellipse cx="110" cy="120" rx="18" ry="28" fill="#4F6B44"/>
<ellipse cx="130" cy="140" rx="14" ry="20" fill="#4F6B44"/>
<rect x="80" y="150" width="6" height="30" fill="#2E3B26"/>
<rect x="110" y="150" width="6" height="35" fill="#2E3B26"/>
</svg>`,
  "a-second-chance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="#D88C7A"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="#D88C7A"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="#A14A3D"/>
</svg>`,
  "the-whistleblower": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="40" y="90" width="120" height="80" rx="16" fill="#6B8CAE"/>
<polygon points="70,170 90,170 65,200" fill="#6B8CAE"/>
<circle cx="75" cy="130" r="7" fill="#F4F8F9"/>
<circle cx="100" cy="130" r="7" fill="#F4F8F9"/>
<circle cx="125" cy="130" r="7" fill="#F4F8F9"/>
</svg>`,
  "a-question-of-trust": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<ellipse cx="75" cy="130" rx="35" ry="45" fill="#9B87C4"/>
<ellipse cx="125" cy="130" rx="35" ry="45" fill="#5B4685"/>
<rect x="94" y="90" width="12" height="80" fill="#ECE7F5"/>
</svg>`,
  "the-art-forger": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<ellipse cx="100" cy="140" rx="60" ry="45" fill="#B9714E"/>
<ellipse cx="115" cy="150" rx="18" ry="14" fill="#F3E3D3"/>
<circle cx="70" cy="120" r="8" fill="#6E3B22"/>
<circle cx="95" cy="105" r="8" fill="#F7D9BE"/>
<circle cx="125" cy="110" r="8" fill="#33200F"/>
<circle cx="60" cy="150" r="8" fill="#33200F"/>
<rect x="120" y="80" width="6" height="50" fill="#33200F" transform="rotate(30 123 105)"/>
</svg>`,
  "negotiating-peace": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<ellipse cx="100" cy="140" rx="40" ry="26" fill="#8FA37E"/>
<circle cx="140" cy="120" r="14" fill="#8FA37E"/>
<polygon points="152,118 168,122 152,126" fill="#4F6B44"/>
<path d="M70 150 Q40 160 20 145" stroke="#4F6B44" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M100 165 Q80 190 55 190" stroke="#F7F5E8" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`,
  "the-refugee-story": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<rect x="40" y="80" width="120" height="120" fill="#F0F7F5"/>
<path d="M40 80 L100 100 L160 80 L160 200 L100 180 L40 200Z" fill="#5E9C92"/>
<circle cx="100" cy="140" r="10" fill="#2E5D55"/>
<path d="M100 140 L100 120" stroke="#2E5D55" stroke-width="3"/>
<circle cx="70" cy="110" r="4" fill="#173330"/>
<circle cx="130" cy="160" r="4" fill="#173330"/>
</svg>`,
  "an-unexpected-inheritance": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="60" y="70" width="80" height="130" rx="6" fill="#E0A83E"/>
<circle cx="100" cy="140" r="8" fill="#4A3212"/>
<circle cx="150" cy="150" r="16" fill="none" stroke="#8B5E22" stroke-width="8"/>
<rect x="164" y="146" width="26" height="8" fill="#8B5E22"/>
<rect x="182" y="146" width="6" height="14" fill="#8B5E22"/>
</svg>`,
  "the-climate-scientist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<ellipse cx="90" cy="110" rx="45" ry="28" fill="#F0F7F5"/>
<ellipse cx="130" cy="120" rx="35" ry="22" fill="#F0F7F5"/>
<rect x="95" y="130" width="10" height="60" rx="5" fill="#5E9C92"/>
<circle cx="100" cy="195" r="16" fill="#5E9C92"/>
<rect x="97" y="140" width="6" height="40" fill="#2E5D55"/>
</svg>`,
  "a-city-divided": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="30" y="120" width="30" height="90" fill="#B9714E"/>
<rect x="65" y="90" width="35" height="120" fill="#6E3B22"/>
<rect x="105" y="130" width="30" height="80" fill="#B9714E"/>
<rect x="140" y="100" width="30" height="110" fill="#6E3B22"/>
<rect x="40" y="135" width="8" height="10" fill="#F7D9BE"/>
<rect x="75" y="105" width="8" height="10" fill="#F7D9BE"/>
<rect x="115" y="145" width="8" height="10" fill="#F7D9BE"/>
<rect x="150" y="115" width="8" height="10" fill="#F7D9BE"/>
</svg>`,
  "the-memory-thief": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<path d="M70 100 Q50 100 50 130 Q40 140 55 155 Q50 175 75 180 Q90 195 110 180 Q135 175 130 155 Q145 140 135 130 Q135 100 110 100 Q100 90 85 95 Q80 90 70 100Z" fill="#9B87C4"/>
<path d="M100 100 L100 180" stroke="#ECE7F5" stroke-width="4"/>
<circle cx="80" cy="130" r="4" fill="#2F2444"/>
<circle cx="120" cy="140" r="4" fill="#2F2444"/>
</svg>`,
  "breaking-the-silence": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F7E1DE"/>
<rect x="40" y="90" width="120" height="80" rx="16" fill="#D88C7A"/>
<polygon points="70,170 90,170 65,200" fill="#D88C7A"/>
<circle cx="75" cy="130" r="7" fill="#FBEEE6"/>
<circle cx="100" cy="130" r="7" fill="#FBEEE6"/>
<circle cx="125" cy="130" r="7" fill="#FBEEE6"/>
</svg>`,
  "the-philosopher-king": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<polygon points="55,140 75,90 100,120 125,90 145,140" fill="#E0A83E"/>
<rect x="55" y="140" width="90" height="20" fill="#E0A83E"/>
<circle cx="75" cy="90" r="7" fill="#8B5E22"/>
<circle cx="100" cy="118" r="7" fill="#8B5E22"/>
<circle cx="125" cy="90" r="7" fill="#8B5E22"/>
</svg>`,
  "a-matter-of-perspective": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<ellipse cx="75" cy="130" rx="35" ry="45" fill="#6B8CAE"/>
<ellipse cx="125" cy="130" rx="35" ry="45" fill="#33506B"/>
<rect x="94" y="90" width="12" height="80" fill="#E7EEF2"/>
</svg>`,
  "the-linguist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#EDEEE0"/>
<path d="M40 90 Q100 75 100 90 L100 200 Q100 185 40 200 Z" fill="#8FA37E"/>
<path d="M160 90 Q100 75 100 90 L100 200 Q100 185 160 200 Z" fill="#4F6B44"/>
<line x1="60" y1="105" x2="90" y2="100" stroke="#F7F5E8" stroke-width="3"/>
<line x1="60" y1="120" x2="90" y2="115" stroke="#F7F5E8" stroke-width="3"/>
<line x1="110" y1="100" x2="140" y2="105" stroke="#F7F5E8" stroke-width="3"/>
<line x1="110" y1="115" x2="140" y2="120" stroke="#F7F5E8" stroke-width="3"/>
</svg>`,
  "echoes-of-the-past": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="55" y="90" width="90" height="110" fill="#F7D9BE"/>
<rect x="45" y="85" width="110" height="16" rx="8" fill="#B9714E"/>
<rect x="45" y="185" width="110" height="16" rx="8" fill="#B9714E"/>
<line x1="70" y1="120" x2="130" y2="120" stroke="#6E3B22" stroke-width="4"/>
<line x1="70" y1="140" x2="130" y2="140" stroke="#6E3B22" stroke-width="4"/>
<line x1="70" y1="160" x2="110" y2="160" stroke="#6E3B22" stroke-width="4"/>
</svg>`,
  "the-diplomat": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E7EEF2"/>
<rect x="30" y="140" width="60" height="24" rx="12" fill="#6B8CAE" transform="rotate(-10 60 152)"/>
<rect x="110" y="140" width="60" height="24" rx="12" fill="#33506B" transform="rotate(10 140 152)"/>
<circle cx="100" cy="150" r="14" fill="#1D2E3D"/>
</svg>`,
  "an-ethical-dilemma": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F5E6D8"/>
<rect x="97" y="70" width="6" height="120" fill="#3D1F12"/>
<line x1="50" y1="100" x2="150" y2="100" stroke="#3D1F12" stroke-width="5"/>
<path d="M35 100 Q50 135 65 100Z" fill="#C2552F"/>
<path d="M135 100 Q150 135 165 100Z" fill="#7C2A14"/>
<rect x="75" y="190" width="50" height="12" rx="4" fill="#3D1F12"/>
</svg>`,
  "the-archivist": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#F3E3D3"/>
<rect x="55" y="80" width="90" height="130" rx="4" fill="#B9714E"/>
<rect x="55" y="80" width="90" height="38" fill="#6E3B22"/>
<circle cx="100" cy="99" r="5" fill="#F7D9BE"/>
<rect x="55" y="130" width="90" height="38" fill="#6E3B22" opacity="0.85"/>
<circle cx="100" cy="149" r="5" fill="#F7D9BE"/>
<rect x="55" y="180" width="90" height="30" fill="#6E3B22" opacity="0.7"/>
<circle cx="100" cy="195" r="5" fill="#F7D9BE"/>
</svg>`,
  "shadows-of-empire": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#FBF0DA"/>
<rect x="55" y="200" width="90" height="12" fill="#8B5E22"/>
<rect x="65" y="90" width="20" height="110" fill="#E0A83E"/>
<rect x="95" y="90" width="20" height="110" fill="#E0A83E"/>
<rect x="125" y="90" width="20" height="110" fill="#E0A83E"/>
<rect x="55" y="78" width="90" height="14" fill="#8B5E22"/>
<polygon points="45,78 155,78 100,50" fill="#4A3212"/>
</svg>`,
  "the-consciousness-question": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#ECE7F5"/>
<rect x="65" y="110" width="70" height="60" rx="10" fill="#9B87C4"/>
<circle cx="85" cy="135" r="8" fill="#F6F2FB"/>
<circle cx="115" cy="135" r="8" fill="#F6F2FB"/>
<rect x="80" y="155" width="40" height="8" rx="4" fill="#2F2444"/>
<rect x="95" y="90" width="10" height="20" fill="#5B4685"/>
<circle cx="100" cy="85" r="8" fill="#5B4685"/>
<rect x="60" y="175" width="80" height="20" rx="6" fill="#5B4685"/>
</svg>`,
  "a-fragile-peace": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
<rect width="200" height="280" fill="#E3EEEC"/>
<ellipse cx="100" cy="140" rx="40" ry="26" fill="#5E9C92"/>
<circle cx="140" cy="120" r="14" fill="#5E9C92"/>
<polygon points="152,118 168,122 152,126" fill="#2E5D55"/>
<path d="M70 150 Q40 160 20 145" stroke="#2E5D55" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M100 165 Q80 190 55 190" stroke="#F0F7F5" stroke-width="6" fill="none" stroke-linecap="round"/>
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
