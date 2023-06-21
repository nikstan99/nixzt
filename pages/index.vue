<template>
  <div class="container mx-auto">
    <h1 class="font-Caros font-extrabold text-9xl">
      nixzt<span class="text-brand-gray">.</span>
    </h1>
    <ul class="list-disc list-inside">
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
    </ul>
    <div class="flex flex-col justify-items-end items-start gap-3 text-sm">
      <UIDropdown :type="ButtonType.XLIGHT" label="test">
        <ul class="list-disc list-inside">
          <li v-for="post in response" :key="post.id">
            <span>{{ post.title.rendered }}</span>
          </li>
        </ul>
      </UIDropdown>
      <UIDropdown
        class="self-end"
        :type="ButtonType.NONE"
        :content-position-x="DropdownContentPositionX.RIGHT"
        icon="bars"
        :rotate-icon="false"
      >
        <ul class="w-[200px] h-[200px] list-disc list-inside">
          <li v-for="post in response" :key="post.id">
            <span>{{ post.title.rendered }}</span>
          </li>
        </ul>
      </UIDropdown>
      <UIInput />
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
    </div>
    <!-- <ul class="list-disc list-inside">
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
      <li v-for="post in response" :key="post.id">
        <span>{{ post.title.rendered }}</span>
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { ButtonType, IconPosition } from "@/components/UI/Button.vue";
import {
  DropdownContentPositionX,
  DropdownContentPositionY,
} from "@/components/UI/Dropdown.vue";
// import { IconType } from "@/components/UI/Icon.vue";

const { data: response } = useFetch<any>(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);
</script>
