<template>
  <div class="flex gap-2">
    <MenuItem
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      :menu-item="menuItem"
      :menu-item-children="menuItem.children"
    />
  </div>
</template>

<script setup lang="ts">
type MenuItem = {
  id: number,
  name: string,
  link?: string,
  targetBlank?: boolean,
  children?: object[]
}
const props = defineProps<{
  menuItems: MenuItem[]
}>();

</script>
