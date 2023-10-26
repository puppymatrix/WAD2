// main.js/ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store.js";

import "bootstrap/dist/js/bootstrap.js"

// import "primevue/resources/themes/lara-light-teal/theme.css";
// import Toast from 'primevue/toast';
// import PrimeVue from 'primevue/config';
// import FileUpload from "primevue/fileupload";
// import ToastService from 'primevue/toastservice';

import { onAuthStateChanged } from 'firebase/auth'


const app = createApp(App)

app.use(router)
app.use(store) //for global state management 
// app.use(PrimeVue, { ripple: true  });
// app.use(ToastService);

// app.component('FileUpload', FileUpload);
// app.component('Toast', Toast);
app.mount('#app')








