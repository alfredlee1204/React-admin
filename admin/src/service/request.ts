import { useMessage } from "@/use/useToast/useToast";
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
  const { toast } = useMessage()

  const handleResult = useCallback(<T>(result: resType<T>) => {
    if (result.status !== 200) {
      toast.error(result.data.message)
    }
    return result.data;
  }, [toast])

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
