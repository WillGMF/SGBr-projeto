<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout>
    <q-header class="bg-blue-600 text-white flex items-center px-4">
      <!-- Topbar -->
      <q-avatar size="40px" class="mr-2">
        <img src="../assets/logo-sgbr.png" alt="Logo" />
      </q-avatar>
      <q-space />
      <span class="mr-4">Willian</span>
      <q-avatar>
        <img src="../assets/User.png" alt="Perfil" />
      </q-avatar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" class="bg-dark">
      <!-- Menu lateral -->
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable to="/favoritos">
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>Favorite</q-item-section>
        </q-item>
        <q-item clickable to="/categorias">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Categorias</q-item-section>
        </q-item>
        <q-item clickable to="/sobre">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Sobre</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(true);
</script>
