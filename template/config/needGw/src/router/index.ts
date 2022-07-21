/*
 * @Author: jasper
 * @Date: 2022-05-10 09:10:19
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-13 20:44:24
 * @FilePath: /vite-vue3-pc-template/src/router/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { toRaw } from "vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import registerRouterGuards from "./routerGuards";
// import Layout from '@/layout/index.vue'
import { useAppStore } from "@/stores/app";

const constantFiles = import.meta.glob("./constantModules/*.ts", {
  eager: true,
});
let constantModules: Array<RouteRecordRaw> = [];
Object.keys(constantFiles).forEach((key) => {
  if (key === "./index.ts") return;
  constantModules = constantModules.concat(constantFiles[key].default);
});

const asyncFiles = import.meta.glob("./permissionModules/*.ts", {
  eager: true,
});
let permissionModules: Array<RouteItemInLocal> = [];
Object.keys(asyncFiles).forEach((key) => {
  if (key === "./index.ts") return;
  permissionModules = permissionModules.concat(asyncFiles[key].default);
});

const errorPageRoutes: Array<RouteRecordRaw> = [
  {
    path: "/404",
    name: "Page404",
    component: () => import("@/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/404",
  },
];

const constantRoutes: Array<RouteRecordRaw> = [...constantModules];

const asyncRoutes: Array<RouteItemInLocal> = [...permissionModules];
const router = () => {
  // 此处会根据是否要对接管理系统，执行不同的逻辑
  const router = createRouter({
    history: createWebHashHistory(),
    routes: toRaw(useAppStore().finallyRoute),
  });
  registerRouterGuards(router);
  return router;
};

function resetRouter() {
  const newRouter = router();
  (router() as any).matcher = (newRouter as any).matcher; // reset router
}

export { constantRoutes, asyncRoutes, errorPageRoutes, resetRouter };
export default router;
