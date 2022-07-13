import type { App } from "vue";
import DumplingPlus from "dumpling-plus";
import { downloadResponseById, uploadFile } from "@/apis/common";

export default function loadComponent(app: App<Element>): void {
  app.use(DumplingPlus, { downloadResponseById, uploadFile });
  // app.use(DumplingPlus);
}
