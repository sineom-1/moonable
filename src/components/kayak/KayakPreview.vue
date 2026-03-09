<template>
  <div class="w-full">
    <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <!-- Water reflection -->
      <ellipse cx="300" cy="280" rx="250" ry="15" fill="#e0efff" opacity="0.5" />

      <!-- Hull (bottom) -->
      <path
        d="M80 170 Q80 220 300 230 Q520 220 520 170 Q520 200 300 210 Q80 200 80 170Z"
        :fill="secondaryColor"
        :stroke="strokeColor(secondaryColor)"
        stroke-width="1"
      />

      <!-- Hull side -->
      <path
        d="M80 150 Q60 170 80 170 Q80 200 300 210 Q520 200 520 170 Q540 170 520 150 Q520 180 300 190 Q80 180 80 150Z"
        :fill="darken(secondaryColor, 15)"
        :stroke="strokeColor(secondaryColor)"
        stroke-width="0.5"
      />

      <!-- Deck (top) -->
      <path
        d="M90 150 Q90 100 300 90 Q510 100 510 150 Q510 180 300 190 Q90 180 90 150Z"
        :fill="primaryColor"
        :stroke="strokeColor(primaryColor)"
        stroke-width="1"
      />

      <!-- Cockpit opening -->
      <ellipse cx="300" cy="145" rx="55" ry="22" fill="#1a1a2e" opacity="0.7" />
      <ellipse cx="300" cy="145" rx="50" ry="19" fill="#2a2a3e" opacity="0.6" />

      <!-- Deck detail lines -->
      <path
        d="M150 140 Q300 125 450 140"
        fill="none"
        :stroke="strokeColor(primaryColor)"
        stroke-width="0.8"
        opacity="0.3"
      />
      <path
        d="M130 155 Q300 170 470 155"
        fill="none"
        :stroke="strokeColor(primaryColor)"
        stroke-width="0.8"
        opacity="0.3"
      />

      <!-- Bow point -->
      <path
        d="M90 150 Q70 148 55 145 Q70 142 90 150Z"
        :fill="darken(primaryColor, 10)"
        :stroke="strokeColor(primaryColor)"
        stroke-width="0.5"
      />

      <!-- Stern point -->
      <path
        d="M510 150 Q530 148 545 145 Q530 142 510 150Z"
        :fill="darken(primaryColor, 10)"
        :stroke="strokeColor(primaryColor)"
        stroke-width="0.5"
      />

      <!-- Labels -->
      <text x="300" y="55" text-anchor="middle" font-size="12" font-family="system-ui" fill="#0C7BB3" font-weight="600">
        3/4 VIEW
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  primaryColor: string;
  secondaryColor: string;
}>();

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount / 100;
  return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
}

function strokeColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
}
</script>
