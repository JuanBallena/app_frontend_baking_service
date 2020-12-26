import { Parameter, toParameterModel } from '@/models/Parameter';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    parameters: [] as Parameter[],
    totalPages: -1
  },

  mutations: {
    SET_PARAMETERS(state: { parameters: Parameter[] }, data: any[]) {
      state.parameters = [];
      data.forEach((parameterDto) => { state.parameters.push(toParameterModel(parameterDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    }
  },

  actions: {
    async getParameters({ commit }: any, requestParameters: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/parameters${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_PARAMETERS', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },
  }
}