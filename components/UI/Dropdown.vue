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
        :class="[
          activeDropdownContent ? 'fixed' : '',
          'h-full w-full top-0 left-0 right-0 bottom-0',
        ]"
        @click="toggleDropdown"
      >
        <Transition name="fade">
          <div
            v-show="activeDropdownContent"
            ref="dropdownContent"
            :class="[
              windowDropdownContentPositionY
                ? windowDropdownContentPositionY
                : contentPositionY,
              windowDropdownContentPositionX
                ? windowDropdownContentPositionX
                : contentPositionX,
              'dropdown-content fixed flex flex-col items-stretch rounded-xl h-[180px] bg-white drop-shadow select-none overflow-auto p-2',
            ]"
          >
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
export enum DropdownContentPositionY {
  NONE = "",
  TOP = "dropdown-top",
  BOTTOM = "dropdown-bottom",
}
export enum DropdownContentPositionX {
  NONE = "",
  LEFT = "dropdown-left",
  RIGHT = "dropdown-right",
}
</script>

<script setup lang="ts">
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";

// Props
interface Props {
  type: ButtonType;
  label: string;
  contentPositionY?: DropdownContentPositionY;
  contentPositionX?: DropdownContentPositionX;
}
const props = withDefaults(defineProps<Props>(), {
  contentPositionY: DropdownContentPositionY.BOTTOM,
  contentPositionX: DropdownContentPositionX.LEFT,
});

// Data (ref)
const dropdownButton = ref<any>(null);
const dropdownContent = ref<any>(null);
const activeDropdownContent = ref<boolean>(false);
let dropdownContentCssPosition = reactive<any>({});
let dropdownContentCssProperties = reactive<any>({});
const windowDropdownContentPositionX = ref<DropdownContentPositionX>(
  DropdownContentPositionX.NONE
);
const windowDropdownContentPositionY = ref<DropdownContentPositionY>(
  DropdownContentPositionY.NONE
);

// Make better keyboard navigation
// When component is mounted
onMounted(() => window.addEventListener("resize", test));
onUnmounted(() => window.removeEventListener("resize", test));

// Methods / functions
const toggleDropdown = (event: any) => {
  if (!event.target.closest(".dropdown-content")) {
    activeDropdownContent.value = !activeDropdownContent.value;

    test();
  }
};

// Todo FIX TEST !!!

const test = async () => {
  await nextTick(() => {
    setCssPositionOnDropdownContent(
      getBoundingClientRectOfElement(dropdownButton.value.$el),
      dropdownContentCssPosition
    );
    setCssPositionOnDropdownContent(
      getBoundingClientRectOfElement(dropdownContent.value),
      dropdownContentCssProperties
    );
  })
};

const getBoundingClientRectOfElement = (domElement: any) =>
  domElement.getBoundingClientRect();

const setCssPositionOnDropdownContent = (rect: any, cssProperties: object) => {
  for (const key in rect) {
    if (typeof rect[key] !== "function") {
      Object.assign(cssProperties, { [key]: `${rect[key]}px` });
    }
  }
  bleedingDropdwonContent();
};

const bleedingDropdwonContent = () => {
  const rect = getBoundingClientRectOfElement(dropdownButton.value.$el);

  windowDropdownContentPositionX.value = DropdownContentPositionX.NONE;
  windowDropdownContentPositionY.value = DropdownContentPositionY.NONE;

  if (dropdownContent.value.offsetHeight > window.innerHeight - rect.bottom) {
    windowDropdownContentPositionY.value = DropdownContentPositionY.TOP;
  }

  if (dropdownContent.value.offsetHeight > rect.top) {
    windowDropdownContentPositionY.value = DropdownContentPositionY.BOTTOM;
  }

  if (dropdownContent.value.offsetWidth > window.innerWidth - rect.right) {
    windowDropdownContentPositionX.value = DropdownContentPositionX.RIGHT;
  }

  if (dropdownContent.value.offsetWidth > rect.right) {
    windowDropdownContentPositionX.value = DropdownContentPositionX.LEFT;
  }
};

watch(activeDropdownContent, () => {
  useHead({
    bodyAttrs: {
      class: activeDropdownContent.value ? "overflow-y-hidden" : "",
    },
  });
});
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
  top: calc(
    v-bind("dropdownContentCssPosition.top") - var(--offset) -
      v-bind("dropdownContentCssProperties.height")
  );
}
.dropdown-left {
  left: v-bind("dropdownContentCssPosition.left");
}
.dropdown-bottom {
  top: calc(v-bind("dropdownContentCssPosition.bottom") + var(--offset));
}
.dropdown-right {
  left: calc(
    v-bind("dropdownContentCssPosition.right") -
      v-bind("dropdownContentCssProperties.width")
  );
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
