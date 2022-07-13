/*
 * @Author: jasper
 * @Date: 2022-03-31 16:23:21
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-12 17:03:34
 * @FilePath: /vite-vue3-pc-template/src/utils/permission.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
// 此方法用于修改各级路由的重定向 deprecated
import type { RouteRecordRaw } from "vue-router";
import { asyncRoutes, constantRoutes, errorPageRoutes } from "@/router";
import { ElMessage } from "element-plus";

// const modifyRedirect = (
//   routeModule: RouteRecordNormalized | RouteRecordRaw
// ) => {
//   if (routeModule.children && routeModule.children[0]) {
//     routeModule.redirect = routeModule.children[0].path;
//     routeModule.children.forEach((item) => {
//       modifyRedirect(item);
//     });
//   }
// };

// 生成路由对象数组，并返回

const generateRoutes = (
  routesFromApi: API.RouteFromApi[],
  routesInLocal: (RouteItemInLocal | RouteRecordRaw)[]
) => {
  const result: RouteRecordRaw[] = [];
  // 将会根据本地路由数组各项的path属性，查找后端返回的路由数组中是否有对应的路由 （严格匹配）
  routesFromApi.forEach((routeFromApi) => {
    const routeItem: RouteRecordRaw = {
      component: undefined,
      redirect: "",
      path: "",
    };
    const targetRouteItemInLocal = routesInLocal.find(
      (routeItem) => routeItem.path === routeFromApi.routePath
    );
    if (!targetRouteItemInLocal) return;
    // 处理逻辑
    routeItem.path = targetRouteItemInLocal?.path
      ? targetRouteItemInLocal.path
      : "";
    routeItem.name = targetRouteItemInLocal?.name;
    routeItem.component = targetRouteItemInLocal?.component;
    routeItem.meta = { ...targetRouteItemInLocal?.meta, ...routeFromApi };
    if (routeFromApi.children) {
      if (
        !routeFromApi.redirect &&
        routeFromApi.children &&
        routeFromApi.children.length > 0 &&
        routeFromApi.children[0].routePath &&
        !routeFromApi.children[0].routePath.split("/").pop()?.includes(":")
      )
        routeItem.redirect = routeFromApi.children[0].routePath;
      routeItem.children = generateRoutes(routeFromApi.children, routesInLocal);
    }

    result.push(routeItem);
  });
  // 在此处理 iframeLink 和 outSideLink 逻辑

  return result;
};

const getFinallyRoutes = (routeFromApi: API.RouteFromApi[]) => {
  // 过滤掉没有routePath 参数的路由
  const pathsFromApi = routeFromApi.filter((item) => item.routePath);
  // 获取后端返回的第一个地址，用以匹配 / 的情况
  if (!pathsFromApi[0]) {
    ElMessage.error("权限出错，请检查权限");
    return [];
  }
  const redirectUrl = pathsFromApi[0].routePath;
  constantRoutes.push({
    path: "/",
    redirect: redirectUrl,
  });
  const finallyRoutes = generateRoutes(pathsFromApi, asyncRoutes);
  const accessedRoutes = [
    ...constantRoutes,
    ...finallyRoutes,
    ...errorPageRoutes,
  ];
  return accessedRoutes;
};

export default getFinallyRoutes;
