// main.js/ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store.js";

import "bootstrap/dist/js/bootstrap.js"

import { onAuthStateChanged } from 'firebase/auth'


const app = createApp(App)

app.use(router)
app.use(store) //for global state management 

app.mount('#app')








