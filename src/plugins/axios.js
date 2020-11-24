import store from "@/store/index";
import { AUTH_TOKEN, AUTH_LOGOUT } from "@/store/types";
import router from "@/router/index";

export const setRequestInterceptor = ctx => {
    ctx.interceptors.request.use(
        config => {
            const interceptedConfig = config;
            const token = store.getters[AUTH_TOKEN];
            if (!interceptedConfig.login) {
                interceptedConfig.headers.common = {
                    Authorization: `${token}`
                };
            }
            return interceptedConfig;
        },
        error => Promise.reject(error)
    );
}

export const setResponseInterceptor = ctx => {
    ctx.interceptors.response.use(
        response => response,
        error => {
            if (401 === error.response.status) {
                store.dispatch(AUTH_LOGOUT);
                router.replace({ path: "/login" });
            }
            return Promise.reject(error);
        }
    );
}

export const setInterceptors = ctx => {
    setRequestInterceptor(ctx);
    setResponseInterceptor(ctx);
}
