/*
 * @Author: jasper
 * @Date: 2022-04-07 19:23:01
 * @LastEditors: jasper
 * @LastEditTime: 2022-08-02 17:33:52
 * @FilePath: /create-dc/template/config/needGw/src/router/permissionModules/Layout1.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import type { RouteRecordRaw } from "vue-router";
import LayoutWithNav from "@/layout/LayoutWithNav.vue";
import LayoutWithSidebar from "@/layout/LayoutWithSidebar.vue";

const EventManageRouter: Array<RouteRecordRaw> = [
  {
    path: "/layout1",
    redirect: "/layout1/menu1",
    component: LayoutWithNav,
    meta: { title: "布局一", icon: "", isModule: true },
  },
  {
    path: "/layout1/menu1",
    name: "/layout1/menu1",
    component: LayoutWithSidebar,
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout1/menu1/index",
    name: "/layout1/menu1/index",
    component: () => import("@/views/FirstLayout.vue"),
    meta: { title: "菜单一", icon: "" },
  },
  {
    path: "/layout1/menu2",
    name: "/layout1/menu2",
    component: LayoutWithSidebar,
    meta: { title: "菜单二", icon: "" },
  },
  {
    path: "/layout1/menu2/menu2-1",
    name: "/layout1/menu2/menu2-1",
    component: () => import("@/views/FirstLayout.vue"),
    meta: { title: "菜单二一", icon: "" },
  },
  {
    path: "/layout1/menu2/menu2-2",
    name: "/layout1/menu2/menu2-2",
    component: () => import("@/views/FirstLayout.vue"),
    meta: { title: "菜单二二", icon: "custom-link" },
  },
];

export default EventManageRouter;
