<template>
  <div
    style="
      background-image: url('/img/bg-gradient.svg');
      background-size: contain;
      background-repeat: no-repeat;
      /* background-position: right; */
    "
  >
    <div class="container mx-auto">
      <ul class="list-disc list-inside">
        <li v-for="post in response" :key="post.id">
          <span>{{ post.title.rendered }}</span>
        </li>
      </ul>
      <div class="flex flex-col justify-items-end items-start gap-3 text-sm">
        <UIDropdown :type="ButtonStyle.XLIGHT" label="test">
          <ul class="list-disc list-inside">
            <li v-for="post in response" :key="post.id">
              <span>{{ post.title.rendered }}</span>
            </li>
          </ul>
        </UIDropdown>
        <form @submit.prevent="console.log(testInput)">
          <UIInput
            v-model="testInput"
            input-id="one"
            :input-type="InputType.TEXT"
            input-label="Email"
            input-placeholder="example@email.com"
            input-icon="envelope"
            class="w-[300px]"
          />
          <UIButton
            :button-style="ButtonStyle.DARK"
            :button-type="ButtonType.SUBMIT"
          >
            Submit
          </UIButton>
        </form>

        <UIButton
          :button-style="ButtonStyle.NONE"
          icon="plus"
          class="text-brand-gray font-thin"
        >
          Add filter
        </UIButton>
        <UIButton :button-style="ButtonStyle.LIGHT" icon="bars-filter">
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
  </div>
</template>

<script setup lang="ts">
import {
  ButtonStyle,
  ButtonType,
  IconPosition,
} from "@/components/UI/Button.vue";
import { InputType } from "@/components/UI/Input.vue";

const { data: response } = useFetch<any>(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);

const testInput = ref<number>(748);
</script>
