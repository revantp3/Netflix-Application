// server/api/movies/[imdbID].ts

import { defineEventHandler, getQuery, sendError } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { imdbID } = event.context.params as any;
  if (!imdbID) {
    return sendError(event, new Error("IMDb ID is required"));
  }

  try {
    const apiKey = '63f45b6c';
    console.log(apiKey)
    if (!apiKey) {
      return sendError(event, new Error("OMDb API key is not configured"));
    }

    const response = await $fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    ) as any;
    console.log(response)
    if (response.Response === "True") {
      return response;
    } else {
      return sendError(event, new Error(`OMDb API Error: ${response.Error}`));
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return sendError(event, new Error("Failed to fetch movie data"));
  }
});
