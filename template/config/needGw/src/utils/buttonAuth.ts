/*
 * @Author: jasper
 * @Date: 2022-08-31 10:07:00
 * @LastEditors: jasper
 * @LastEditTime: 2022-08-31 10:11:14
 * @FilePath: /create-dc/template/config/needGw/src/utils/buttonAuth.ts
 * @Description:
 *
 */
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

const appStore = useAppStore();

// 示例，const showDetailOperate = ref(buttonAuth.filterSingleAuth("name", "详情"));

export const buttonAuth = {
  getCurrPath: () => {
    return useRoute().path;
  },
  getRoutesFromApi: () => {
    return appStore.routesFromApi;
  },
  getButtons: (currPath, originalList) => {
    let buttons = [];
    const findButtons = (list) => {
      let hasFind = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].routePath === currPath) {
          buttons = list[i].buttonList || [];
          hasFind = true;
          break;
        }
        if (list[i].children && list[i].children.length) {
          const childrenFind = findButtons(list[i].children);
          if (childrenFind) {
            break;
          }
        }
      }
      return hasFind;
    };
    findButtons(originalList);
    return buttons;
  },
  getAuthButtons: () => {
    const currPath = buttonAuth.getCurrPath();
    const routesFromApi = buttonAuth.getRoutesFromApi();
    console.log("9999:", "currPath:", currPath, "routesFromApi:", routesFromApi);
    return buttonAuth.getButtons(currPath, routesFromApi);
  },
  /**
   * 匹配单个按钮权限
   * @param key
   * @param val
   */
  filterSingleAuth: (key, val) => {
    const buttons = buttonAuth.getAuthButtons();
    let hasFind = false;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i][key] === val) {
        hasFind = true;
        break;
      }
    }
    return hasFind;
  },
  /**
   * 匹配整个按钮列表权限（需要指定列表中匹配的key和匹配的列表）
   * @param key
   * @param list
   */
  filterListAuth: (key, list) => {
    const authList = [];
    const buttons = buttonAuth.getAuthButtons();
    if (list && list.length && buttons && buttons.length) {
      const findIndex = (listItem) => {
        let indexRes = -1;
        buttons.forEach((item, index) => {
          if (item[key] === listItem[key]) {
            indexRes = index;
          }
        });
        return indexRes;
      };
      list.forEach((item) => {
        if (findIndex(item) > -1) {
          authList.push(item);
        }
      });
    }
    return authList;
  },
};
