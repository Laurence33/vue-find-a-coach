import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import NotFound from './pages/NotFound.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      children: [
        {
          path: 'contact', // /coach/:id/contact
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
    },
    {
      path: '/requests',
      component: RequestsReceived,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
