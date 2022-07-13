<!--
 * @Author: jasper
 * @Date: 2022-04-12 17:26:01
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-12 17:31:16
 * @FilePath: /vite-vue3-pc-template/src/layout/LayoutWithIframe.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<template>
  <iframe class="iframe" :src="iframeSrc"></iframe>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const iframeSrc = computed(() => {
  if (route.meta && route.meta.iframeLink) {
    return route.meta.iframeLink as string;
  }
  return "";
});
</script>

<style lang="scss" scoped>
.iframe {
  border: 0;
  width: 100%;
  height: calc(100vh - 52px);
}
</style>
