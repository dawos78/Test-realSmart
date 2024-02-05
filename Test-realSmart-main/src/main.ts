import { createApp } from "vue";
import "./style.css";
import "./assets/index.less";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import naive from "naive-ui";
import { createPinia } from "pinia";
import router from "./router/router";

import "./assets/index.css";
const pinia = createPinia();
const app = createApp(App);
app.use(naive);
app.use(router);
app.use(VueAxios, axios);
app.use(pinia);
app.mount("#app");
