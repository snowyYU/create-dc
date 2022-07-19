declare namespace API {
  interface CommonResponse<T = boolean> {
    code: string;
    data: T;
    msg: string;
  }
  interface DoorInfo {
    id: string;
    name: string;
    icon: string;
  }
  interface RouteFromApi {
    appId: number;
    buttonList?: RouteFromApi[];
    check: number;
    children?: RouteFromApi[];
    code: string;
    createBy: string;
    createdByName: string;
    currentIdentityOwn: number;
    id: number;
    name: string;
    parentId: number;
    routePath: string;
    status: number;
    statusName: string;
    type: string;
    typeName: string;
    updateTime: string;
    menuType: string; //菜单类型 1 普通菜单 2 内嵌菜单 3 外链菜单
    menuTargetAddress: string;
    redirect?: string;
  }
  interface AppInfo {
    appId: number;
    path: string;
    code: string;
    name: string;
    state: number;
    type: number;
    isExternalSystem: number;
    loginUrl: string[];
    api: string[];
    usersType: number;
    sort: number;
    logo: string;
    applyBackgroundColor: string;
    remark: string;
    appKey: string;
    appSecret: string;
    id: number;
  }

  interface UserInfo {
    id: string;
    name: string;
    mobile: string;
    loginName: string;
    status: number;
    idCard: string;
    sex: number;
  }
}
