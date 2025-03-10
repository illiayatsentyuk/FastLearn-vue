import { createRouter, createWebHistory } from 'vue-router'
// import MainLayout from '@/layouts/MyFirstLayout.vue'
// import { useLayout } from '../composables/useLayout'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'
import { loadLayoutMiddleware } from '../middleware/loadLayoutMiddleware'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        layout: 'MainLayout',
      },
    },
    { path: '/signin', component: SignInView },
    { path: '/signup', component: SignUpView },
  ],
})

router.beforeEach(loadLayoutMiddleware)

export default router
