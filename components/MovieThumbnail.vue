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

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

// .movie-thumbnail {
//   position: relative;
//   border-radius: 5px;
//   transition: transform 0.3s ease;
//   text-align: center;
//   cursor: pointer;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     border-radius: 5px;
//     transition: .5s ease-in-out;

//     &:hover {
//       transform: scale(1.05);
//       transition: .5s ease-in-out;
//       box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
//     }
//   }

//   .thumbnail-overlay {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, .4);
//     transform: translateY(-100%);
//     transition: .5s ease-in-out;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   &:hover {
//     .thumbnail-overlay {
//       transform: translateY(0);
//       transition: .5s ease-in-out;
//     }
//   }
// }
</style>
