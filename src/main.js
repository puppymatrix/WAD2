// main.js/ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store/store.js";
import { createStore } from "vuex";


import "bootstrap/dist/js/bootstrap.js"

const app = createApp(App)

const store = createStore({
    state: {
        userLoggedIn: false, // Initially, the user is not logged in
    },
    getters:{

    },
    mutations: {
        setUserLoggedIn(state) {
            if (state.userLoggedIn){
                state.userLoggedIn = false
            } else {
                state.userLoggedIn = true
            };
        },
    },
    actions: {
        setUserLoggedIn({ commit }, status) {
            commit("setUserLoggedIn", status);
        },
    },
    modules: {},
});

app.use(router)
app.use(store) //for global state management 

app.mount('#app')






