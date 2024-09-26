<template>
  <div>
    <div class="d-flex justify-content-between align-items-center py-3">
      <NuxtLink to="/" aria-label="Back to Home" class="btn-link d-inline-block">← Back to Home</NuxtLink>
      <ThemeToggle />
    </div>

    <main >
      <div class="loader-container" role="status" aria-live="polite" v-if="isLoading" >
        <div class="loader"></div>
      </div>
      <div class="loader-container flex-column" v-else-if="hasError">
        <h2>
          Sorry, we couldn't load the movies. Please try again later.
        </h2>
        <img src="../assets/images/not-found-emoji.png" alt="Not found" class="img-not-found">
      </div>

      <div v-else>
        <div class="d-flex card">
          <div class="poster-wrapper">
            <img :src="posterUrl" :alt="`Poster of ${movie.Title}`" />
          </div>
          <div class="info">
            <h1 class="fs-40 text-center my-0">{{ movie.Title }}</h1>
            <p class="plot">{{ movie.Plot }}</p>
            <p><strong>Actors:</strong> {{ movie.Actors }}</p>
            <p><strong>IMDb Rating:</strong> {{ movie.imdbRating }}</p>
            <p><strong>Genre:</strong> {{ movie.Genre }}</p>
            <p><strong>Director:</strong> {{ movie.Director }}</p>
            <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "../../stores/movies";

const route = useRoute();
const store = useMoviesStore();

const imdbID = ref(route.params.id as string);
const movie = ref<any>(null);
const isLoading = ref(true);
const hasError = ref(false);

const posterUrl = computed(() => {
  return movie.value && movie.value.Poster !== "N/A"
    ? movie.value.Poster
    : "/placeholder.jpg";
});

async function loadMovieDetails(id: string) {
  isLoading.value = true;
  hasError.value = false;
  movie.value = null;

  try {
    // Check if the movie is already in the store
    const existingMovie = store.getMovie(id);
    if (existingMovie) {
      // Use the existing movie data from the store
      movie.value = existingMovie;
    } else {
      // Fetch movie data using the store's fetchMovie method
      const fetchedMovie = await store.fetchMovie(id);
      if (fetchedMovie) {
        movie.value = fetchedMovie;
      } else {
        hasError.value = true;
      }
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadMovieDetails(imdbID.value);
});

// Watch for changes in the route parameters
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      imdbID.value = newId as string;
      loadMovieDetails(imdbID.value);
    }
  }
);
</script>