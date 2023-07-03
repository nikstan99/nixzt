<template>
  <component
    class="menu-item"
    :is="menuItemChildren ? UIDropdown : UIButton"
    :link="menuItemChildren ? false : true"
    :to="menuItem.link"
    :buttonType="menuItemType"
    :type="menuItemType"
    :content-position-x="menuItemChildrenPosition"
    :label="menuItem.name"
  >
    <template v-if="menuItemChildren">
      <UIMenuItem
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
import UIButton from "../Button.vue";
import UIDropdown from "../Dropdown.vue";
// Enums from components
import { ButtonType, IconPosition } from "../Button.vue";
import {
  DropdownContentPositionX,
  DropdownContentPositionY,
} from "../Dropdown.vue";

interface Props {
  menuItem: any | object;
  menuItemChildren?: any | object | object[];
  menuItemType?: ButtonType;
  menuItemChildrenPosition: DropdownContentPositionX
}
const props = withDefaults(defineProps<Props>(), {
  menuItemType: ButtonType.NONE,
  menuItemChildrenPosition: DropdownContentPositionX.LEFT
});
</script>