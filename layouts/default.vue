<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const theme = ref("light");

onMounted(() => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.value = savedTheme;
  }
});
</script>
