/*
 * @Author: jasper
 * @Date: 2022-06-28 15:52:58
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-28 18:23:56
 * @FilePath: /vite-vue3-pc-template/src/router/permissionModules/Layout3.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import type { RouteRecordRaw } from "vue-router";
import LayoutWithFullScreen from "@/layout/LayoutWithFullScreen.vue";
import LayoutWithNavSidebar from "@/layout/LayoutWithNavSidebar.vue";

const ThirdLayoutRouter: Array<RouteRecordRaw> = [
  {
    path: "/layout3",
    redirect: "/layout3/menu1",
    component: LayoutWithFullScreen,
    meta: { title: "布局三", icon: "", isModule: true, withoutNav: true },
  },
  {
    path: "/layout3/menu1",
    name: "/layout3/menu1",
    redirect: "/layout3/menu1/index",
    component: LayoutWithNavSidebar,
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout3/menu1/index",
    name: "/layout3/menu1/index",
    component: () => import("@/views/ThirdLayout.vue"),
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout3/menu2",
    name: "/layout3/menu2",
    redirect: "/layout3/menu2/menu2-1",

    component: LayoutWithNavSidebar,
    meta: { title: "菜单二", icon: "" },
  },
  {
    path: "/layout3/menu2/menu2-1",
    name: "/layout3/menu2/menu2-1",
    component: () => import("@/views/ThirdLayout.vue"),
    meta: { title: "菜单二一", icon: "" },
  },
  {
    path: "/layout3/menu2/menu2-2",
    name: "/layout3/menu2/menu2-2",
    component: () => import("@/views/ThirdLayout.vue"),
    meta: { title: "菜单二二", icon: "" },
  },
];

export default ThirdLayoutRouter;
