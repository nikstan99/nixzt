<template>
  <div class="container mx-auto">
    <h1 class="font-Caros font-extrabold text-9xl">
      nixzt<span class="text-brand-gray">.</span>
    </h1>
    <div class="flex flex-col items-start gap-3 text-sm">
      <div class="flex gap-2">
        <UIButton :type="ButtonType.NONE"> Menu Item 1 </UIButton>
        <UIButton
          :type="ButtonType.NONE"
          icon="angle-down"
          :icon-position="IconPosition.RIGHT"
        >
          Menu Item 2
        </UIButton>
        <UIButton :type="ButtonType.NONE"> Menu Item 3 </UIButton>
      </div>
      <UIButton
        :type="ButtonType.NONE"
        icon="plus"
        class="text-brand-gray font-thin"
      >
        Add filter
      </UIButton>
      <UIButton @click="useRouter().push('/about')" :type="ButtonType.DARK">
        Log in or sign up
      </UIButton>
      <UIButton :type="ButtonType.LIGHT" icon="bars-filter"> Filters </UIButton>
      <UIDropdown
        :type="ButtonType.XLIGHT"
        label="test"
        :content-position="DropdownContentPosition.BOTTOM_LEFT"
      >
        <ul class="list-disc list-inside">
          <li v-for="post in response" :key="post.id">
            <span>{{ post.title.rendered }}</span>
          </li>
        </ul>
      </UIDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";
import { DropdownContentPosition } from "@/components/UI/Dropdown.vue";
// import { IconType } from "@/components/UI/Icon.vue";

const { data: response } = useFetch<any>(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);
</script>
