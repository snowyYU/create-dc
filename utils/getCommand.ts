/*
 * @Author: jasper
 * @Date: 2022-07-13 20:16:31
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-13 20:16:32
 * @FilePath: /create-dc/utils/getCommand.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
export default function getCommand(packageManager, scriptName) {
  if (scriptName === "install") {
    return packageManager === "yarn" ? "yarn" : `${packageManager} install`;
  }

  return packageManager === "npm" ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`;
}
