import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import { store } from './store/index.js';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
// import ContactCoach from './pages/requests/ContactCoach.vue';
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
// import UserAuth from './pages/auth/UserAuth.vue';
const UserAuth = () => import('./pages/auth/UserAuth.vue');
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');

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
      props: true,
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
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnAuth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return next('/auth');
  } else if (to.meta.requiredUnAuth && store.getters.isAuthenticated) {
    return next('/coaches');
  }

  return next();
});
