// main.js/ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/js/bootstrap.js"

const app = createApp(App)

app.use(router)

app.mount('#app')
