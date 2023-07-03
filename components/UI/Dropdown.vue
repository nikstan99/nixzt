<template>
  <div
    :class="[
      'dropdown',
      activeDropdownContent ? 'active' : '',
      rotateIcon ? 'rotate' : '',
    ]"
  >
    <UIButton
      ref="dropdownButton"
      :button-type="type"
      :icon="icon"
      :icon-position="IconPosition.RIGHT"
      @click="toggleDropdown"
    >
      {{ label }}
    </UIButton>
    <!-- <Teleport to="body"> -->
    <Transition name="fade">
      <div
        :class="[
          activeDropdownContent ? 'fixed' : '',
          'h-full w-full top-0 left-0 right-0 bottom-0',
        ]"
        @click="toggleDropdown"
        v-show="activeDropdownContent"
      >
        <div
          ref="dropdownContent"
          :class="[
            windowDropdownContentPositionY
              ? windowDropdownContentPositionY
              : contentPositionY,
            windowDropdownContentPositionX
              ? windowDropdownContentPositionX
              : contentPositionX,
            'dropdown-content fixed flex flex-col items-stretch rounded-xl bg-white drop-shadow overflow-auto p-2',
          ]"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
    <!-- </Teleport> -->
  </div>
</template>

<script lang="ts">
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";
export enum DropdownContentPositionY {
  NONE = "",
  TOP = "dropdown-top",
  BOTTOM = "dropdown-bottom",
  TOP_NO_BLEED = "dropdown-top top-[var(--offset)]",
  BOTTOM_NO_BLEED = "dropdown-bottom bottom-[var(--offset)]",
}
export enum DropdownContentPositionX {
  NONE = "",
  LEFT = "dropdown-left",
  RIGHT = "dropdown-right",
  LEFT_NO_BLEED = "dropdown-left right-[var(--offset)]",
  RIGHT_NO_BLEED = "dropdown-right left-[var(--offset)]",
}
</script>

<script setup lang="ts">
// TODO  Make better keyboard navigation

// Props
interface Props {
  type: ButtonType;
  label?: string;
  icon?: string;
  rotateIcon?: boolean;
  contentPositionY?: DropdownContentPositionY;
  contentPositionX?: DropdownContentPositionX;
}
const props = withDefaults(defineProps<Props>(), {
  contentPositionY: DropdownContentPositionY.BOTTOM,
  contentPositionX: DropdownContentPositionX.LEFT,
  icon: "angle-down",
  rotateIcon: true,
});

// Data (ref)
const dropdownButton = ref<any>(null);
const dropdownContent = ref<any>(null);
const activeDropdownContent = ref<boolean>(false);
let dropdownContentCssPosition = reactive<any>({});
let dropdownContentCssProperties = reactive<any>({});
let dropdownContentPositionOffset = ref<number>(10);
let dropdownContentCssPositionOffset = ref<string>(
  dropdownContentPositionOffset.value + "px"
);

const windowDropdownContentPositionX = ref<DropdownContentPositionX>(
  DropdownContentPositionX.NONE
);
const windowDropdownContentPositionY = ref<DropdownContentPositionY>(
  DropdownContentPositionY.NONE
);

onMounted(() => window.addEventListener("resize", eventListener));
onUnmounted(() => window.removeEventListener("resize", eventListener));

// Methods / functions
const toggleDropdown = (event: any) => {
  if (!event.target.closest(".dropdown-content")) {
    activeDropdownContent.value = !activeDropdownContent.value;
    eventListener();
  }
};

const eventListener = () => {
  nextTick(() => {
    setCssPositionOnDropdownContent(
      getBoundingClientRectOfElement(dropdownButton.value.$el),
      dropdownContentCssPosition
    );
    setCssPositionOnDropdownContent(
      getBoundingClientRectOfElement(dropdownContent.value),
      dropdownContentCssProperties
    );
  });
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

  const top = rect.top - dropdownContentPositionOffset.value;
  const bottom =
    window.innerHeight - rect.bottom - dropdownContentPositionOffset.value;
  const left = rect.left - dropdownContentPositionOffset.value;
  const right =
    window.innerWidth - rect.right - dropdownContentPositionOffset.value;

  if (dropdownContent.value.offsetHeight > bottom)
    windowDropdownContentPositionY.value = DropdownContentPositionY.TOP;

  if (dropdownContent.value.offsetHeight > top)
    windowDropdownContentPositionY.value = DropdownContentPositionY.BOTTOM;

  if (
    dropdownContent.value.offsetHeight > bottom &&
    dropdownContent.value.offsetHeight > top
  ) {
    if (top > bottom) {
      windowDropdownContentPositionY.value =
        DropdownContentPositionY.TOP_NO_BLEED;
    } else {
      windowDropdownContentPositionY.value =
        DropdownContentPositionY.BOTTOM_NO_BLEED;
    }
  }

  if (dropdownContent.value.offsetWidth > left)
    windowDropdownContentPositionX.value = DropdownContentPositionX.LEFT;

  if (dropdownContent.value.offsetWidth > right)
    windowDropdownContentPositionX.value = DropdownContentPositionX.RIGHT;

  if (
    dropdownContent.value.offsetWidth > left &&
    dropdownContent.value.offsetWidth > right
  ) {
    if (left > right) {
      windowDropdownContentPositionX.value =
        DropdownContentPositionX.RIGHT_NO_BLEED;
    } else {
      windowDropdownContentPositionX.value =
        DropdownContentPositionX.LEFT_NO_BLEED;
    }
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
.another-test {
  z-index: -999;
  visibility: hidden;
  opacity: 0;
}

.dropdown-content {
  --offset: v-bind("dropdownContentCssPositionOffset");
}

.dropdown-content::-webkit-scrollbar {
  @apply w-[5px];
}

.dropdown-content::-webkit-scrollbar-thumb {
  @apply rounded-full bg-brand-light-gray;
}

.dropdown-top {
  bottom: calc(100% - v-bind("dropdownContentCssPosition.top") + var(--offset));
}
.dropdown-left {
  left: v-bind("dropdownContentCssPosition.left");
}
.dropdown-bottom {
  top: calc(v-bind("dropdownContentCssPosition.bottom") + var(--offset));
}
.dropdown-right {
  right: calc(100% - v-bind("dropdownContentCssPosition.right"));
}
</style>

<style lang="postcss">
.dropdown.rotate .icon i {
  @apply transition-all;
}
.dropdown.rotate.active .icon i {
  @apply rotate-180;
}
</style>
