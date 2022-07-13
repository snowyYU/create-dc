/**
 *  系统的全局设置size，全部加载方便设置。
 *  如需按需加载:
 *  1.放开注释
 *  2.引入babel-plugin-component库
 *  3.放开babel.config 注释
 */
import type { App } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
// import i18n from "@/locales";
import { useAppStore } from "@/stores/app";

// import { Search, Plus, ArrowDown } from "@element-plus/icons-vue";

export default function loadComponent(app: App<Element>) {
  app.use(ElementPlus, {
    size: useAppStore().size,
    locale: zhCn,
  });
  // app.component(Search.name, Search);
  // app.component(Plus.name, Plus);
  // app.component(ArrowDown.name, ArrowDown);
  // app.use(ElButton)
  // app.use(ElSelect)
  // app.use(ElBreadcrumb)
  // app.use(ElBreadcrumbItem)
  // app.use(ElIcon)
  // app.use(ElDropdown)
  // app.use(ElDropdownMenu)
  // app.use(ElDropdownItem)
  // app.use(ElPopover)
  // app.use(ElForm)
  // app.use(ElFormItem)
  // app.use(ElLoading)
  // app.use(ElInput)
  // app.use(ElTooltip)
  // app.use(ElDialog)
  // app.use(ElScrollbar)
  // app.use(ElMenu)
  // app.use(ElSubmenu)
  // app.use(ElMenuItem)

  // app.config.globalProperties.$message = ElMessage
}
