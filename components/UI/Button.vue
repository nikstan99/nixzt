<template>
  <component
    :is="link ? NuxtLink : 'button'"
    :to="link ? to : ''"
    :type="buttonType"
    :class="['flex gap-2 font-medium transition-all', buttonStyle]"
  >
    <UIIcon
      v-if="icon"
      :icon="icon"
      :type="iconType"
      :wrapper-class="iconPosition"
    />
    <slot class="order-1"></slot>
  </component>
</template>

<script lang="ts">
  import { IconType } from './Icon.vue';
  import { InputStyle } from './Input.vue';
  const baseButtonStyles = 'rounded-xl py-2 px-3';
  export enum ButtonStyle {
    NONE = 'hover:text-stone-900 dark:hover:text-stone-100',
    PLAIN = `${baseButtonStyles} text-brand-gray dark:text-brand-white hover:bg-stone-100 dark:hover:bg-brand-gray/50`,
    DARK = `${baseButtonStyles} bg-brand-black dark:bg-brand-light-gray border border-transparent text-white dark:text-brand-black hover:bg-neutral-600 dark:hover:bg-brand-washed-white`,
    LIGHT = `${baseButtonStyles} bg-brand-light-gray dark:bg-neutral-700 border border-transparent text-brand-black dark:text-white hover:bg-brand-gray/25 dark:hover:bg-neutral-600`,
    XLIGHT = `${baseButtonStyles} border border-brand-light-gray dark:border-brand-gray/50 text-brand-black dark:text-brand-white hover:bg-brand-light-gray/25 dark:hover:bg-brand-gray/25`,
  }
  export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset',
  }
  export enum IconPosition {
    LEFT = 'order-0',
    RIGHT = 'order-2',
  }
</script>

<script setup lang="ts">
  interface Props {
    link?: boolean;
    to?: string;
    buttonType?: ButtonType;
    buttonStyle: ButtonStyle | InputStyle;
    icon?: string;
    iconType?: IconType;
    iconPosition?: IconPosition;
  }
  const props = withDefaults(defineProps<Props>(), {
    buttonType: ButtonType.BUTTON,
  });

  const NuxtLink = resolveComponent('NuxtLink');
</script>
