import request from "@/utils/request";

/**
 * 根据id下载文档
 * @param params
 * @returns
 */
export function downloadResponseById(params: any) {
  return request.request({
    url: "/global/uploadFile" + params.id,
    method: "get",
    responseType: "blob",
    params,
  });
}

/**
 * 文件上传
 * @param data
 * @param onUploadProgress
 * @returns
 */
export function uploadFile(data: any, onUploadProgress: any) {
  return request.request({
    url: "/global/uploadFile",
    method: "post",
    data,
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
