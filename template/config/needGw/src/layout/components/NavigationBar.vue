<template>
  <div class="navbar">
    <div class="title">{{ appStore.appInfo.name }}</div>
    <div class="center-menu" v-if="config.navMenuEnable">
      <el-menu :default-active="activeModule" mode="horizontal" @select="handleMenuSelect">
        <el-menu-item :index="route.path" v-for="route in routes" :key="route.path">
          {{ route.meta?.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-menu">
      <screen-full class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/avatar.gif" class="user-avatar" />
          <span class="user-nickname">{{ appStore.userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span style="display: block"> 退出 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "NavigationBar",
};
</script>
<script lang="ts" setup>
import ScreenFull from "@/components/screenfull/index.vue";
import { computed } from "vue";
import { useAppStore } from "@/stores/app";

import { AppActionTypes } from "@/stores/app/action-types";

import { useRoute, useRouter } from "vue-router";
import config from "@/config";
import portal from "@/utils/gateway";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const activeModule = computed(() => {
  if (route.path) {
    return "/" + route.path.split("/")[1];
  }
  return "";
});
const routes = computed(() => {
  return router.getRoutes().filter((route) => {
    return route.meta && route.meta.isModule && !route.meta.hidden;
  });
});
const logout = () => {
  appStore[AppActionTypes.LOGIN_OUT]().then(() => {
    portal.loginout();
  });
};
// 菜单选中
const handleMenuSelect = (index: string) => {
  const target = routes.value.find((route) => route.path === index);
  if (target && target.meta && target.meta.outsideLink) {
    window.open(`${target.meta.outsideLink}`);
    return;
  }

  if (activeModule.value !== index) {
    router.push(index);
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: relative;
  z-index: 1001;
  height: 50px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  background: #4a81fe;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .title {
    height: 100%;
    padding: 0 32px;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
  }

  .center-menu {
    flex: 1 0 auto;
    height: 100%;
    :deep() {
      .el-menu.el-menu--horizontal {
        border-bottom: none;
        background-color: #4a81fe;

        & > .el-menu-item {
          height: 52px;
          line-height: 52px;
          border-bottom: none;
          color: #ffffff;

          &.is-active {
            border-bottom: 2px solid #409eff;
            color: #4a81fe;
            background-color: #ffffff;
          }
        }

        & > .el-menu-item:not(.is-disabled):focus,
        & > .el-menu-item:not(.is-disabled):hover,
        & > .el-submenu .el-submenu__title:hover {
          color: #4a81fe;
          background-color: #ffffff;
        }
      }
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      line-height: 50px;

      padding: 0 8px;
      color: #fff;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 16px;
        margin-left: 16px;

        .user-avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
        .user-nickname {
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
