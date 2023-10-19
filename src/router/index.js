import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('../views/landingPage.vue') // there's some problem with this path, but i can't figure out why 

    // }, 

    
    {
        path: '/',
        name: 'home',
        component: () => import('../views/tempHome.vue')

    }, 
    {
        path: '/listing',
        name: 'listing',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/listingView.vue')

      },

      {
        path: '/addListing',
        name: 'addListing',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/addListingView.vue')
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
        path: '/resetPassword',
        name: 'resetPassword',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/resetPassword.vue')

      },

      {
        path: '/profile',
        name: 'profile',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/profile.vue')

      },
  ]
})

export default router
