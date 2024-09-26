<template>
  <div class="movie-thumbnail" @click="$emit('click')" @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')" role="button" :tabindex="0" :aria-label="`View details for ${movie.Title}`">
    <img :src="posterUrl" :alt="`Poster of ${movie.Title}`" />
    <div class="thumbnail-overlay">
      <h3 class="text-white">{{ movie.Title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  movie: {
    imdbID: string;
    Title: string;
    Poster: string;
  };
}>();

const posterUrl = computed(() => {
  return props.movie.Poster !== "N/A" ? props.movie.Poster : "/placeholder.jpg";
});
</script>
