<template>
  <div :class="['dropdown', activeDropdownContent ? 'active' : '']">
    <UIButton
      ref="dropdownButton"
      :type="type"
      icon="angle-down"
      :icon-position="IconPosition.RIGHT"
      @click="toggleDropdown"
    >
      {{ label }}
    </UIButton>
    <Teleport to="body">
      <div
        v-if="activeDropdownContent"
        class="fixed h-full w-full"
        @click="toggleDropdown"
      >
        <div
          :class="[
            contentPosition,
            'dropdown-content fixed flex flex-col items-stretch rounded-xl h-[180px] bg-white drop-shadow-lg select-none overflow-auto p-2',
          ]"
        >
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
export enum DropdownContentPosition {
  TOP_LEFT = "dropdown-top dropdown-left",
  TOP_RIGHT = "dropdown-top dropdown-right",
  BOTTOM_LEFT = "dropdown-bottom dropdown-left",
  BOTTOM_RIGHT = "dropdown-bottom dropdown-right",
}
</script>

<script setup lang="ts">
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";

// Props
interface Props {
  type: ButtonType;
  label: string;
  contentPosition?: DropdownContentPosition;
}
const props = withDefaults(defineProps<Props>(), {
  contentPosition: DropdownContentPosition.BOTTOM_RIGHT,
});

// Data (ref)
const dropdownButton = ref<any>(null);
const activeDropdownContent = ref<boolean>(false);
let dropdownContentPosition = reactive<any>({});

// When component is mounted
onMounted(() => {

  // Have a look into why getBoundingClientRect() isn't ready when changing routes/pages!!!
  // Make better keyboard navigation
  setTimeout(() => {
    console.log(dropdownButton.value.$el.getBoundingClientRect());
  }, 1000)
  
  const rect = dropdownButton.value.$el.getBoundingClientRect();
  for (const key in rect) {
    if (typeof rect[key] !== "function") {
      Object.assign(dropdownContentPosition, { [key]: `${rect[key]}px` });
    }
  }
});

// Methods / functions
const toggleDropdown = (event: any) => {
  if (!event.target.closest(".dropdown-content")) {
    activeDropdownContent.value = !activeDropdownContent.value;
  }
};
</script>

<style lang="postcss" scoped>
.dropdown-content {
  --offset: 10px;
}

.dropdown-content::-webkit-scrollbar {
  @apply w-[5px];
}

.dropdown-content::-webkit-scrollbar-thumb {
  @apply rounded-full bg-brand-light-gray;
}

.dropdown-top {
  top: calc(v-bind("dropdownContentPosition.top") - var(--offset));
  @apply -translate-y-full;
}
.dropdown-left {
  left: v-bind("dropdownContentPosition.left");
}
.dropdown-bottom {
  top: calc(v-bind("dropdownContentPosition.bottom") + var(--offset));
}
.dropdown-right {
  left: v-bind("dropdownContentPosition.right");
  @apply -translate-x-full;
}
</style>

<style lang="postcss">
.dropdown .icon i {
  @apply transition-all;
}
.dropdown.active .icon i {
  @apply rotate-180;
}
</style>
