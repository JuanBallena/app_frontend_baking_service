import { Setting, toSettingModel } from '@/models/Setting';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    settings: [] as Setting[],
    totalPages: -1,
    successfulRegistration: false
  },

  mutations: {
    SET_SETTINGS(state: { settings: Setting[] }, data: any[]) {
      state.settings = [];
      data.forEach((settingDto) => { state.settings.push(toSettingModel(settingDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    },

    SET_SUCCESSFUL_REGISTRATION(state: { successfulRegistration: boolean }, data: any) {
      state.successfulRegistration = data;
    },
  },

  actions: {
    async getSettings({ commit }: any, requestParameters: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/settings${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_SETTINGS', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async updateSettingValue({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addSettingNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/settings/${ dataPost['idSetting'] }/value`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];

        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },
  }
}