/*
 * @Author: jasper
 * @Date: 2022-04-07 18:46:10
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-28 17:13:53
 * @FilePath: /vite-vue3-pc-template/src/config/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */

interface Config {
  //顶部导航菜单是否开启
  navMenuEnable: boolean;
  //DomainSign
  domainSign: string;
  //开启平台管理对接部分，涉及的文件夹如下
  // 1.src/router/index.ts
  // 2.src/utils/prerequest.ts
  // 3.src/utils/request.ts
  enableSso: boolean;
}

const config: Config = {
  //顶部导航菜单是否开启
  navMenuEnable: true,
  //DomainSign
  domainSign: "template-v3",
  //开启平台管理对接部分
  enableSso: true,
};

export default config;
