<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Navbar />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- <div :class="{ hasTagsView: showTagsView }" class="main-container"> -->
      <!-- <div :class="{ 'fixed-header': fixedHeader }"> -->
      <!-- <TagsView v-if="showTagsView" /> -->
      <!-- </div> -->
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { DeviceType } from "@/stores/app";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
} from "vue";
import { useAppStore } from "@/stores/app";
import { AppActionTypes } from "@/stores/app/action-types";

import { AppMain, Navbar, Sidebar } from "./components";
import resize from "./resize";
export default defineComponent({
  name: "layout-with-nav-sidebar",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    // TagsView,
  },
  setup() {
    const appStore = useAppStore();
    const {
      sidebar,
      device,
      addEventListenerOnResize,
      resizeMounted,
      removeEventListenerResize,
      watchRouter,
    } = resize();

    const handleClickOutside = () => {
      appStore[AppActionTypes.CLOSE_SIDEBAR](false);
    };

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === DeviceType.Mobile,
      };
    });

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
      classObj,
      sidebar,
      handleClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  // height: 100%;
  width: 100%;
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

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: $sideBarWidth;
  padding-top: $navHeight;

  transition: margin-left 0.28s;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $sideBarWidth !important;
  height: 100%;
  overflow: hidden;
  font-size: 0px;
  background-color: $menuBg !important;
  transition: width 0.28s;
}

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 1001;
//   // z-index: 9;
//   width: 100%;
//   // width: calc(100% - #{$sideBarWidth});
//   transition: width 0.28s;
// }

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
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

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
