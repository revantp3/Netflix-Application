<template>
  <div>
    <h2>Store Tester</h2>
    <button @click="testStore">Add Test Movie</button>
    <div v-if="movie">
      <h3>{{ movie?.Title }}</h3>
      <p>{{ movie?.Year }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";
import { ref } from "vue";

const store = useMoviesStore();

const testMovie = {
  imdbID: "tt1234567",
  Title: "Test Movie",
  Year: "2021",
  Poster: "N/A",
};

const movie = ref(store.getMovie("tt1234567"));

function testStore() {
  store.addMovie(testMovie);
  movie.value = store.getMovie("tt1234567");
}
</script>

<style scoped>
h2 {
  color: #2c3e50;
}
</style>
