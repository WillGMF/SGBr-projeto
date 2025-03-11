const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/favoritos', component: () => import('pages/Favoritos.vue')},
      { path: '/categorias', component: () => import('pages/Categorias.vue')},
      { path: '/Sobre', component: () => import('pages/Sobre.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
