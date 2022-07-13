<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div :class="{ 'fixed-header': fixedHeader }"> -->
    <navbar />
    <!-- </div> -->
    <div class="layout1">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
} from "vue";
import { useAppStore, DeviceType } from "@/stores/app";

import { AppActionTypes } from "@/stores/app/action-types";

import { Navbar } from "./components";
import resize from "./resize";

export default defineComponent({
  name: "layout-with-nav",
  components: {
    Navbar,
  },
  setup() {
    // debugger;
    const appStore = useAppStore();

    const {
      sidebar,
      device,
      addEventListenerOnResize,
      resizeMounted,
      removeEventListenerResize,
      watchRouter,
    } = resize();

    // const fixedHeader = computed(() => {
    //   return store.state.settings.fixedHeader;
    // });

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === DeviceType.Mobile,
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

    return {
      sidebar,
      device,
      // fixedHeader,
      classObj,
      handleClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  &:after {
    display: table;
    clear: both;
    content: "";
  }

  position: relative;
  width: 100%;
  height: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .layout1 {
    height: 100%;
    padding-top: $navHeight;
  }
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

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
