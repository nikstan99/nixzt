<template>
  <div class="text-sm font-semibold">
    <label v-if="inputLabel" :for="inputId" class="block mb-2 text-brand-black">
      {{ inputLabel }}
    </label>
    <div class="relative">
      <div
        v-if="inputIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <UIIcon class="text-lg" :icon="inputIcon" />
      </div>
      <input
        v-focus="false"
        :type="inputType"
        :required="inputRequired"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :id="inputId"
        :class="[
          'bg-brand-light-gray border-2 border-brand-light-gray text-brand-black placeholder:text-brand-gray rounded-xl outline-none focus:border-brand-black transition-all w-full px-3 py-2',
          inputIcon ? 'pl-10' : '',
        ]"
        :placeholder="inputPlaceholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
export enum InputType {
  HIDDEN = "hidden",
  EMAIL = "email",
  NUMBER = "number",
  PASSWORD = "password",
  SEARCH = "search",
  TEL = "tel",
  TEXT = "text",
  URL = "url",
}
</script>

<script setup lang="ts">
interface Props {
  inputId: string;
  inputType: InputType;
  inputLabel?: string;
  inputRequired?: boolean;
  inputPlaceholder?: string;
  inputIcon?: string;
  modelValue: any;
}
const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);

// Custom "v-focus" directive
const vFocus = {
  mounted: (element: any) => element.focus(),
};
</script>
