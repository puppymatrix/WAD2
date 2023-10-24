import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/landingPage.vue')
    }, 
    {
        path: '/allListings',
        name: 'allListings',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/allListingView.vue')
    }, 
    {
      path: '/listing',
      name: 'listing',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/listingView.vue'),
    },
    {
      path: '/lister',
      name: 'lister',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/listerView.vue')
    },
    {
      path: '/mapView',
      name: 'mapView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/mapView.vue')
    },
    {
      path: '/addListing',
      name: 'addListing',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/addListingView.vue'),
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/logIn',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/logIn.vue')
    },

    {
      path: '/signUp',
      name: 'signUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/signUp.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/userProfileView.vue'),
      meta: {
        authRequired: true,
      },
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/testPage.vue')

    },
]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        alert('You must be logged in to see this page');
        next({
          path: '/logIn',
        });
      }
    } else {
      next();
    }
  });

export default router
