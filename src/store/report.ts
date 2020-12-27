import { Report, toReportModel } from '@/models/Report';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    reports: [] as Report[],
    totalPages: -1
  },

  mutations: {
    SET_REPORTS(state: { reports: Report[] }, data: any[]) {
      state.reports = [];
      data.forEach((reportDto) => { state.reports.push(toReportModel(reportDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    }
  },

  actions: {
    async getReports({ commit }: any) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/reports`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_REPORTS', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },
  }
}