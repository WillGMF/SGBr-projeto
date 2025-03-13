<template>
  <q-layout>
    <q-header class="bg-blue-600 text-white flex items-center px-4 relative">
      <!-- Botão do menu (hamburger) visível apenas em telas pequenas -->
      <div class="lg:hidden absolute left-4 z-50">
        <button
          @click="toggleDrawer"
          class="p-6 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
        >
          <q-icon name="menu" size="30px" />
        </button>
      </div>

      <!-- Logo (Visível apenas no desktop) -->
      <q-avatar size="60px" class="mr-2 lg:block">
        <img src="../assets/logo-sgbr.png" alt="Logo" />
      </q-avatar>

      <!-- Logo (Visível apenas no celular) -->
      <div class="lg:hidden absolute left-1/2 transform -translate-x-1/2 z-40">
        <q-avatar size="40px">
          <img src="../assets/logo-sgbr.png" alt="Logo" />
        </q-avatar>
      </div>

      <q-space />

      <!-- Perfil do usuário -->
      <div class="flex items-center ml-4">
        <span class="mr-2">Willian</span>
        <q-avatar size="5vh">
          <img src="../assets/User.png" alt="Perfil" />
        </q-avatar>
      </div>
    </q-header>

    <!-- Drawer de navegação -->
    <q-drawer
      show-if-above
      v-model="drawer"
      class="white"
      @click-outside="closeDrawer"
    >
      <q-list>
        <q-item
          clickable
          to="/"
          :class="{'bg-blue-100 text-blue-600': $route.path === '/favoritos'}"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/favoritos"
          :class="{'bg-blue-100 text-blue-600': $route.path === '/favoritos'}"
        >
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>Favorite</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/categorias"
          :class="{'bg-blue-100 text-blue-600': $route.path === '/categorias'}"
        >
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Categorias</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/sobre"
          :class="{'bg-blue-100 text-blue-600': $route.path === '/sobre'}"
        >
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Sobre</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Página principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false); // Drawer inicialmente fechado

// Alterna o estado do drawer
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Fecha o drawer ao clicar fora
const closeDrawer = () => {
  drawer.value = false;
};
</script>

<style scoped>
/* Customizações se necessário */
</style>
