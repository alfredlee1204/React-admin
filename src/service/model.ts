interface PageType  {
  totalPages: number;
  totalElements: number;
  number:number,
  size: number;
}

// 系统参数管理接口
export type SysParmsAddReq = {
  id?:number
  code: string;
  value: string;
  remark: string;
};

export type SysParmsGetReq = {
  pageNo?: number;
  pageSize?: number;
};

export type SysParmsGetRes = {
  totalPages: number;
  totalElements: number;
  number:number,
  size: number;
  content: SysParmsGetContent[];
};

export type SysParmsGetContent = {
    id: number;
    code: string;
    value: string;
    remark: string;
    createBy: string;
    createDate: string;
    updateBy: string;
    updateDate: string;
    delFlag: number;
}

// Adjust应用事件映射管理接口

export type AdjustMappingGetReq = {
  pageNo?: number;
  pageSize?: number;
};

export interface AdjustMappingGetRes extends PageType  {
  content: SysParmsGetContent[];
}

export type AdjustMappingGetContent = {
  id: number;
  appToken: string;
  eventId: string;
  eventToken: string;
  createDate	: string;
  delFlag: string;
}

export type AdjustMappingAddReq = {
  id?:number
  appToken: string;
  eventId: string;
  eventToken: string;
};
