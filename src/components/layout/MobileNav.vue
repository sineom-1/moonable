<template>
  <div class="lg:hidden">
    <button
      @click="isOpen = !isOpen"
      class="p-2 text-text-muted hover:text-navy transition-colors"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation menu"
    >
      <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <Transition name="slide">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg"
      >
        <nav class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="px-4 py-3 text-text-muted hover:text-navy hover:bg-surface rounded-lg font-medium transition-colors"
            @click="isOpen = false"
          >
            {{ link.label }}
          </a>
          <a
            href="/contact"
            class="mt-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-3 rounded-lg text-center transition-colors"
            @click="isOpen = false"
          >
            Get a Quote
          </a>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Aluminum Railing', href: '/railing' },
  { label: 'Kayak', href: '/kayak' },
  { label: 'Contact', href: '/contact' },
];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
