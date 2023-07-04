<template>
  <div class="flex items-center gap-4">
    <UIButton @click="useRouter().push('/about')" :button-style="ButtonStyle.DARK">
      Log in or sign up
    </UIButton>
    <UIDropdown
      class="self-end"
      :type="ButtonStyle.NONE"
      :content-position-x="DropdownContentPositionX.RIGHT"
      icon="bars"
      :rotate-icon="false"
    >
      <div class="w-[230px] divide-y">
        <Menu :menu-items="dropdownMenuItems" class="flex-col" />
        <div class="flex gap-1 p-3 mt-1 pb-1 text-xs text-brand-gray">
          <span> Privacy </span>
          <span> Terms </span>
          <span> Copyright </span>
        </div>
      </div>
    </UIDropdown>
  </div>
</template>

<script setup lang="ts">
import { ButtonStyle, IconPosition } from "@/components/UI/Button.vue";
import {
  DropdownContentPositionX,
  DropdownContentPositionY,
} from "@/components/UI/Dropdown.vue";

const dropdownMenuItems = reactive([
  { id: 1, name: "Features", link: "/contact" },
  { id: 2, name: "Pricing", link: "/about" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Changelog", link: "/contact", targetBlank: true },
  { id: 5, name: "Careers", link: "/careers", targetBlank: true },
  { id: 6, name: "Help & Support", link: "/faq", targetBlank: true },
]);
</script>
