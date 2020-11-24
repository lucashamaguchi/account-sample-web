/* eslint-disable no-unused-vars */
import * as types from "@/store/types";
import axios from "axios";
import shortly from "vuex-shortly";
import store from "@/store/index";

const accountApi = axios.create({
    baseURL: process.env.VUE_APP_HAMAGUCHI_SAMPLE_ACCOUNT_REST
});


const state = {
    user: {},
    token: null,
};

const getters = {
    [types.AUTH_USER]: "user",
    [types.AUTH_TOKEN]: "token",
};

const mutations = {
    [types.AUTH_USER]: "user",
    [types.AUTH_TOKEN]: "token",
};

const actions = {
    [types.AUTH_LOGIN]: async ({ commit }, { email, password }) => {
        const response = await accountApi.post("/api/auth",
            { email, password }
        );
        const { token, ...userData } = response.data;

        commit(types.AUTH_TOKEN, token);
        commit(types.AUTH_USER, userData);
        return response;
    },
    [types.AUTH_SIGNUP]: async ({ commit }, { name, email, password }) => {
        const response = await accountApi.post("/api/account",
            { name, email, password }
        );
        const { token, ...userData } = response.data;

        commit(types.AUTH_TOKEN, token);
        commit(types.AUTH_USER, userData);
        return response;
    },
    [types.AUTH_CONFIRM_EMAIL]: async ({ commit }, { confirmToken, email }) => {
        const response = await accountApi.post("/api/account/confirm-email",
            { token: confirmToken, email }
        );
        const { token } = response.data;

        await commit(types.AUTH_TOKEN, token);
        store.dispatch(types.AUTH_VERIFY);
        return response;
    },
    [types.AUTH_FORGOT_PASSWORD]: async ({ commit }, {
        confirmToken, email, password, newPassword
    }) => {
        const response = await accountApi.post("/api/account/recover-account",
            { token: confirmToken, email, password, newPassword }
        );
        const { token } = response.data;

        await commit(types.AUTH_TOKEN, token);
        store.dispatch(types.AUTH_VERIFY);
        return response;
    },
    [types.AUTH_REQUEST_FORGOT_PASSWORD]: async ({ commit }, { email }) => {
        const response = await accountApi.post("/api/account/forgot-password",
            { email }
        );

        return response;
    },
    [types.AUTH_VERIFY]: async ({ commit }) => {
        const token = store.getters[types.AUTH_TOKEN];
        const response = await accountApi.get("/api/account", {
            headers: { Authorization: `${token}`},
        });
        const { ...userData } = response.data;
        commit(types.AUTH_USER, userData);
        return response;
    },
    [types.AUTH_LOGOUT]: ({ commit }) => {
        commit(types.AUTH_TOKEN, null);
        commit(types.AUTH_USER, {});
    },
    [types.AUTH_GOOGLE_LOGIN]: async () => {
        console.log(accountApi.defaults.baseURL)
        return accountApi.defaults.baseURL + "/api/sso/google";
    },
    [types.AUTH_FACEBOOK_LOGIN]: async () => {
        return accountApi.defaults.baseURL + "/api/sso/facebook";
    },
};

export default shortly({
    state,
    getters,
    mutations,
    actions
});
