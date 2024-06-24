import "./assets/main.css";
import "virtual:windi.css";

import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import store from "./store"

import './permission'

const app = createApp(App);
app.use(store)
app.use(router);
app.use(ElementPlus);

// 全局引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

import "nprogress/nprogress.css"

app.mount("#app");
