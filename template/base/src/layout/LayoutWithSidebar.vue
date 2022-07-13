<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "LayoutWithSidebar",
};
</script>
<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore, DeviceType } from "@/stores/app";
import { AppActionTypes } from "@/stores/app/action-types";

import { Sidebar, AppMain } from "./components";
import resize from "./resize";

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
console.log("route", route);
console.log("router", router);
const {
  sidebar,
  device,
  addEventListenerOnResize,
  resizeMounted,
  removeEventListenerResize,
  watchRouter,
} = resize();
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === DeviceType.Mobile,
    withoutNav:
      router.currentRoute.value.path.includes("withoutNav") ||
      !!route.matched.find((item) => item.meta.withoutNav),
  };
});

const handleClickOutside = () => {
  appStore[AppActionTypes.CLOSE_SIDEBAR](false);
};

watchRouter();

onBeforeMount(() => {
  addEventListenerOnResize();
});

onMounted(() => {
  resizeMounted();
});

onBeforeUnmount(() => {
  removeEventListenerResize();
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: $sideBarWidth;
  // padding-top: $navHeight;
  transition: margin-left 0.28s;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $sideBarWidth !important;
  height: 100%;
  padding-top: calc(16px + $navHeight);
  overflow: hidden;
  font-size: 0px;
  background-color: $menuBg;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25), 1px 3px 4px 0px #eceef1;
  transition: width 0.28s;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - $sideBarCollapseWidth);
  }
}
.withoutNav {
  .sidebar-container {
    padding-top: 0;
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    width: $sideBarWidth !important;
    transition: transform 0.28s;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      transform: translate3d(-$sideBarWidth, 0, 0);
      transition-duration: 0.3s;
      pointer-events: none;
    }
  }

  .fixed-header {
    width: 100%;
  }
}
</style>
