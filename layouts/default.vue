<template>
  <main class="h-full w-full z-0 overflow-hidden">
    <Header />
    <NuxtLoadingIndicator :color="colors['brand-mint']" />
    <slot></slot>
  </main>
</template>

<script setup>
import colors from "#tailwind-config/theme/colors";
</script>

<style lang="postcss">
  body {
    @apply transition-colors duration-300 dark:bg-brand-black dark:text-brand-white;
  }
</style>