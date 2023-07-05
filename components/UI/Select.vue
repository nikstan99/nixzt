<template>
  <UIDropdown class="w-full" :type="ButtonStyle.XLIGHT" :label="selectedItem.name">
    <UIInput
      v-focus
      input-id="selectInput"
      :input-type="InputType.TEXT"
      input-placeholder="type to search"
      v-model="selectedItem.name"
    />
    <div v-for="item in items" :key="item.id" class="px-3 py-2">
      <span @click="$emit('testing', item)">
        {{ item.name }}
      </span>
    </div>
  </UIDropdown>
</template>

<script lang="ts">
export type Item = {
  id: number;
  name: string;
};
</script>

<script setup lang="ts">
import {
  ButtonStyle,
  ButtonType,
  IconPosition,
} from "@/components/UI/Button.vue";
import { InputType } from "@/components/UI/Input.vue";

// Custom "v-focus" directive
const vFocus = {
  mounted: (element: any) => element.focus(),
};

interface Props {
  items: Item[];
  modelValue: any;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue", "testing"]);

const selectedItem = reactive<Item>(props.modelValue);
</script>
