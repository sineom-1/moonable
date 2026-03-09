<template>
  <div class="flex flex-wrap gap-4">
    <button
      v-for="color in colors"
      :key="color.id"
      @click="$emit('select', color.hex)"
      class="group relative w-14 h-14 rounded-full border-2 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
      :class="selected === color.hex ? 'border-primary scale-110 shadow-lg' : 'border-border hover:border-text-muted hover:scale-105 hover:shadow-md'"
      :style="{ background: color.hex }"
      :title="color.name"
      :aria-label="`Select ${color.name}`"
    >
      <span
        v-if="selected === color.hex"
        class="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-200"
      >
        <svg class="w-6 h-6" :class="isLight(color.hex) ? 'text-text-main' : 'text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      
      <!-- Tooltip on hover -->
      <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-main text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        {{ color.name }}
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-main rotate-45"></div>
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