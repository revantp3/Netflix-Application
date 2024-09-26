<template>
  <h2 class="main-heading" v-if="!isMovieList">List of Movies</h2>
  <div class="theme-toggle-wrapper">
    <button
      @click="toggleTheme"
      class="theme-toggle cursor-pointer"
      :title="
        theme === 'light' ? 'Toggle to Dark Theme' : 'Toggle to Light Theme'
      "
      :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`"
    >
      {{ theme === "light" ? "🌙" : "☀️ " }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const theme = ref("light");
const route = useRoute();

const isMovieList = computed(() => route.path.includes("/movie"));

function applyTheme(themeName: string) {
  document.documentElement.setAttribute("data-theme", themeName);
}

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  applyTheme(theme.value);
  localStorage.setItem("theme", theme.value);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.value = savedTheme;
  }
  applyTheme(theme.value);
});
</script>
