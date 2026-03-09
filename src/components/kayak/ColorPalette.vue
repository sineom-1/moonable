<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="color in colors"
      :key="color.id"
      @click="$emit('select', color.hex)"
      class="group relative w-12 h-12 rounded-full border-2 transition-all"
      :class="selected === color.hex ? 'border-[#1e3a5f] scale-110 shadow-lg' : 'border-gray-200 hover:border-gray-400'"
      :style="{ background: color.hex }"
      :title="color.name"
      :aria-label="`Select ${color.name}`"
    >
      <span
        v-if="selected === color.hex"
        class="absolute inset-0 flex items-center justify-center"
      >
        <svg class="w-5 h-5" :class="isLight(color.hex) ? 'text-gray-800' : 'text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Color {
  id: string;
  name: string;
  hex: string;
}

defineProps<{
  colors: Color[];
  selected: string;
}>();

defineEmits<{
  select: [hex: string];
}>();

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
</script>
