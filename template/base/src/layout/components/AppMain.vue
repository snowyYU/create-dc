<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive :include="cachedViews()"> -->
        <component v-if="route.matched.length > 0" :is="Component" />
        <div v-else>Not Found</div>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
    <!-- <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews()">
        <router-view :key="key" />
      </keep-alive>
    </transition> -->
  </section>
</template>

<script lang="ts">
// import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    // const store = useStore();
    const route = useRoute();
    // const cachedViews = () => {
    //   return store.state.tagViews.cachedViews;
    // };
    const key = () => {
      return route.path;
    };
    return {
      // cachedViews,
      key,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 100%;
}

// .fixed-header + .app-main {
//   // padding-top: 50px;
//   height: calc(100vh - 50px);
//   overflow: auto;
// }

// .hasTagsView {
//   .app-main {
//     /* 84 = navbar + tags-view = 50 + 34 */
//     min-height: calc(100vh - 84px);
//   }

//   .fixed-header + .app-main {
//     padding-top: 84px;
//   }
// }
</style>
