<template>
  <component
    :is="link ? NuxtLink : 'button'"
    :to="link ? to : ''"
    :type="buttonType"
    :class="[
      'flex gap-2 font-medium rounded-lg py-2 px-3 transition-all',
      buttonStyle,
    ]"
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
import { IconType } from "./Icon.vue";
export enum ButtonStyle {
  NONE = "hover:bg-stone-100",
  DARK = "bg-brand-black text-white hover:bg-neutral-700",
  LIGHT = "bg-brand-light-gray text-brand-black hover:bg-stone-200",
  XLIGHT = "bg-white border border-brand-light-gray text-brand-black hover:bg-stone-100",
}
export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}
export enum IconPosition {
  LEFT = "order-0",
  RIGHT = "order-2",
}
</script>

<script setup lang="ts">
interface Props {
  link?: boolean;
  to?: string;
  buttonType?: ButtonType;
  buttonStyle: ButtonStyle;
  icon?: string;
  iconType?: IconType;
  iconPosition?: IconPosition;
}
const props = withDefaults(defineProps<Props>(), {
  buttonType: ButtonType.BUTTON,
});

const NuxtLink = resolveComponent("NuxtLink");
</script>
