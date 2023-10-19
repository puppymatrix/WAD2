import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
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
        path: '/userProfile',
        name: 'userProfile',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/userProfileView.vue')

      },

  ]
})

export default router
