<template>
  <button
    :class="[
      'flex gap-2 font-medium rounded-lg py-2 px-3 transition-all',
      type
    ]"
  >
    <UIIcon
      v-if="icon"
      :icon="icon"
      :type="iconType"
      :wrapper-class="iconPosition"
    />
    <!-- <span class="order-1"> -->
      <slot class="order-1"></slot>
    <!-- </span> -->
  </button>
</template>

<script lang="ts">
import { IconType } from "./Icon.vue";
export enum ButtonType {
  NONE = "hover:bg-stone-100",
  DARK = "bg-brand-black text-white hover:bg-neutral-700",
  LIGHT = "bg-brand-light-gray text-brand-black hover:bg-stone-200",
  XLIGHT = "bg-white border border-brand-light-gray text-brand-black hover:bg-stone-100",
}
export enum IconPosition {
  LEFT = "order-0",
  RIGHT = "order-2",
}
</script>

<script setup lang="ts">
interface Props {
  type: ButtonType;
  icon?: string;
  iconType?: IconType;
  iconPosition?: IconPosition;
}
const props = defineProps<Props>();
</script>
