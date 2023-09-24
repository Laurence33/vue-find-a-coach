import { createRouter, createWebHistory } from 'vue-router';
import CoachesView from './views/CoachesView.vue';
import RegisterView from './views/RegisterView.vue';
import RequestsView from './views/RequestsView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesView,
    },
    {
      path: '/coaches/:id',
      component: null,
      children: [
        {
          path: 'contact', // /coach/:id/contact
          component: null,
        },
      ],
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/requests',
      component: RequestsView,
    },
    {
      path: '/:notFound(.*)',
      component: null,
    },
  ],
});
