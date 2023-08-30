import { useCallback } from "react";
import {
  SiderMessageList_res,
  SiderMessageList_req
} from "./model";
import useRequest from "./request";

const useApi = () => {
  const { GET, POST, PUT, DELETE } = useRequest();

  const getSiderMessageList = useCallback((data: SiderMessageList_req) => {
    return GET<SiderMessageList_res[]>(
      "messageList",
      data
    );
  }, [GET]);


  return {
    getSiderMessageList,
  };
};

export default useApi;
