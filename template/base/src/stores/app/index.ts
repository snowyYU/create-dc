import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setLanguage,
  setSize,
} from "@/utils/cookies";

import { AppActionTypes } from "./action-types";

import {
  queryDoorInfo,
  queryAppInfo,
  queryUserIdentityInfo,
  getDoorResourcesTreeBySystem,
  loginout,
} from "@/apis/system";

export enum DeviceType {
  Mobile,
  Desktop,
}
export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    device: DeviceType.Desktop,
    sidebar: {
      opened: getSidebarStatus() !== "closed",
      withoutAnimation: false,
    },
    language: "cn",
    size: getSize() || "default",
    token: "",
    doorInfo: {}, //门户信息
    appInfo: { name: "初始应用名" } as API.AppInfo, //应用信息
    userInfo: { name: "初始用户" } as API.UserInfo, //用户信息
    routesFromApi: [] as Array<API.RouteFromApi>, //后端获取的路由
    finallyRoute: [] as RouteRecordRaw[], //最终生成的路由
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    [AppActionTypes.TOGGLE_SIDEBAR](withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = withoutAnimation;
      if (this.sidebar.opened) {
        setSidebarStatus("opened");
      } else {
        setSidebarStatus("closed");
      }
    },

    [AppActionTypes.CLOSE_SIDEBAR](withoutAnimation: boolean) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
      setSidebarStatus("closed");
    },

    [AppActionTypes.TOGGLE_DEVICE](device: DeviceType) {
      this.device = device;
    },

    [AppActionTypes.SET_LANGUAGE](language: string) {
      this.language = language;
      setLanguage(this.language);
    },

    [AppActionTypes.SET_SIZE](size: string) {
      this.size = size;
      setSize(this.size);
    },
    // 获取应用所属门户信息
    [AppActionTypes.GET_DOORINFO]() {
      return queryDoorInfo().then((res) => {
        this.doorInfo = res.data;
      });
    },
    [AppActionTypes.GET_APPINFO]() {
      return queryAppInfo().then((res) => {
        this.appInfo = res.data;
      });
    },
    [AppActionTypes.GET_USERINFO]() {
      return queryUserIdentityInfo().then((res) => {
        this.userInfo = res.data;
      });
    },
    [AppActionTypes.GET_ROUTEFROMAPI]() {
      return getDoorResourcesTreeBySystem().then((res) => {
        this.routesFromApi = res.data;
      });
    },
    [AppActionTypes.SET_FINALLYROUTE](finallyRoute: RouteRecordRaw[]) {
      this.finallyRoute = finallyRoute;
    },
    [AppActionTypes.LOGIN_OUT]() {
      return loginout().then((res) => {
        console.log(res);
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
