<!--
 * @Author: jasper
 * @Date: 2022-06-08 08:57:27
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-29 18:04:12
 * @FilePath: /vite-vue3-pc-template/src/components/SvgIcon/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<template>
  <!-- <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg> -->
  <!-- <el-icon v-bind="$attrs">
    <Async style="background-size: 1em 1em"></Async>
  </el-icon>
  <div class="svg-icon">
    <Async></Async>
  </div> -->
  <!-- <Async style="background-size: 1em 1em"></Async> -->

  <Async v-bind="$attrs" class="icon"></Async>
</template>
<script lang="ts">
export default {
  name: "SvgIcon",
};
</script>
<script setup lang="ts">
/// <reference types="vite-svg-loader" />
// import dashboard from "@/assets/svg/dashboard.svg?component";

import { computed, defineAsyncComponent } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const Async = defineAsyncComponent(() => {
  if (/^custom-/.test(props.name)) {
    return import(`../../assets/svg/${props.name.split("custom-")[1]}.svg`);
  } else {
    return import("@element-plus/icons-vue").then((res) => {
      return res[props.name];
    });
  }
});

// 处理 svg 图标

// const localSvgs = import.meta.glob("../../assets/svg/*.svg", {
//   as: "component",
// });

// console.log(localSvgs);
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
.icon {
  width: 2em;
  height: 2em;
}
</style>
