<!--
 * @Author: jasper
 * @Date: 2022-03-29 15:29:39
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-07 11:31:57
 * @FilePath: /vite-vue3-pc-template/src/layout/components/side_bar/SidebarItemLink.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved. 
-->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isExternal } from "@/utils/validate";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const push = () => {
      console.log(props.to);
      router.push(props.to).catch((err) => {
        console.log(err);
      });
    };
    return {
      push,
      isExternal,
    };
  },
});
</script>
