<template>
  <div class="flex items-center gap-4">
    <ClientOnly>
      <Teleport :to="authButtons" :disabled="width > Number(screenSizes.lg)">
        <UIButton
          @click.stop="onAuthBtnClick"
          :button-style="ButtonStyle.DARK"
          class="justify-center"
        >
          Log in or sign up
        </UIButton>
      </Teleport>
    </ClientOnly>
    <UIDropdown
      ref="uiDropdown"
      class="self-end"
      :type="ButtonStyle.XLIGHT"
      :content-position-x="DropdownContentPositionX.RIGHT"
      icon="equals"
      :rotate-icon="false"
    >
      <div
        class="w-[230px] divide-y divide-brand-gray/25 dark:divide-brand-gray/50"
      >
        <div
          ref="authButtons"
          :hidden="!authButtons?.childElementCount"
          :class="[
            'flex flex-col pb-4',
            !authButtons?.childElementCount && 'hidden',
          ]"
        ></div>
        <div :class="['grid grid-cols-3 gap-x-2 px-2 py-4']">
          <ClientOnly>
            <SiteColorMode
              v-for="(colorMode, index) in colorModes"
              :key="index"
              @click.stop="() => (useColorMode().preference = colorMode)"
              :color-mode="colorMode"
              :active="useColorMode().preference === colorMode"
            />
          </ClientOnly>
        </div>
        <Menu
          :menu-items="dropdownMenuItems"
          @click.stop="(event: MouseEvent) => uiDropdown?.toggleDropdown(event, uiDropdown?.active)"
          class="py-2 flex-col"
        />
        <Menu
          :menu-items="dropdownMiscMenuItems"
          :menu-item-type="ButtonStyle.NONE"
          @click.stop="(event: MouseEvent) => uiDropdown?.toggleDropdown(event, uiDropdown?.active)"
          class="gap-3 p-3 mt-1 pb-1 text-xs text-brand-gray"
        />
      </div>
    </UIDropdown>
  </div>
</template>

<script setup lang="ts">
  import { ButtonStyle } from '@/components/UI/Button.vue';
  import type { MenuItem } from '@/components/Menu/index.vue';
  import { type Mode, Color } from '@/components/Site/ColorMode/Color.vue';
  import {
    DropdownContentPositionX,
    DropdownContentPositionY,
  } from '@/components/UI/Dropdown.vue';
  import type { UiDropdown } from '#build/components';
  const { width, screenSizes } = useBreakpoints();

  const colorModes = reactive<Mode[]>([Color.LIGHT, Color.DARK, Color.SYSTEM]);
  const dropdownMenuItems = reactive<MenuItem[]>([
    { id: 1, name: 'Features', link: '/contact' },
    { id: 2, name: 'Pricing', link: '/about' },
    { id: 3, name: 'About', link: '/about' },
    { id: 4, name: 'Changelog', link: '/contact', targetBlank: true },
    { id: 5, name: 'Careers', link: '/careers', targetBlank: true },
    { id: 6, name: 'Help & Support', link: '/faq', targetBlank: true },
  ]);
  const dropdownMiscMenuItems = reactive<MenuItem[]>([
    { id: 1, name: 'Privacy', link: '/privacy' },
    { id: 2, name: 'Terms', link: '/terms' },
    { id: 3, name: 'Copyright', link: '/copyright' },
  ]);

  const uiDropdown = ref<typeof UiDropdown>();
  const authButtons = ref<HTMLElement>();

  const onAuthBtnClick = (event: MouseEvent) => {
    useRouter().push('/about');
    uiDropdown.value?.toggleDropdown(event, uiDropdown.value?.active);
  };
</script>
