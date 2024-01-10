<template>
  <div
    :class="[
      'relative h-10 overflow-hidden',
      colorMode === 'dark' ? 'bg-neutral-900' : 'bg-brand-light-gray',
    ]"
  >
    <div
      :class="[
        'absolute left-3 top-3 grid w-max grid-cols-3 gap-x-[2px] rounded-4 border border-transparent rounded-[4px] p-1',
        colorMode === 'dark' ? ' bg-neutral-600' : 'bg-brand-white',
      ]"
    >
      <div
        v-for="div in 3"
        :key="div"
        :class="[
          'h-32 w-4 border border-transparent rounded-[3px]',
          colorMode === 'dark' ? 'bg-neutral-900' : 'bg-brand-light-gray',
        ]"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
  export enum Color {
    SYSTEM = 'system',
    LIGHT = 'light',
    DARK = 'dark',
  }
  export type Mode = Color;
</script>

<script setup lang="ts">
  interface Props {
    colorMode: Mode;
  }
  const props = defineProps<Props>();
</script>
