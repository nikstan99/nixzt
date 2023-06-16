<template>
  <span>
    <svg v-bind="$attrs" v-if="svg" role="img">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :xlink:href="'/icons/symbol-defs.svg#icon-' + icon"
      ></use>
    </svg>
    <i v-bind="$attrs" v-else :class="'fa-' + type + ' fa-' + icon"></i>
  </span>
</template>

<script lang="ts">
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};

export enum IconType {
  REGULAR = "regular",
  BRANDS = "brands",
  SOLID = "solid",
}
</script>

<script setup lang="ts">
/*
 * To add new <svg> icons add them to the symbol-defs.svg file.
 * It requires you to have <symbol>, so use a converter:
 * https://icomoon.io/app/#/select
 *
 */
interface Props {
  icon: string;
  type?: IconType;
  svg?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: IconType.REGULAR,
});
</script>
