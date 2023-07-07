<template>
  <div class="text-sm font-semibold">
    <span
      v-if="label"
      @click.stop="toggleDropdown"
      class="block mb-2 text-brand-black"
    >
      {{ label }}
    </span>
    <UIDropdown
      ref="uiDropdown"
      :id="selectId"
      class="w-full"
      :dropdown-width="DropdownWidth.FULL"
      :type="activeSearch ? ButtonStyle.XLIGHT : ButtonStyle.LIGHT"
      :label="modelValue"
      :slot-toggle="activeSearch"
      @active="activeSearch = !activeSearch"
      @transition-end="resetSearchResults"
    >
      <template #toggle>
        <UIInput
          class="select-search w-full"
          auto-focus
          :input-id="selectId"
          :input-type="InputType.TEXT"
          input-placeholder="Type to search"
          :input-style="InputStyle.NONE"
          v-model="search"
          @keyup="setSearchResults"
          @click.stop
        />
      </template>
      <UIButton
        v-for="item in searchResults"
        :key="item.id"
        :button-style="ButtonStyle.NONE"
        class="px-3 py-2"
        @click.stop="(event) => selectItem(event, item)"
      >
        {{ item.name }}
      </UIButton>
    </UIDropdown>
  </div>
</template>

<script lang="ts">
export type Item = {
  id: number;
  name: string;
  placeholder?: boolean;
};
</script>

<script setup lang="ts">
import {
  ButtonStyle,
  ButtonType,
  IconPosition,
} from "@/components/UI/Button.vue";
import { DropdownWidth } from "@/components/UI/Dropdown.vue";
import { InputType, InputStyle } from "@/components/UI/Input.vue";
// Props
interface Props {
  selectId: string;
  items: Item[];
  label?: string;
  modelValue: any;
}
const props = defineProps<Props>();
// Emits
const emits = defineEmits(["update:modelValue", "selectItem"]);
// Refs
const uiDropdown = ref<any>();
const activeSearch = ref<boolean>(false);
const search = ref<string>("");
const searchResults = ref<Item[]>(props.items);
// Methods
const setSearchResults = () => {
  searchResults.value = props.items.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
};
const resetSearchResults = () => {
  search.value = "";
  searchResults.value = props.items;
}
const toggleDropdown = (event: MouseEvent, force?: boolean) => {
  if (!(event.target as Element).classList.contains("select-search"))
    uiDropdown.value.toggleDropdown(event, force);
};
const selectItem = (event: MouseEvent, item: Item) => {
  emits("selectItem", item);
  toggleDropdown(event, true);
};
</script>
