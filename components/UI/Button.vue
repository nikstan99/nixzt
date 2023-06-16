<template>
  <button :class="['rounded-lg py-2 px-3', type]">
    <UIIcon v-if="icon" :icon="icon" :type="iconType" />
    <slot name="content"></slot>
  </button>
</template>

<script lang="ts">
import { IconType } from "./Icon.vue";
export enum ButtonType {
  DARK = "bg-brand-black text-white",
  LIGHT = "bg-brand-light-gray text-brand-black",
  XLIGHT = "bg-white border border-brand-light-gray text-brand-black",
}
</script>

<script setup lang="ts">
interface Props {
  type: ButtonType;
  icon?: string;
  iconType?: IconType;
}
const props = defineProps<Props>();
</script>
