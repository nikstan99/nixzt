<template>
  <div class="container mx-auto">
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
      <UIInput />
      
      <UIButton
        :buttonType="ButtonType.NONE"
        icon="plus"
        class="text-brand-gray font-thin"
      >
        Add filter
      </UIButton>
      <UIButton
        @click="useRouter().push('/about')"
        :buttonType="ButtonType.DARK"
      >
        Log in or sign up
      </UIButton>
      <UIButton :buttonType="ButtonType.LIGHT" icon="bars-filter">
        Filters
      </UIButton>
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

const { data: response } = useFetch<any>(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);
</script>
