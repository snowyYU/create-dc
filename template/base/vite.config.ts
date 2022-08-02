/*
 * @Author: jasper
 * @Date: 2022-06-20 10:58:45
 * @LastEditors: jasper
 * @LastEditTime: 2022-08-02 17:40:51
 * @FilePath: /create-dc/template/base/vite.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: "component", // or 'raw' or 'url'
    }),

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
    outDir: "dist",
    assetsDir: "static",
  },
});
