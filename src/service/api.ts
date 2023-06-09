import { useCallback } from "react";
import {
  SysParmsAddReq,
  SysParmsGetRes,
  SysParmsGetReq,
  AdjustMappingGetRes,
  AdjustMappingGetReq,
  AdjustMappingAddReq,
} from "./model";
import useRequest from "./request";

const useApi = () => {
  const { GET, POST, PUT, DELETE } = useRequest();
  
  const sysParms_add = useCallback(
    (data: SysParmsAddReq) => {
      return POST("/sys/param/8a6346822a0b4aadb9ed24bafa7511e7", data);
    },
    [POST]
  );

  const sysParms_update = useCallback(
    (data: SysParmsAddReq) => {
      return PUT("/sys/param/8a6346822a0b4aadb9ed24bafa7511e7", data);
    },
    [PUT]
  );

  const sysParms_get = useCallback((data: SysParmsGetReq) => {
    return GET<SysParmsGetRes>(
      "/sys/param/8a6346822a0b4aadb9ed24bafa7511e7/page",
      data
    );
  }, [GET]);

  const adjustMapping_get = useCallback(
    (data: AdjustMappingGetReq) => {
      return GET<AdjustMappingGetRes>(
        "/sys/adjustappeventmapping/8c7dff7a01f2483aa1698799faf3667d/page",
        data
      );
    },
    [GET]
  );

  const adjustMapping_add = useCallback(
    (data: AdjustMappingAddReq) => {
      return POST(
        "/sys/adjustappeventmapping/8c7dff7a01f2483aa1698799faf3667d/",
        data
      );
    },
    [POST]
  );

  const adjustMapping_update = useCallback(
    (data: AdjustMappingAddReq) => {
      return PUT(
        "/sys/adjustappeventmapping/8c7dff7a01f2483aa1698799faf3667d/",
        data
      );
    },
    [PUT]
  );

  const adjustMapping_delete = useCallback(
    (id: number) => {
      return DELETE(
        "/sys/adjustappeventmapping/8c7dff7a01f2483aa1698799faf3667d/",
        id.toString()
      );
    },
    [DELETE]
  );

  return {
    sysParms_get,
    sysParms_add,
    sysParms_update,
    adjustMapping_get,
    adjustMapping_add,
    adjustMapping_update,
    adjustMapping_delete,
  };
};

export default useApi;
