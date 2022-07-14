/*
 * @Author: jasper
 * @Date: 2022-04-07 18:46:10
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-14 10:16:07
 * @FilePath: /create-dc/template/base/src/config/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */

interface Config {
  //顶部导航菜单是否开启
  navMenuEnable: boolean;
  loginPath: string;
  domainSign: string;
}

const config: Config = {
  //顶部导航菜单是否开启
  navMenuEnable: true,
  loginPath: "/portal-view",
  domainSign: "template-v3",
};

export default config;
