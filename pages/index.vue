<template>
  <div class="container mx-auto">
    <h1 class="text-9xl">
      nixzt.
    </h1>
    <ul class="list-disc list-inside">
      <li v-for="post in response" :key="post.id">
        <sapn>{{ post.title.rendered }}</sapn>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: response } = useFetch(
  "http://nixzt.wpengine.com/wp-json/wp/v2/posts"
);
</script>
