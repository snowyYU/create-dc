<template>
  <div class="sideWrap">
    <!-- <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        background-color="#ffffff"
        text-color="#162B64"
        active-text-color="#57CAEB"
        mode="vertical"
        @select="handleMenuSelect"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="!isCollapse"
          :is-first-level="true"
        />
      </el-menu>
    </el-scrollbar>
    <div>
      <Hamburger
        id="hamburger-container"
        :is-active="appStore.sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Hamburger from "@/components/hamburger/index.vue";

import SidebarItem from "./SidebarItem.vue";
// import SidebarLogo from './SidebarLogo.vue'
// import variables from "@/styles/_variables.scss";
import { useAppStore } from "@/stores/app";
import { AppActionTypes } from "@/stores/app/action-types";

import { useRoute, useRouter, type RouteRecordRaw } from "vue-router";

import config from "@/config";

export default defineComponent({
  name: "side-bar",
  components: {
    Hamburger,
    SidebarItem,
    // SidebarLogo
  },
  setup() {
    const appStore = useAppStore();

    const route = useRoute();
    const router = useRouter();

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
      }
      return path;
    });

    const isCollapse = computed(() => {
      return appStore.sidebar.opened;
    });
    const toggleSideBar = () => {
      appStore[AppActionTypes.TOGGLE_SIDEBAR](false);
    };
    const routes = computed(() => {
      const routes = router.getRoutes();
      if (config.navMenuEnable && route.path) {
        let filterRoutes: RouteRecordRaw[] = [];
        const parentPath = "/" + route.path.split("/")[1];
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i];
          if (route.path === parentPath) {
            filterRoutes = route.children;
            break;
          }
        }
        return filterRoutes;
      } else {
        return router.options.routes;
      }
    });

    // 获取选中path的 RouteRecordRaw 对象
    const getDeepRoute = (routes: RouteRecordRaw[], path: string) => {
      let target: RouteRecordRaw | any = undefined;
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];

        if (route.path === path) {
          target = route;
          break;
        }

        if (route.children && Array.isArray(route.children)) {
          const temp = getDeepRoute(route.children, path);
          if (temp) {
            target = temp;
            break;
          }
        }
      }
      return target;
    };
    // 菜单选中
    const handleMenuSelect = (path: string) => {
      const target = getDeepRoute(routes.value || [], path);
      if (target && target.meta && target.meta.outsideLink) {
        window.open(`${target.meta.outsideLink}`);
        return;
      }

      if (activeMenu.value !== path) {
        router.push(path);
      }
    };

    return {
      appStore,
      activeMenu,
      isCollapse,
      routes,
      toggleSideBar,
      handleMenuSelect,
    };
  },
});
</script>

<style lang="scss">
.sidebar-container {
  padding-top: 52px;
  // reset element-ui css
  box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 25%), 1px 3px 4px 0px #eceef1;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}

.el-menu {
  width: 100% !important;
  height: 100%;
  border: none;
}
.hamburger-container {
  position: absolute;
  bottom: 0;
  left: 0;
  // height: 100%;
  padding: 0 15px;
  line-height: 46px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
