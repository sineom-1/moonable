<template>
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <!-- Preview -->
      <div class="order-1 lg:order-2">
        <div class="bg-surface rounded-3xl p-8 lg:p-12 shadow-sm border border-border sticky top-32 flex flex-col items-center">
          <KayakPreview :primary-color="primaryColor" :secondary-color="secondaryColor" />
          
          <div class="mt-10 bg-white rounded-2xl p-5 w-full border border-border shadow-sm flex items-center justify-between">
            <div>
              <p class="text-xs text-text-muted font-bold tracking-wider uppercase mb-1">Current Configuration</p>
              <h4 class="font-extrabold text-text-main text-lg">{{ colorName(primaryColor) }} & {{ colorName(secondaryColor) }}</h4>
            </div>
            <div class="flex relative">
              <span class="w-10 h-10 rounded-full border-4 border-white shadow-md z-10" :style="{ background: primaryColor }"></span>
              <span class="w-10 h-10 rounded-full border-4 border-white shadow-md -ml-4" :style="{ background: secondaryColor }"></span>
            </div>
          </div>
          
          <p class="mt-6 text-xs text-center text-text-muted font-medium max-w-xs leading-relaxed">
            * 3D rendering is for conceptual reference. Actual rotomolded finishes, like our premium camo, may vary in pattern distribution.
          </p>
        </div>
      </div>

      <!-- Color Selectors -->
      <div class="order-2 lg:order-1 space-y-10 py-4">
        <div>
          <h3 class="text-xl font-extrabold text-text-main mb-2">Deck Color <span class="text-text-muted font-medium text-base ml-2">(Top)</span></h3>
          <p class="text-text-muted font-medium text-sm mb-5">Select the primary upper body color of your kayak.</p>
          <ColorPalette
            :colors="colors"
            :selected="primaryColor"
            @select="primaryColor = $event"
          />
        </div>

        <div>
          <h3 class="text-xl font-extrabold text-text-main mb-2">Hull Color <span class="text-text-muted font-medium text-base ml-2">(Bottom)</span></h3>
          <p class="text-text-muted font-medium text-sm mb-5">Select the lower hull color for maximum water contrast.</p>
          <ColorPalette
            :colors="colors"
            :selected="secondaryColor"
            @select="secondaryColor = $event"
          />
        </div>

        <div class="pt-6">
          <a
            href="/contact"
            class="block w-full text-center bg-primary hover:bg-primary-hover text-white font-bold text-lg px-8 py-4 rounded-full transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
          >
            Request a Quote for this Build
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ColorPalette from './ColorPalette.vue';
import KayakPreview from './KayakPreview.vue';

// Updated palette to reflect more premium "outdoor" colors, matching camo/slate aesthetic
const colors = [
  { id: 'slate', name: 'Alpine Slate', hex: '#64748B' },
  { id: 'carbon', name: 'Carbon Black', hex: '#18181B' },
  { id: 'arctic', name: 'Arctic White', hex: '#F8FAFC' },
  { id: 'navy', name: 'Deep Ocean', hex: '#0F172A' },
  { id: 'forest', name: 'Pine Green', hex: '#14532D' },
  { id: 'sand', name: 'Desert Sand', hex: '#D6D3D1' },
  { id: 'orange', name: 'Safety Orange', hex: '#EA580C' },
  { id: 'crimson', name: 'Crimson Red', hex: '#BE123C' },
];

const primaryColor = ref('#64748B');
const secondaryColor = ref('#18181B');

function colorName(hex: string): string {
  return colors.find((c) => c.hex === hex)?.name ?? hex;
}
</script>