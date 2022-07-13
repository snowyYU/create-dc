// Parse the time to string
export const parseTime = (
  time?: string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date: Date;
  if (typeof time === "object") {
    date = time as Date;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return timeStr;
};

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      if (key === "timestamp") {
        return parseTime(data[key]);
      } else {
        return data[key];
      }
    })
  );

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += " " + className;
};

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
};

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return;
  }
  let classString = ele.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  ele.className = classString;
};

/**
 * 获取地址栏参数 param 的值
 * @param param
 */
export const getParamByURL = (param: string) => {
  // 获取地址栏上的参数
  if (!window.location.search && !window.location.hash) return "";
  const urlParams = window.location.search
    ? window.location.search.split("?")[1]
    : window.location.hash.split("?")[1];
  if (!urlParams) return "";
  const reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
  const r = urlParams.match(reg);
  if (r != null) return r[2].replace(`?${param}=`, "");
  return "";
};

/**
 * 驼峰转短横线
 * @param { string } str
 */
export function camelCaseToKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (item) => `-${item.toLowerCase()}`);
}

/**
 * 短横线转驼峰
 * @param { string } str
 */
export function kebabCaseToCamelCase(str: string) {
  return str.replace(/-[a-z]/g, (item) => item.replace("-", "").toUpperCase());
}

export function copyValues<T>(
  a: { [propName: string]: unknown },
  b: { [propName: string]: unknown }
) {
  const c: { [propName: string]: unknown } = {};
  Object.keys(a).forEach((key) => {
    if (typeof b[key] !== "undefined" && b[key] !== "null" && b[key] !== "") {
      c[key] = b[key];
    } else {
      c[key] = a[key];
    }
  });
  return c as unknown as T;
}

/**
 * Base64 转 Blob
 * @param base64
 * @param MIMEType
 * @returns
 */
export function base64toBlob(base64: string, MIMEType?: string) {
  // 将base64转为Unicode规则编码
  const bstr = window.atob(base64);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 转换编码后才可以使用charCodeAt 找到Unicode编码
  }
  if (MIMEType) {
    return new Blob([u8arr], {
      type: MIMEType,
    });
  } else {
    return new Blob([u8arr]);
  }
}
