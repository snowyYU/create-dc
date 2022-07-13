<!--
 * @Author: jasper
 * @Date: 2022-04-12 17:26:01
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-06 19:13:28
 * @FilePath: /vite-vue3-pc-template/src/layout/LayoutWithFullScreen.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<script lang="ts">
export default {
  name: "LayoutWithFullScreen",
};
</script>
<template>
  <div class="full-screen-layout">
    <router-view />
  </div>
</template>

<script type="ts" setup></script>
<style lang="scss" scoped>
.full-screen-layout {
  height: 100%;
}
</style>
