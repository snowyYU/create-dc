import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { loadAllPlugins } from "./plugins";
import SvgIcon from "@/components/SvgIcon/index.vue";
// import "@/assets/iconfont/iconfont.css";
import router from "./router";
import "@/styles/index.scss";
import "normalize.css";
import App from "./App.vue";
import preRequest from "@/utils/prerequest";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
// 加载所有插件
app.use(pinia);
(async () => {
  await preRequest();
  loadAllPlugins(app);
  app.component("svg-icon", SvgIcon);
  app.use(router());
  app.mount("#app");
})();
