// import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component

// register globally
// Vue.component("svg-icon", SvgIcon);

// const req = require.context("./svg", false, /\.svg$/);
const req = import.meta.globEager("./svg/*.svg");
console.log(req);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
