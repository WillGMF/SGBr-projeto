<template>
  <q-page class="q-pa-md">
    <!-- Título da página -->
    <div class="q-mb-md">
      <h3>GIFs por Categoria</h3>
    </div>

    <!-- Dropdown para selecionar categoria -->
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

    <!-- Exibição de GIFs da categoria -->
    <div class="row q-col-gutter-md justify-center" v-if="categoryGifs.length > 0">
      <div
        v-for="(gif, index) in categoryGifs"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <q-img :src="gif.images.original.url" :alt="gif.title" class="card-img" />
          <q-card-section>
            <div class="text-h6 text-center">{{ gif.title }}</div>

            <!-- Estrela de favorito -->
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

    <!-- Exibição do loading -->
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

// Função para carregar as categorias da API
const loadCategories = async () => {
  try {
    loading.value = true;

    const response = await axios.get('https://api.giphy.com/v1/gifs/categories', {
      params: {
        api_key: 'IN2bp8RFRraZn07JTYS3UrB9nJ6imgA8',
      },
    });

    categories.value = response.data.data;

    // Prepara as opções para o dropdown
    categoryOptions.value = categories.value.map((category) => category.name);

    loading.value = false;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    loading.value = false;
  }
};

// Função para carregar GIFs baseado na categoria selecionada
const loadCategoryGifs = async () => {
  if (!selectedCategory.value) return;

  try {
    loading.value = true;

    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: '5cCbojV6ogKVeXGpmt16cJE7miFg3zWF',
        q: selectedCategory.value, // Busca pela categoria selecionada
        limit: 10,
        rating: 'g',
      },
    });

    // Carrega os GIFs da categoria
    categoryGifs.value = response.data.data.map(gif => ({
      title: gif.title,
      images: gif.images,
      isFavorite: checkIfFavorite(gif) // Verifica se o GIF é favorito
    }));

    loading.value = false;
  } catch (error) {
    console.error('Erro ao carregar GIFs da categoria:', error);
    loading.value = false;
  }
};

// Função para verificar se o GIF está nos favoritos
const checkIfFavorite = (gif) => {
  const savedGifs = JSON.parse(localStorage.getItem('gifs')) || [];
  return savedGifs.some(savedGif => savedGif.title === gif.title && savedGif.isFavorite);
};

// Função para alternar o estado de favorito
const toggleFavorite = (gif) => {
  gif.isFavorite = !gif.isFavorite;
  saveGifsToLocalStorage(); // Salva os GIFs novamente no LocalStorage após a alteração
};

// Função para salvar os GIFs no LocalStorage
const saveGifsToLocalStorage = () => {
  const savedGifs = JSON.parse(localStorage.getItem('gifs')) || [];
  const updatedGifs = [...savedGifs, ...categoryGifs.value.filter(gif => gif.isFavorite)];
  localStorage.setItem('gifs', JSON.stringify(updatedGifs));
};

// Função para abrir ou fechar o dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Função para selecionar uma categoria no dropdown
const selectCategory = (category) => {
  selectedCategory.value = category;
  loadCategoryGifs(); // Carrega os GIFs dessa categoria
  dropdownOpen.value = false; // Fecha o dropdown após a seleção
};

// Carregar as categorias assim que o componente for montado
onMounted(() => {
  loadCategories();
});
</script>

<style scoped>
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

.relative {
  position: relative;
}

.z-50 {
  z-index: 50;
}
</style>
