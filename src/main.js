import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia)
app.use(router)
app.component('VueLoading',Loading)
app.mount('#app')