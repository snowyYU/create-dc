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
// create an axios instance
const controller = new AbortController();
const service = axios.create({
  // baseURL: `${import.meta.env.VITE_APP_BASE_API}`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  signal: controller.signal,
});

const baseURL = import.meta.env.VITE_APP_BASE_API;

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (!config.url) return config;
    config.url = baseURL + config.url;
    
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
    return response.data;
    
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
