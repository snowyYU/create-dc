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
    userInfo: { name: "用户1" },
    appInfo: { name: "系统名称" },
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
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
