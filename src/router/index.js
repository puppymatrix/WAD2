import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },

<<<<<<< HEAD:frontend/src/router/index.js
    {
      path: '/',
      name: 'home',
      component: () => import('../views/landingPage.vue')

    }, 

    
=======
>>>>>>> main:src/router/index.js
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
<<<<<<< HEAD:frontend/src/router/index.js
     
=======
>>>>>>> main:src/router/index.js
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
  ]
})

export default router
