<template>
  <div class="flex gap-2">
    <MenuItem
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      :menu-item="menuItem"
      :menu-item-children="menuItem.children"
      :menu-item-type="menuItemType"
    />
  </div>
</template>

<script lang="ts">
  export type MenuItem = {
    id: number;
    name: string;
    link?: string;
    targetBlank?: boolean;
    children?: object[];
  };
</script>

<script setup lang="ts">
  import type { ButtonStyle } from '../UI/Button.vue';

  const props = defineProps<{
    menuItems: MenuItem[];
    menuItemType?: ButtonStyle;
  }>();
</script>
