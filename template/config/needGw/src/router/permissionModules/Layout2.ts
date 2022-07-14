/*
 * @Author: jasper
 * @Date: 2022-06-06 11:25:36
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-07 16:22:34
 * @FilePath: /vite-vue3-pc-template/src/router/permissionModules/Layout2.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import type { RouteRecordRaw } from "vue-router";
import LayoutWithFullScreen from "@/layout/LayoutWithFullScreen.vue";
import LayoutWithSidebar from "@/layout/LayoutWithSidebar.vue";

const SecondLayoutRouter: Array<RouteRecordRaw> = [
  {
    path: "/layout2",
    redirect: "/layout2/menu1",
    component: LayoutWithFullScreen,
    meta: { title: "布局二", icon: "", isModule: true, withoutNav: true },
  },
  {
    path: "/layout2/menu1",
    name: "/layout2",
    redirect: "/layout2/menu1/index",
    component: LayoutWithSidebar,
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout2/menu1/index",
    name: "/layout2",
    component: () => import("@/views/SecondLayout.vue"),
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout2/menu2",
    name: "/menu2",
    redirect: "/layout2/menu2/menu2-1",

    component: LayoutWithSidebar,
    meta: { title: "菜单二", icon: "" },
  },
  {
    path: "/layout2/menu2/menu2-1",
    name: "/menu2-1",
    component: () => import("@/views/SecondLayout.vue"),
    meta: { title: "菜单二一", icon: "" },
  },
  {
    path: "/layout2/menu2/menu2-2",
    name: "/menu2-2",
    component: () => import("@/views/SecondLayout.vue"),
    meta: { title: "菜单二二", icon: "" },
  },
];

export default SecondLayoutRouter;
