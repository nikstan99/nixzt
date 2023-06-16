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
    <UIButton :type="ButtonType.DARK" icon="figma" :icon-type="IconType.BRANDS">fdfsffdfsd</UIButton>
    <Transition name="fade">
      <NuxtLink to="/about">tetsing</NuxtLink>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ButtonType } from "@/components/UI/Button.vue";
import { IconType } from "@/components/UI/Icon.vue";


const { data: response } = useFetch(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);
</script>
