<template>
  <q-page class="q-pa-md">
    <!-- Grid de GIFs Favoritos -->
    <div class="row q-col-gutter-md justify-center">
      <div
        v-for="(gif, index) in favoriteGifs"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <q-img :src="gif.images.original.url" :alt="gif.title" class="card-img" />
          <q-card-section>
            <div class="text-h6 text-center">{{ gif.title }}</div>

            <!-- Estrela de favorito (visível, mas sem alterar) -->
            <q-btn
              flat
              icon="star"
              :color="gif.isFavorite ? 'yellow' : 'grey'"
              @click="toggleFavorite(gif)"
              class="q-ml-xs"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Inicializa a lista de GIFs com base no LocalStorage ou com valores padrão
const gifs = ref(
  JSON.parse(localStorage.getItem('gifs'))
);

// Computed para pegar apenas os GIFs favoritos
const favoriteGifs = computed(() => {
  return gifs.value.filter((gif) => gif.isFavorite);
});

// Função para alternar o estado de favorito
const toggleFavorite = (gif) => {
  gif.isFavorite = !gif.isFavorite;
  saveGifsToLocalStorage();
};

// Função para salvar os GIFs no LocalStorage
const saveGifsToLocalStorage = () => {
  localStorage.setItem('gifs', JSON.stringify(gifs.value));
};

// Carregar GIFs favoritos ao montar o componente
onMounted(() => {
  saveGifsToLocalStorage();
});
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.my-card {
  width: 100%;
}

.card-img {
  width: 100%;
  height: 200px; /* Mantém um tamanho fixo para as imagens */
  object-fit: cover;
}

.q-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
