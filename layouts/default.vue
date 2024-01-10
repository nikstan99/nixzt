<template>
  <main class="h-full w-full z-0 overflow-hidden">
    <Header />
    <slot></slot>
  </main>
</template>

<style lang="postcss">
  body {
    @apply transition-colors duration-300 dark:bg-brand-black dark:text-brand-white;
  }
</style>