<template>
  <q-page class="q-pa-md">
    <div class="relative w-full max-w-xs">
      <button
        @click="toggleDropdown"
        class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg focus:outline-none hover:bg-blue-700 transition duration-300"
      >
        {{ selectedCategory ? selectedCategory : 'Escolha uma Categoria' }}
      </button>

      <div
        v-if="dropdownOpen"
        class="absolute mt-2 w-full bg-white shadow-lg rounded-md z-50 h-96 overflow-y-auto"
        style="top: 100%; left: 0;"
      >
        <ul>
          <li
            v-for="(category, index) in categoryOptions"
            :key="index"
            @click="selectCategory(category)"
            class="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row q-col-gutter-md justify-center" v-if="categoryGifs.length > 0">
      <div
        v-for="(gif, index) in categoryGifs"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="w-full">
          <q-img :src="gif.images.original.url" :alt="gif.title" class="w-full h-48 object-cover" />
          <q-card-section>
            <div class="text-h6 text-center">{{ gif.title }}</div>
            <q-btn
              flat
              icon="star"
              :color="gif.isFavorite ? 'yellow' : 'grey'"
              @click.stop="toggleFavorite(gif)"
              class="q-ml-xs"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-spinner v-if="loading" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);
const categoryOptions = ref([]);
const selectedCategory = ref(null);
const categoryGifs = ref([]);
const loading = ref(false);
const dropdownOpen = ref(false);

const loadCategories = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://api.giphy.com/v1/gifs/categories', {
      params: { api_key: 'cp2RVrwauVtciDFGOCnoadMe2qgPwTZK' },
    });
    categories.value = response.data.data;
    categoryOptions.value = categories.value.map((category) => category.name);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const loadCategoryGifs = async () => {
  if (!selectedCategory.value) return;
  try {
    loading.value = true;
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'cp2RVrwauVtciDFGOCnoadMe2qgPwTZK',
        q: selectedCategory.value,
        limit: 20,
        rating: 'g',
      },
    });
    categoryGifs.value = response.data.data.map((gif) => ({
      title: gif.title,
      images: gif.images,
      isFavorite: checkIfFavorite(gif),
    }));
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const checkIfFavorite = (gif) => {
  const savedGifs = JSON.parse(localStorage.getItem('gifs')) || [];
  return savedGifs.some((savedGif) => savedGif.title === gif.title && savedGif.isFavorite);
};

const toggleFavorite = (gif) => {
  gif.isFavorite = !gif.isFavorite;
  saveGifsToLocalStorage();
};

const saveGifsToLocalStorage = () => {
  const savedGifs = JSON.parse(localStorage.getItem('gifs')) || [];
  const updatedGifs = savedGifs.filter(
    (gif) => !categoryGifs.value.some((g) => g.title === gif.title)
  );
  const newFavorites = categoryGifs.value.filter((gif) => gif.isFavorite);
  localStorage.setItem('gifs', JSON.stringify([...updatedGifs, ...newFavorites]));
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  loadCategoryGifs();
  dropdownOpen.value = false;
};

onMounted(() => {
  loadCategories();
});
</script>

<style scoped></style>
