/*
 * @Author: jasper
 * @Date: 2022-04-11 19:31:56
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-13 20:34:06
 * @FilePath: /vite-vue3-pc-template/src/utils/prerequest.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { useAppStore } from "@/stores/app";
import { AppActionTypes } from "@/stores/app/action-types";
import getFinallyRoutes from "@/utils/permission";
import config from "@/config";
// 应用的前置请求，这些请求会阻塞应用的渲染，也就是应用必须等待这里的请求返回正确的响应才能正常运行，常用于获取用户信息，预载必要的字典等
const preRequest = async () => {
  if (config.enableSso) {
    // 需要对接管理系统
    const appStore = useAppStore();
    await appStore[AppActionTypes.GET_DOORINFO]();
    await appStore[AppActionTypes.GET_APPINFO]();
    await appStore[AppActionTypes.GET_USERINFO]();
    await appStore[AppActionTypes.GET_ROUTEFROMAPI]();
    appStore[AppActionTypes.SET_FINALLYROUTE](
      getFinallyRoutes(appStore.routesFromApi)
    );
  } else {
    // 不需要对接管理系统
  }
  //
};

export default preRequest;
