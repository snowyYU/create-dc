/*
 * @Author: jasper
 * @Date: 2022-03-29 15:48:27
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-14 15:28:50
 * @FilePath: /vite-vue3-pc-template/src/utils/gateway.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { useAppStore } from "@/stores/app";
const portal = {
  goLogin(): void {
    const appStore = useAppStore();

    // 返回单点登陆
    window.location.href = `${appStore.appInfo.loginUrl[0]}?callbackUrl=${window.location.href}`;
  },
  goLoginWithoutCallback(): void {
    const appStore = useAppStore();

    // 返回单点登陆
    window.location.href = `${appStore.appInfo.loginUrl[0]}`;
  },
  loginout(needCallBack?: boolean): void {
    // 退出登陆
    // console.log(needCallBack);
    // loginout().then(() => {
    setTimeout(() => {
      if (needCallBack) {
        portal.goLogin();
      } else {
        portal.goLoginWithoutCallback();
      }
    }, 1500);
    // });
  },
};

export default portal;
