<template>
  <div class="flex items-center gap-8">
    <NuxtLink to="/">
      <h1 class="font-Caros font-extrabold text-4xl">
        nixzt<span class="text-brand-gray">.ui</span>
      </h1>
    </NuxtLink>
    <Menu class="main-menu" :menu-items="menuItems" />
  </div>
</template>

<script setup lang="ts">
const menuItems = reactive([
  { id: 1, name: "Home", link: "/" },
  {
    id: 2,
    name: "Browse",
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
