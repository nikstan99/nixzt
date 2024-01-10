<template>
  <div class="text-sm font-semibold">
    <UIInputLabel :text="label" @click.stop="toggleDropdown" />
    <UIDropdown
      ref="uiDropdown"
      :id="selectId"
      class="w-full"
      :button-class="!selected && 'text-brand-gray/50 dark:text-brand-gray/[.6]'"
      :dropdown-width="DropdownWidth.FULL"
      :type="InputStyle.LIGHT"
      :label="selected ? selected : placeholder"
      :slot-toggle="searchable ? activeSearch : false"
      @active="(active: boolean) => activeSearch = active"
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
        class="text-brand-black dark:text-brand-white"
        @click.stop="(event: MouseEvent) => selectItem(event, item)"
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
  import type { UiDropdown } from '#build/components';
import {
    ButtonStyle,
    ButtonType,
    IconPosition,
  } from '@/components/UI/Button.vue';
  import { DropdownWidth } from '@/components/UI/Dropdown.vue';
  import { InputType, InputStyle } from '@/components/UI/Input.vue';
  // Props
  interface Props {
    selectId: string;
    items: Item[];
    placeholder?: string;
    selected: string;
    searchable?: boolean;
    label?: string;
    modelValue: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    searchable: true,
  });
  // Emits
  const emits = defineEmits(['update:modelValue', 'selectItem']);
  // Refs
  const uiDropdown = ref<typeof UiDropdown>();
  const activeSearch = ref<boolean>(false);
  const search = ref<string>('');
  const searchResults = ref<Item[]>(props.items);
  // Methods
  const setSearchResults = () => {
    searchResults.value = props.items.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    );
  };
  const resetSearchResults = () => {
    search.value = '';
    searchResults.value = props.items;
  };
  const toggleDropdown = (event: MouseEvent, force?: boolean) => {
    if (!(event.target as Element).classList.contains('select-search'))
      uiDropdown.value?.toggleDropdown(event, force);
  };
  const selectItem = (event: MouseEvent, item: Item) => {
    emits('selectItem', item);
    toggleDropdown(event, true);
  };
</script>
