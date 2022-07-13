<template>
  <div class="base-chart" ref="chartRef"></div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "BaseChart",
  props: {
    // 自动初始化
    autoInit: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["complete"],
  setup(props, { emit }) {
    const chartRef = ref<HTMLElement>();
    let chart: echarts.EChartsType | null = null;
    const eventList = ref<any>([]);

    /**
     * 创建一个 ECharts 实例
     */
    const init = (cb?: (...args: any) => void) => {
      // chart = echarts.init(chartRef.value as HTMLElement);
      chart = markRaw(echarts.init(chartRef.value as HTMLElement));

      emit("complete");
      cb && cb();
    };

    /**
     * 设置图表实例的配置项以及数据
     */
    const setOption = (option: any) => {
      if (chart) {
        chart.setOption(option);
      }
    };

    /**
     * 添加事件
     * @param {string} eventName 事件名称
     * @param {string|object} query 可选的过滤条件，能够只在指定的组件或者元素上进行响应。
     * @param {function} handler 事件处理函数
     * @param {object} context 可选。回调函数内部的context，即this的指向。
     */
    // const on = (eventName: string, ...args: any) => {
    //   if (chart) {
    //     const event: any = { eventName };
    //     const handler = args.find((arg: any) => typeof arg === "function");
    //     if (handler) {
    //       event.handler = handler;
    //     }
    //     eventList.value.push(event);
    //     chart.on(eventName, ...args);
    //   }
    // };

    /**
     * 移除事件
     * @param {string} eventName 事件名称
     * @param {function} handler 可选，可以传入需要解绑的处理函数，不传的话解绑所有该类型的事件函数。
     */
    // const off = (eventName: string, handler: any) => {
    //   if (chart) {
    //     if (handler) {
    //       const index = eventList.value.findIndex(
    //         (event: any) =>
    //           event.eventName === eventName && event.handler === handler
    //       );
    //       if (index > -1) {
    //         eventList.value.splice(index, 1);
    //       }

    //       chart.off(eventName, handler);
    //     } else {
    //       eventList.value = eventList.value.filter(
    //         (event: any) => event.eventName !== eventName
    //       );

    //       chart.off(eventName);
    //     }
    //   }
    // };

    /**
     * 清空事件
     */
    // const clearEvent = () => {
    //   if (chart) {
    //     eventList.value.forEach((event: any) => {
    //       chart?.off(event.eventName, event.handler);
    //     });
    //     eventList.value = [];
    //   }
    // };

    /**
     * 改变图表尺寸，在容器大小发生改变时需要手动调用
     */
    const resize = () => {
      if (chart) {
        chart.resize();
      }
    };

    /**
     * 显示加载动画效果
     */
    const showLoading = () => {
      if (chart) {
        chart.showLoading();
      }
    };

    /**
     * 隐藏动画加载效果
     */
    const hideLoading = () => {
      if (chart) {
        chart.hideLoading();
      }
    };

    /**
     * 清空当前实例
     */
    const clear = () => {
      if (chart) {
        chart.clear();
      }
    };

    /**
     * 销毁实例
     */
    const dispose = () => {
      if (chart) {
        chart.dispose();
        chart = null;
      }
    };

    onMounted(() => {
      if (props.autoInit) {
        init();
      }
    });

    onUnmounted(() => {
      // clearEvent();
      dispose();
    });

    return {
      chartRef,
      chart,
      eventList,
      init,
      setOption,
      // on,
      // off,
      // clearEvent,
      resize,
      showLoading,
      hideLoading,
      clear,
      dispose,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
