/*
 * @Author: jasper
 * @Date: 2022-03-29 16:16:20
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-14 15:38:10
 * @FilePath: /vite-vue3-pc-template/src/router/routerGuards.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { Router } from "vue-router";
import { getToken } from "@/utils/cookies";

import portal from "@/utils/gateway";
NProgress.configure({ showSpinner: false });

export default function registerRouterGuards(router: Router) {
  router.beforeEach(async (to, _, next: any) => {
    // Start progress bar
    NProgress.start();

    if (getToken()) {
      next();
    } else {
      portal.goLogin();
      NProgress.done();
    }
  });

  router.afterEach((to) => {
    // console.log(to);
    // Finish progress bar
    NProgress.done();

    // set page title
    if (to.meta?.title) {
      document.title = to.meta.title as string;
    }
  });
}
