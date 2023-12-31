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
      path: '/mapView',
      name: 'mapView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MapView.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.currentUserLocation) {
          next();
        } else {
          store.commit("setMapError", true);
          next({ path: from.path, query: from.query });
        }
      },
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

]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        store.commit("setVisible", true);
        next({ path: from.path, query: from.query }); // Pass the current path as a parameter to next()
      }
    } else {
      next();
    }
  });

export default router
