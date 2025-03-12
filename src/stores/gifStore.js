// src/stores/gifStore.js
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { getTrendingGifs, searchGifs, fetchCategories } from 'src/services/giphyApi';

export const useGifStore = defineStore('gifStore', {
  state: () => ({
    trendingGifs: [],
    categories: [],
    favorites: LocalStorage.getItem('favorites') || [],
  }),
  actions: {
    async loadTrending() {
      this.trendingGifs = await fetchTrendingGifs();
    },
    async loadCategories() {
      this.categories = await fetchCategories();
    },
    async search(query) {
      if (!query.trim()) {
        this.trendingGifs = await fetchTrendingGifs();
      } else {
        this.trendingGifs = await searchGifs(query);
      }
    },
    toggleFavorite(gif) {
      const index = this.favorites.findIndex((item) => item.id === gif.id);
      if (index === -1) {
        this.favorites.push(gif);
      } else {
        this.favorites.splice(index, 1);
      }
      LocalStorage.set('favorites', this.favorites);
    },
    removeFavorite(id) {
      this.favorites = this.favorites.filter((item) => item.id !== id);
      LocalStorage.set('favorites', this.favorites);
    },
  },
});
