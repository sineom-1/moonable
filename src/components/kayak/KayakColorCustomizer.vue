<template>
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Preview -->
      <div class="order-1 lg:order-2">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
          <KayakPreview :primary-color="primaryColor" :secondary-color="secondaryColor" />
          <p class="mt-4 text-xs text-center text-gray-400 italic">
            * Rendering is for reference only. Actual colors may vary due to the rotomolding process.
          </p>
        </div>
      </div>

      <!-- Color Selectors -->
      <div class="order-2 lg:order-1 space-y-8">
        <div>
          <h3 class="text-lg font-semibold text-[#1e3a5f] mb-3">Deck Color (Top)</h3>
          <ColorPalette
            :colors="colors"
            :selected="primaryColor"
            @select="primaryColor = $event"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold text-[#1e3a5f] mb-3">Hull Color (Bottom)</h3>
          <ColorPalette
            :colors="colors"
            :selected="secondaryColor"
            @select="secondaryColor = $event"
          />
        </div>

        <div class="bg-[#f4f7fa] rounded-xl p-5">
          <h4 class="font-semibold text-[#1e3a5f] mb-2">Your Selection</h4>
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full border-2 border-white shadow" :style="{ background: primaryColor }"></span>
            <span class="text-sm text-gray-500">+</span>
            <span class="w-8 h-8 rounded-full border-2 border-white shadow" :style="{ background: secondaryColor }"></span>
            <span class="text-sm text-gray-600 ml-2">
              {{ colorName(primaryColor) }} / {{ colorName(secondaryColor) }}
            </span>
          </div>
        </div>

        <a
          href="/contact"
          class="block w-full text-center bg-[#e8722a] hover:bg-[#d4621e] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          Contact Us to Order
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ColorPalette from './ColorPalette.vue';
import KayakPreview from './KayakPreview.vue';

const colors = [
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'black', name: 'Black', hex: '#1A1A1A' },
  { id: 'red', name: 'Red', hex: '#D32F2F' },
  { id: 'blue', name: 'Ocean Blue', hex: '#1565C0' },
  { id: 'green', name: 'Forest Green', hex: '#2E7D32' },
  { id: 'yellow', name: 'Sunshine Yellow', hex: '#F9A825' },
  { id: 'orange', name: 'Sunset Orange', hex: '#E65100' },
  { id: 'grey', name: 'Slate Grey', hex: '#607D8B' },
];

const primaryColor = ref('#1565C0');
const secondaryColor = ref('#FFFFFF');

function colorName(hex: string): string {
  return colors.find((c) => c.hex === hex)?.name ?? hex;
}
</script>
