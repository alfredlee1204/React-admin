import { useCallback } from 'react';
import { post, get } from '../http'

export const useUserApi = () => {
    const login = useCallback(
        (data?: any) => {
            return post(
                "user/login",
                data
            );
        },
        [post]
    );

    return {
        login
    }
}