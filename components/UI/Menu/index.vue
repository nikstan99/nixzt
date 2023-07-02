<template>
  <div class="flex gap-2 text-sm">
    <UIMenuItem
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      :menu-item="menuItem"
      :menu-item-children="menuItem.children"
    />
  </div>
</template>

<script setup lang="ts">
const menuItems = reactive([
  { id: 1, name: "Menu item 1", link: "/" },
  {
    id: 2,
    name: "Menu item 2",
    children: [
      { id: 3, name: "Submenu item 1", link: "/about" },
      {
        id: 4,
        name: "Submenu item 2",
        link: "/about",
        children: [
          { id: 5, name: "Submenu item 3", link: "/about" },
          { id: 6, name: "Submenu item 4", link: "/about" },
        ],
      },
    ],
  },
]);

// watch(useRoute(), () => {
//   document.querySelector(".dropdown.menu-item").classList.remove("menu-item-active");
//   document.querySelector(".router-link-active").closest(".dropdown.menu-item").classList.add("menu-item-active");
// });
</script>

<style lang="postcss">
.menu-item {
  @apply text-brand-gray;

  &.router-link-active,
  &.menu-item-active {
    @apply text-brand-black;
  }
}
</style>
