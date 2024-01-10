<template>
  <component
    v-if="text"
    :is="forInput ? 'label' : 'span'"
    :for="forInput"
    class="block mb-2 text-brand-black dark:text-brand-white"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
  interface Props {
    text: string;
    forInput?: string;
  }
  const props = withDefaults(defineProps<Props>(), {});
</script>
