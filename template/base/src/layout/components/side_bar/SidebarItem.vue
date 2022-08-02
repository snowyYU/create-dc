<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <!-- 叶子节点菜单（包括children属性只有一个成员的情况），收缩状态下的图标菜单走这里的逻辑 -->
    <SidebarItemLink
      v-if="
        !alwaysShowRootMenu && theOnlyOneChild && isLeaf && theOnlyOneChild.meta
      "
      :to="resolvePath(theOnlyOneChild.path)"
    >
      <!-- 处于第一层级，且收缩状态下的渲染逻辑 -->
      <el-tooltip
        v-if="theOnlyOneChild.meta.title && isFirstLevel && isCollapse"
        class="box-item"
        effect="dark"
        :content="theOnlyOneChild.meta.title"
        placement="right"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <!-- <svg
            v-if="theOnlyOneChild.meta.icon"
            class="icon"
            aria-hidden="true"
            font-size="17px"
          >
            <use :xlink:href="theOnlyOneChild.meta.icon" />
          </svg>
          <Share v-else style="width: 17px; height: 17px; margin-right: 8px" /> -->
          <SvgIcon
            v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          ></SvgIcon>
          <Share v-else style="width: 17px; height: 17px; margin-right: 8px" />
        </el-menu-item>
      </el-tooltip>
      <el-menu-item
        v-else-if="theOnlyOneChild.meta.title"
        :index="resolvePath(theOnlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': isFirstLevel }"
      >
        <!-- 这里可以加上 svg -->
        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
          class="menu-icon"
        ></SvgIcon>
        <span>{{ theOnlyOneChild.meta.title }}</span>
      </el-menu-item>
    </SidebarItemLink>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <!-- popper-append-to-body -->
      <template #title>
        <!-- <svg
          v-if="item.meta && item.meta.icon"
          class="icon"
          aria-hidden="true"
          font-size="16px"
        >
          <use :xlink:href="item.meta.icon" />
        </svg> -->

        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        ></SvgIcon>
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-collapse="isCollapse"
        :is-first-level="false"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import path from "path-browserify";
import { Share } from "@element-plus/icons-vue";
import { computed, type PropType } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  isCollapse: {
    type: Boolean,
    required: false,
  },
  isFirstLevel: {
    type: Boolean,
    required: false,
  },
  basePath: {
    type: String,
    required: true,
  },
});
const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true;
  } else {
    return false;
  }
});
// 计算出需要显示的下级菜单个数
const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        return true;
      }
    });
    return showingChildren.length;
  }
  return 0;
});

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child;
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already conatins item's path information
  return { ...props.item, path: "" };
});

// 没有子路由，或子路由全隐藏，则显示为叶子节点（因为可能出现children的children出现多个成员的问题）
const isLeaf = computed(() => {
  return (
    !(theOnlyOneChild as any).children ||
    (Array.isArray((theOnlyOneChild as any).children) &&
      !(theOnlyOneChild as any).children.some(
        (child: any) =>
          typeof child.meta.hiddren === "undefined" || !child.meta.hiddren
      ))
  );
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>

<style lang="scss" scoped>
.el-sub-menu.is-active > .el-sub-menu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-sub-menu > .el-sub-menu__title,
  .el-sub-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
  .el-menu-item {
    & > span {
      display: inline-block;
      padding-left: 5px;
    }
  }
  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none;
      }

      & > span {
        padding-left: 5px;
      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      position: relative;
      padding: 0 !important;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-sub-menu {
      overflow: hidden;

      & > .el-sub-menu__title {
        padding: 0px !important;

        .el-sub-menu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
svg {
  margin-right: 4px;
}

.menu-icon {
  width: 1em;
}

.simple-mode {
  svg {
    margin-left: 20px;
  }
}
</style>
