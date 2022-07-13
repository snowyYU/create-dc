/*
 * @Author: jasper
 * @Date: 2022-06-20 10:58:45
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-01 09:29:44
 * @FilePath: /vite-vue3-pc-template/vite.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createHtmlPlugin } from "vite-plugin-html";
import { svgBuilder } from "./src/plugins/svgBuilder";
import config from "./src/config/index";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    svgBuilder("./src/icons/svg/"),
    createHtmlPlugin({
      minify: true,
      entry: "/src/main.ts",
      template: "index.html",
      inject: {
        data: {
          title: "注入标题",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";\n@import "@/styles/mixins.scss";`,
      },
    },
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 9977,
    proxy: {
      "/dev-api": {
        target: "http://dev-b-health.cn/gw/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
  build: {
    outDir: `${config.domainSign}-view`,
    assetsDir: "static",
  },
});
