/*
 * @Author: jasper
 * @Date: 2022-03-29 15:48:27
 * @LastEditors: jasper
 * @LastEditTime: 2022-04-13 17:30:16
 * @FilePath: /vite-vue3-pc-template/src/utils/request.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import axios from "axios";
// import axios, { AxiosResponse, Method } from 'axios'
import { ElMessage } from "element-plus";
import portal from "@/utils/gateway";
import { getToken } from "./cookies";
import sysConfig from "@/config";
import {
  queryDoorInfoApiUrl,
  queryAppInfoApiUrl,
  queryUserIdentityInfoApiUrl,
  getDoorResourcesTreeBySystemApiUrl,
  loginoutApiUrl,
} from "@/apis/system";
// create an axios instance
const controller = new AbortController();
const service = axios.create({
  // baseURL: `${import.meta.env.VITE_APP_BASE_API}`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  headers: { DomainSign: sysConfig.domainSign, token: getToken() as string },
  signal: controller.signal,
});

const baseURL = import.meta.env.VITE_APP_BASE_API;

const authList = [
  queryDoorInfoApiUrl,
  queryAppInfoApiUrl,
  queryUserIdentityInfoApiUrl,
  getDoorResourcesTreeBySystemApiUrl,
  loginoutApiUrl,
];
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (!config.url) return config;
    if (authList.includes(config.url)) {
      config.url = baseURL + config.url;
    } else {
      config.url = `${baseURL}/${sysConfig.domainSign}${config.url}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data || {};
    // 需要登出的状态码
    // 2104 身份失效
    // 2105 用户在别处登录
    const logoutStatus = [2100, 2101, 2102, 2104, 2105];
    // 未登录
    if (logoutStatus.includes(res.code)) {
      // 跳转到权限系统
      alert(res.msg);
      // 取消请求
      controller.abort();
      portal.goLogin();
    }
    if (res.code === "403") {
      // 没有权限
      ElMessage.error("抱歉，你没有权限访问本系统");
      setTimeout(() => {
        portal.loginout();
      }, 2000);
    }
    if (res.code === "0") {
      // 其他权限异常
      if (
        response.data.msg.indexOf("失效") > -1 ||
        response.data.msg.indexOf("无效") > -1 ||
        response.data.msg.indexOf("过期") > -1
      ) {
        portal.loginout();
      } else {
        ElMessage.error(response.data.msg);
      }
    }
    if (res.code !== 200) {
      ElMessage({
        type: "error",
        message: res.msg,
      });
      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 10 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
