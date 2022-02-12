import * as types from "@/store/types";
import axios from "axios";
import shortly from "vuex-shortly";
import {
    setInterceptors
} from "@/plugins/axios";

const resourceApi = axios.create({
    baseURL: process.env.VUE_APP_VIDEOS_API_REST
});
const resourcePath = "videos";

setInterceptors(resourceApi);

const resourceTypes = {
    LIST: types.VIDEOS_LIST,
    CREATE: types.VIDEOS_CREATE,
    UPDATE: types.VIDEOS_UPDATE,
    DELETE: types.VIDEOS_DELETE
}


// SHOULD NOT NEED TO CHANGE BELOW
const state = {
    [`${resourcePath}_list`]: [],
};

const getters = {
    [resourceTypes.LIST]: `${resourcePath}_list`,
};

const mutations = {
    [resourceTypes.LIST]: `${resourcePath}_list`
};

const actions = {
    [resourceTypes.LIST]: async ({
        commit
    }) => {
        const response = await resourceApi.get(`/${resourcePath}`);
        const results = response.data.results;
        console.log(results)
        commit(resourceTypes.LIST, results);
        return response;
    },
    [resourceTypes.CREATE]: async (ctx, payload) => {
        const response = await resourceApi.post(`/${resourcePath}`, payload);
        return response;
    },
    [resourceTypes.UPDATE]: async (ctx, { id, payload }) => {
        const response = await resourceApi.patch(`/${resourcePath}/${id}`, payload);
        return response;
    },
    [resourceTypes.DELETE]: async (ctx, { id }) => {
        const response = await resourceApi.delete(`/${resourcePath}/${id}`);
        return response;
    },
};

export default shortly({
    state,
    getters,
    mutations,
    actions
});
