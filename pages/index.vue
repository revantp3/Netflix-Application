<template>
  <div class="toggle-modes">
    <ThemeToggle />
  </div>
  <div class="home-page">
    <main>
      <div class="loader-container" v-if="isLoading">
        <div class="loader"></div>
      </div>
      <div class="loader-container flex-column" v-else-if="hasError">
        <h2>Sorry, we couldn't load the movies. Please try again later.</h2>
        <img
          src="../assets/images/not-found-emoji.png"
          alt="Not found"
          class="img-not-found"
        />
      </div>

      <div v-else>
        <section class="mb-3">
          <div class="d-flex justify-content-between">
            <h1 v-if="!isLoading" class="sub-heading">Trending Now</h1>
          </div>
          <div class="movie-list">
            <MovieThumbnail
              v-for="movie in movies"
              :key="movie.imdbID"
              :movie="movie"
              @click="goToMovieDetails(movie.imdbID)"
            />
          </div>
        </section>
        <section>
          <h1 v-if="!isLoading" class="sub-heading">Latest Episodes</h1>
          <div class="movie-list">
            <MovieThumbnail
              v-for="movie in movies"
              :key="movie.imdbID"
              :movie="movie"
              @click="goToMovieDetails(movie.imdbID)"
            />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MovieThumbnail from "~/components/MovieThumbnail.vue";
import { useRouter } from "vue-router";
import { useMoviesStore } from "~/stores/movies";
import ThemeToggle from "~/components/ThemeToggle.vue";

const router = useRouter();
const store = useMoviesStore();
const movies = ref([]) as any;
const isLoading = ref(true);
const hasError = ref(false);
const theme = ref("light");

function goToMovieDetails(imdbID: string) {
  router.push(`/movie/${imdbID}`);
}

onMounted(async () => {
  try {
    const movieIDs = [
      "tt0111161",
      "tt0068646",
      "tt0071562",
      "tt0468569",
      "tt0050083",
    ];
    const fetchedMovies = [];

    for (const id of movieIDs) {
      const movie = await store.fetchMovie(id);
      if (movie) {
        fetchedMovies.push(movie);
      } else {
        console.error(`Failed to fetch data for IMDb ID: ${id}`);
      }
    }
    movies.value = fetchedMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
