<template>
  <dp-dialog
    class="map-dialog"
    v-bind="dialogProps"
    @opened="handleOpened"
    @confirm="handleConfirm"
    @cancel="handleClose"
    @close="handleClose"
    @closed="handleClosed"
  >
    <BaseMap
      class="map-dialog__map"
      ref="map"
      :readonly="mode === 'view'"
      :show-search-bar="mode !== 'view'"
      @complete="handleMapComplete"
      @change="handleMapChange"
    />
  </dp-dialog>
</template>

<script>
import DpDialog from "@/packages/dialog/src/index.vue";
import BaseMap from "@/components/BaseMap";

export default {
  name: "MapDialog",
  components: {
    DpDialog,
    BaseMap,
  },
  props: {
    dialogProps: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: "",
    },
    lnglat: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      address: "",
    };
  },
  methods: {
    handleOpened() {
      this.$refs.map.create();
    },

    handleConfirm() {
      this.$emit("confirm", { lnglat: this.lnglat, address: this.address });
    },

    handleClose() {
      this.$emit("close");
    },

    handleClosed() {
      this.address = "";
      this.$refs.map.destroy();
      this.$emit("closed");
    },

    handleMapComplete() {
      if (this.lnglat && this.lnglat.lng) {
        const { lng, lat } = this.lnglat;
        this.$refs.map.setCenter(lng, lat);
        this.$refs.map.drawMarker(lng, lat);
        this.$nextTick(() => {
          this.$refs.map
            .getAddressByLnglat(lng, lat)
            .then((res) => {
              this.address = res.regeocode.formattedAddress;
            })
            .catch(() => {
              this.$message.error("无法获取位置信息");
            });
        });
      }
    },

    handleMapChange(_, lnglat) {
      this.$emit("update:lnglat", lnglat);
      const { lng, lat } = lnglat;
      this.$refs.map
        .getAddressByLnglat(lng, lat)
        .then((res) => {
          this.address = res.regeocode.formattedAddress;
        })
        .catch(() => {
          this.$message.error("无法获取位置信息");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-dialog {
  &__map {
    height: 50vh;
  }
}
</style>
