import { useMessage } from "@/use/useMessage/useMessage";
import Axios, { AxiosRequestConfig } from "axios";
import { useCallback } from "react";

type resType<T> = {
  status: number;
  data: { data: T; message: string; };
};
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
});
const useRequest = () => {
  const { messageApi } = useMessage()

  const handleResult = useCallback(<T>(result: resType<T>) => {
    if (result.status !== 200) {
      messageApi.error(result.data.message)
    }
    return result.data;
  }, [messageApi])

  const POST = useCallback(async <T>(
    url: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) => {
    const result: resType<T> = await axios.post(url, data, config);
    return handleResult<T>(result);
  }, [handleResult])


  const GET = useCallback(async <T>(
    url: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) => {
    const result: resType<T> = await axios({
      method: "get",
      url: url,
      params: data,
      ...config,
    });
    return handleResult<T>(result);
  }, [handleResult]);

  const PUT = useCallback(async <T>(
    url: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) => {
    const result: resType<T> = await axios({
      method: "put",
      url: url,
      data: data,
      ...config,
    });
    return handleResult<T>(result);
  }, [handleResult]);

  const DELETE = useCallback(async <T>(
    url: string,
    data?: string,
    config: AxiosRequestConfig = {}
  ) => {
    const result: resType<T> = await axios({
      method: "delete",
      url: url + (data || ''),
      ...config,
    });
    return handleResult<T>(result);
  }, [handleResult]);

  return {
    POST,
    GET,
    PUT,
    DELETE,
  }
}


export default useRequest;
