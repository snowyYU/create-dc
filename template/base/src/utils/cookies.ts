import Cookies from "js-cookie";

export const getSidebarStatus = () => Cookies.get("sidebarStatusKey");
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set("sidebarStatusKey", sidebarStatus);

export const getLanguage = () => Cookies.get("languageKey");
export const setLanguage = (language: string) =>
  Cookies.set("languageKey", language);

export const getSize = () => Cookies.get("sizeKey");
export const setSize = (size: string) => Cookies.set("sizeKey", size);

export const getToken = () => Cookies.get("token");
export const setToken = (token: string) => Cookies.set("token", token);
export const removeToken = () => Cookies.remove("token");
