<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md row items-center z-50">
      <q-input
        v-model="searchQuery"
        label="Pesquisar GIFs"
        debounce="300"
        @keyup.enter="searchGifs"
        class="col-10"
      />
    </div>

    <div class="row q-col-gutter-md justify-center">
      <div
        v-for="(gif, index) in gifs"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <q-img :src="gif.images.original.url" :alt="gif.title" class="card-img" />
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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const gifs = ref([]);
const loading = ref(false);
const searchQuery = ref('');

const loadGifs = () => {
  const savedGifs = localStorage.getItem('gifs');
  if (savedGifs) {
    gifs.value = JSON.parse(savedGifs);
  } else {
    fetchTrendingGifs();
  }
};

const fetchTrendingGifs = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://api.giphy.com/v1/gifs/trending', {
      params: {
        api_key: 'cp2RVrwauVtciDFGOCnoadMe2qgPwTZK',
        limit: 20,
        offset: 0,
        rating: 'g',
        bundle: 'messaging_non_clips',
      },
    });

    const newGifs = response.data.data.map(gif => ({
      title: gif.title,
      images: gif.images,
      isFavorite: false,
    }));

    gifs.value = newGifs;
    saveGifsToLocalStorage();
    loading.value = false;
  } catch (error) {
    console.error('Erro ao buscar GIFs:', error);
    loading.value = false;
  }
};

const searchGifs = async () => {
  if (!searchQuery.value) {
    fetchTrendingGifs();
    return;
  }

  try {
    loading.value = true;
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'cp2RVrwauVtciDFGOCnoadMe2qgPwTZK',
        q: searchQuery.value,
        limit: 20,
        rating: 'g',
      },
    });

    const newGifs = response.data.data.map(gif => ({
      title: gif.title,
      images: gif.images,
      isFavorite: false,
    }));

    gifs.value = newGifs;
    loading.value = false;
  } catch (error) {
    console.error('Erro ao pesquisar GIFs:', error);
    loading.value = false;
  }
};

const toggleFavorite = (gif) => {
  gif.isFavorite = !gif.isFavorite;
  saveGifsToLocalStorage();
};

const saveGifsToLocalStorage = () => {
  localStorage.setItem('gifs', JSON.stringify(gifs.value));
};

onMounted(() => {
  loadGifs();
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.my-card {
  width: 100%;
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.q-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.q-input {
  margin-right: 10px;
}
</style>
