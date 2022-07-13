/*
 * @Description: 根绝大小变化重新布局
 * @Author: ZY
 * @Date: 2020-12-17 15:37:56
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-28 16:29:49
 */
// refer to Bootstrap's responsive design
import { useAppStore, DeviceType } from "@/stores/app";
import { AppActionTypes } from "@/stores/app/action-types";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const WIDTH = 992; // refer to Bootstrap's responsive design

export default function () {
  const appStore = useAppStore();

  const device = computed(() => {
    return appStore.device;
  });

  const sidebar = computed(() => {
    return appStore.sidebar;
  });

  const currentRoute = useRoute();
  const watchRouter = watch(
    () => currentRoute.name,
    () => {
      if (appStore.device === DeviceType.Mobile && appStore.sidebar.opened) {
        appStore[AppActionTypes.CLOSE_SIDEBAR](false);
      }
    }
  );

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const resizeMounted = () => {
    if (isMobile()) {
      appStore[AppActionTypes.TOGGLE_DEVICE](DeviceType.Mobile);
      appStore[AppActionTypes.CLOSE_SIDEBAR](false);
    }
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      appStore[AppActionTypes.TOGGLE_DEVICE](
        isMobile() ? DeviceType.Mobile : DeviceType.Desktop
      );

      if (isMobile()) {
        appStore[AppActionTypes.CLOSE_SIDEBAR](true);
      }
    }
  };
  const addEventListenerOnResize = () => {
    window.addEventListener("resize", resizeHandler);
  };

  const removeEventListenerResize = () => {
    window.removeEventListener("resize", resizeHandler);
  };

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter,
  };
}
