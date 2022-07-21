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
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import registerRouterGuards from "./routerGuards";
// import Layout from '@/layout/index.vue'

const constantFiles = import.meta.glob("./constantModules/*.ts", {
  eager: true,
});
let constantModules: Array<RouteRecordRaw> = [];
Object.keys(constantFiles).forEach((key) => {
  if (key === "./index.ts") return;
  constantModules = constantModules.concat(constantFiles[key].default);
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

const router = () => {
  // 此处会根据是否要对接管理系统，执行不同的逻辑
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoutes, ...errorPageRoutes],
  });
  registerRouterGuards(router);
  return router;
};

function resetRouter() {
  const newRouter = router();
  (router() as any).matcher = (newRouter as any).matcher; // reset router
}

export { constantRoutes, errorPageRoutes, resetRouter };
export default router;
