/*
 * @Author: jasper
 * @Date: 2022-04-02 16:17:03
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-14 10:57:36
 * @FilePath: /vite-vue3-pc-template/src/router/permissionModules/Home.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/LayoutWithNav.vue";

const EventManageRouter: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    redirect: "/dashboard/index",
    component: Layout,
    meta: { title: "首页", icon: "", isModule: true },
  },
  {
    name: "/dashboard",
    path: "/dashboard/index",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "首页", icon: "" },
  },
];

export default EventManageRouter;
