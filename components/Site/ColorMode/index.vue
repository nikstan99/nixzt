<template>
  <UIButton :button-style="ButtonStyle.NONE" class="flex-col">
    <div
      :class="[
        'transition-all rounded-lg w-full overflow-hidden hover:shadow-[0_0_0_2px] hover:shadow-brand-mint',
        active &&
          'shadow-[0_0_0_2px] shadow-brand-mint',
      ]"
    >
      <div class="flex w-full" v-if="colorMode === 'system'">
        <SiteColorModeColor class="w-1/2" :color-mode="Color.LIGHT" />
        <SiteColorModeColor class="w-1/2" :color-mode="Color.DARK" />
      </div>
      <SiteColorModeColor v-else :color-mode="colorMode" />
    </div>
    <span class="capitalize text-brand-gray">
      {{ colorMode }}
    </span>
  </UIButton>
</template>

<script setup lang="ts">
  import { ButtonStyle } from '@/components/UI/Button.vue';
  import { type Mode, Color } from './Color.vue';

  interface Props {
    colorMode: Mode;
    active?: boolean;
  }
  const props = defineProps<Props>();
</script>
