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
        v-focus="autoFocus"
        :type="inputType"
        :required="inputRequired"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :id="inputId"
        :class="[
          'outline-none transition-all w-full',
          inputIcon ? 'pl-10' : '',
          inputStyle,
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

const baseInputClasses = "px-3 py-2 border-2 rounded-xl";
export enum InputStyle {
  NONE = "bg-transparent text-current p-0",
  LIGHT = baseInputClasses + " " + "bg-brand-light-gray border-brand-light-gray text-brand-black placeholder:text-brand-gray focus:border-brand-black",
  DARK = baseInputClasses + " " + "bg-brand-black text-white",
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
  inputStyle?: InputStyle;
  modelValue: any;
  autoFocus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  autoFocus: false,
  inputStyle: InputStyle.LIGHT,
});

const emits = defineEmits(["update:modelValue"]);

// Custom "v-focus" directive
const vFocus = {
  mounted: (element: HTMLElement, binding: any) => {
    if (binding.value) element.focus();
  },
};
</script>
