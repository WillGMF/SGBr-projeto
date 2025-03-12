const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Home.vue') },  // Definindo o nome "home" para a rota principal
      { path: 'favoritos', name: 'favoritos', component: () => import('pages/Favoritos.vue') },
      { path: 'categorias', name: 'categorias', component: () => import('pages/Categorias.vue') },
      { path: 'sobre', name: 'sobre', component: () => import('pages/Sobre.vue') }
    ]
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
