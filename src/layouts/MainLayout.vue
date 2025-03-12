<template>
  <q-layout>
    <q-header class="bg-blue-600 text-white flex items-center px-4 relative">
      <div class="lg:hidden absolute left-4">
        <button
          @click="toggleDrawer"
          class="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition duration-300 ease-in-out shadow-lg"
        >
          <q-icon name="menu" />
        </button>
      </div>


      <q-avatar size="40px" class="mr-2 lg:block hidden">
        <img src="../assets/logo-sgbr.png" alt="Logo" />
      </q-avatar>


      <div class="m-3 absolute transform -translate-x-1/2">
        <q-avatar size="40px">
          <img src="../assets/logo-sgbr.png" alt="Logo" />
        </q-avatar>
      </div>

      <q-space />


      <div class="flex items-center ml-4">
        <span class="mr-2">Willian</span>
        <q-avatar>
          <img src="../assets/User.png" alt="Perfil" />
        </q-avatar>
      </div>
    </q-header>

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
