<!--
 * @Author: jasper
 * @Date: 2022-04-01 09:06:54
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-12 17:02:47
 * @FilePath: /vite-vue3-pc-template/src/components/screenfull/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<template>
  <div id="screenfull" @click="click">
    <template v-if="isFullscreen">
      <el-icon :size="20"><FullScreen /></el-icon>

      <!-- <svg class="icon" aria-hidden="true" font-size="40px">
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg> -->
    </template>
    <template v-else>
      <el-icon :size="20"><FullScreen /></el-icon>

      <!-- <svg class="icon" aria-hidden="true" font-size="40px">
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg> -->
    </template>
  </div>
</template>

<script lang="ts">
import screenfull from "screenfull";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from "vue";
import { ElMessage } from "element-plus";
import { FullScreen } from "@element-plus/icons-vue";
const sf = screenfull;
export default defineComponent({
  name: "screenfull-component",
  components: {
    FullScreen,
  },
  setup() {
    const state = reactive({
      isFullscreen: false,
      click: () => {
        if (!sf.isEnabled) {
          ElMessage({
            message: "you browser can not work",
            type: "warning",
          });
          return false;
        }
        sf.toggle();
      },
    });
    const change = () => {
      if (sf.isEnabled) {
        state.isFullscreen = sf.isFullscreen;
      }
    };
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on("change", change);
      }
    });

    onBeforeUnmount(() => {
      if (sf.isEnabled) {
        sf.off("change", change);
      }
    });

    return {
      FullScreen,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
#screenfull {
  display: flex;
  align-items: center;
}
</style>
