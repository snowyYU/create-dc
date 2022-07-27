/*
 * @Author: jasper
 * @Date: 2022-03-29 17:21:12
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-12 17:02:29
 * @FilePath: /vite-vue3-pc-template/src/apis/system.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import request from "@/utils/request";

// 获取应用所属门户的相关信息
export const queryDoorInfoApiUrl = "/system/system/v1/tenant/group/getDoor";
export function queryDoorInfo() {
  return request.request<any, API.CommonResponse<API.DoorInfo>>({
    url: queryDoorInfoApiUrl,
    method: "get",
  });
}

// 获取当前应用的相关信息
export const queryAppInfoApiUrl = "/system/system/v1/tenant/app/queryCurrentApp";
export function queryAppInfo() {
  return request.request<any, API.CommonResponse<API.AppInfo>>({
    url: queryAppInfoApiUrl,
    method: "get",
  });
}

// 获取用户基本信息以及校验
export const queryUserIdentityInfoApiUrl = "/system/user/v2/user/getUserInfoByToken";
export function queryUserIdentityInfo() {
  return request.request<any, API.CommonResponse<API.UserInfo>>({
    url: queryUserIdentityInfoApiUrl,
    method: "post",
  });
}
/**
 * 获取指定应用下的菜单信息
 * @param data
 * @returns {AxiosPromise}
 */
export const getDoorResourcesTreeBySystemApiUrl = "/system/user/v2/resource/queryRootMenu";

export function getDoorResourcesTreeBySystem() {
  return request.request<any, API.CommonResponse<API.RouteFromApi[]>>({
    url: getDoorResourcesTreeBySystemApiUrl,
    method: "post",
    data: {},
  });
}
// 退出接口
export const loginoutApiUrl = "/system/auth/logout";
export function loginout() {
  return request.request<any, API.CommonResponse<API.AppInfo>>({
    url: loginoutApiUrl,
    method: "get",
  });
}
