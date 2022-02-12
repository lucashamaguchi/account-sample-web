import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import * as Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const cookieKey = "HAMA_" + process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === "development";
const cookieOptions = {
    domain: isDev ? ".hamaguchi.local" : ".hamaguchi.com.br",
    expires: 3,
    secure: !isDev,
    SameSite: 'strict'
};


const store = new Vuex.Store({
    strict: true,
    modules,
    plugins: [
        createPersistedState({
            key: cookieKey,
            paths: ["auth.token", "auth.user"],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => {
                    if (key.length > 2) {
                        return Cookies.set(key, value, cookieOptions)
                    }
                },
                removeItem: key => Cookies.remove(key)
            }
        }),
    ]
});

export default store;
