/*
 * @Author: jasper
 * @Date: 2022-03-29 16:15:11
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-14 10:52:07
 * @FilePath: /vite-vue3-pc-template/src/router/constantModules/demo.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import type { RouteRecordRaw } from "vue-router";
import LayoutWithNav from "@/layout/LayoutWithNav.vue";
import LayoutWithSidebar from "@/layout/LayoutWithSidebar.vue";
import config from "@/config";

const DemoRouter: Array<RouteRecordRaw> = [
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => import(/* webpackChunkName: "demo" */'@/views/demo/test/index.vue')
  // }
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    redirect: "/dashboard/index",
    component: LayoutWithNav,
    meta: { title: "首页(固定)", icon: "", isModule: true },
    children: [
      {
        name: "/dashboard",
        path: "/dashboard/index",
        component: () => import("@/views/HomeView.vue"),
        meta: { title: "首页", icon: "" },
      },
    ],
  },
  {
    path: "/layout1",
    redirect: "/layout1/menu1",
    component: LayoutWithNav,
    meta: { title: "布局一(固定)", icon: "", isModule: true },
    children: [
      {
        path: "/layout1/menu1",
        name: "/layout1",
        component: LayoutWithSidebar,
        meta: { title: "菜单一", icon: "custom-link" },
        children: [
          {
            path: "/layout1/menu1/index",
            name: "/layout1",
            component: () => import("@/views/FirstLayout.vue"),
            meta: { title: "菜单一", icon: "custom-link" },
          },
        ],
      },
      {
        path: "/layout1/menu2",
        name: "/menu2",
        component: LayoutWithSidebar,
        meta: { title: "菜单二", icon: "" },
        children: [
          {
            path: "/layout1/menu2/menu2-1",
            name: "/menu2-1",
            component: () => import("@/views/FirstLayout.vue"),
            meta: { title: "菜单二一", icon: "custom-dashboard" },
          },
          {
            path: "/layout1/menu2/menu2-2",
            name: "/menu2-2",
            component: () => import("@/views/FirstLayout.vue"),
            meta: { title: "菜单二二", icon: "custom-eye" },
          },
          {
            path: "/layout1/menu2/menu2-3",
            name: "/menu2-3",
            component: () => import("@/views/FirstLayout.vue"),
            meta: { title: "菜单二三", icon: "Checked" },
          },
        ],
      },
    ],
  },
];
export default DemoRouter;
