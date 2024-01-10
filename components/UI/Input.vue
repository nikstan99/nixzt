<template>
  <div class="text-sm font-semibold">
    <UIInputLabel :text="inputLabel" :for-input="inputId" />
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

const baseInputClasses = "px-3 py-2 border rounded-xl";
export enum InputStyle {
  NONE = "bg-transparent text-current dark:placeholder:text-brand-light-gray p-0",
  LIGHT = `${baseInputClasses}
  bg-brand-light-gray/[.45]
  border-transparent
  text-brand-black
  dark:text-brand-white
  placeholder:text-brand-gray/50
  dark:placeholder:text-brand-light-gray/[.6]
  focus:border-brand-black
  focus-within:border-brand-black
  dark:focus:border-brand-white
  dark:focus-within:border-brand-white
  dark:focus:shadow-[0_0_0_0.25rem_rgba(255,255,255,0.25)]
  dark:focus-within:shadow-[0_0_0_0.25rem_rgba(255,255,255,0.25)]
  focus:shadow-[0_0_0_0.25rem_rgba(0,0,0,0.25)]
  focus-within:shadow-[0_0_0_0.25rem_rgba(0,0,0,0.25)]`,
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
