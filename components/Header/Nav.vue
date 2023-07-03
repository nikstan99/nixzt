<template>
  <div class="flex items-center gap-8">
    <NuxtLink to="/">
      <h1 class="font-Caros font-extrabold text-5xl">
        nixzt<span class="text-brand-gray">.</span>
      </h1>
    </NuxtLink>
    <Menu class="main-menu" :menu-items="menuItems" />
  </div>
</template>

<script setup lang="ts">
const menuItems = reactive([
  { id: 1, name: "Menu item 1", link: "/" },
  {
    id: 2,
    name: "Menu item 2",
    children: [
      { id: 3, name: "Submenu item 1", link: "/contact" },
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
</script>

<style lang="postcss">
.main-menu {
  .menu-item {
    @apply text-brand-gray;

    &.router-link-active,
    &.menu-item-active {
      @apply text-brand-black;
    }
  }
}
</style>
