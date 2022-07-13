<!--
 * @Author: jasper
 * @Date: 2022-03-29 10:13:28
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-07 16:44:23
 * @FilePath: /vite-vue3-pc-template/src/App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";

.el-menu-item:hover {
  outline: 0 !important;
  // color: #f0f3fa !important;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  background: #f0f3fa !important;
  border-radius: 8px !important;
  outline: 0 !important;
  outline: 0 !important;
}
.el-menu-item:hover {
  background: #f0f3fa !important;
  // border-radius: 8px !important;
  outline: 0 !important;
  outline: 0 !important;
}

.el-input.is-disabled .el-input__inner {
  color: #606266 !important;
}
.el-input-number .el-input__inner {
  text-align: left;
}
.el-range-editor.is-disabled input {
  color: #606266 !important;
}

.el-textarea.is-disabled .el-textarea__inner {
  color: #606266 !important;
}
</style>
