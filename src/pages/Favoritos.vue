<template>
  <q-page class="q-pa-md">
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

const gifs = ref(JSON.parse(localStorage.getItem('gifs')));

const favoriteGifs = computed(() => {
  return gifs.value.filter((gif) => gif.isFavorite);
});

const toggleFavorite = (gif) => {
  gif.isFavorite = !gif.isFavorite;
  saveGifsToLocalStorage();
};

const saveGifsToLocalStorage = () => {
  localStorage.setItem('gifs', JSON.stringify(gifs.value));
};

onMounted(() => {
  saveGifsToLocalStorage();
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
</style>
