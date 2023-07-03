<template>
  <component
    :class="[
      'menu-item',
      isMenuItemActive ? 'menu-item-active' : '',
      menuItem.targetBlank ? 'flex justify-between' : '',
    ]"
    :is="menuItemChildren ? UIDropdown : UIButton"
    :link="menuItemChildren ? false : true"
    :to="menuItem.link"
    :target="menuItem.targetBlank ? '_blank' : '_self'"
    :icon="menuItem.targetBlank ? 'arrow-up-right' : ''"
    :icon-position="IconPosition.RIGHT"
    :buttonType="menuItemType"
    :type="menuItemType"
    :content-position-x="menuItemChildrenPosition"
    :label="menuItem.name"
  >
    <template v-if="menuItemChildren">
      <MenuItem
        v-for="menuItem in menuItemChildren"
        :key="menuItem.id"
        :menu-item="menuItem"
        :menu-item-children="menuItem.children"
        :menuItemType="ButtonType.NONE"
      />
    </template>
    <template v-else>
      {{ menuItem.name }}
    </template>
  </component>
</template>

<script setup lang="ts">
// Dynamic CUSTOM Components
import UIButton from "@/components/UI/Button.vue";
import UIDropdown from "@/components/UI/Dropdown.vue";
// Enums from components
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";
import {
  DropdownContentPositionX,
  DropdownContentPositionY,
} from "@/components/UI/Dropdown.vue";

interface Props {
  menuItem: any | object;
  menuItemChildren?: any | object | object[];
  menuItemType?: ButtonType;
  menuItemChildrenPosition?: DropdownContentPositionX;
}
const props = withDefaults(defineProps<Props>(), {
  menuItemType: ButtonType.NONE,
  menuItemChildrenPosition: DropdownContentPositionX.LEFT,
});

const isMenuItemActive = computed<boolean>(() => {
  if (props.menuItemChildren)
    return props.menuItemChildren.find(
      (item: any) => useRoute().path === item.link
    );
});
</script>
