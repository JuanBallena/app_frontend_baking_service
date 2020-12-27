import { Activity, toActivityModel } from '@/models/Activity';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    activities: [] as Activity[],
    totalPages: -1,
    activity: {} as Activity,
    errorsMessage: [] as string[],
    successfulRegistration: false
  },

  mutations: {
    SET_ACTIVITIES(state: { activities: Activity[] }, data: any[]) {
      state.activities = [];
      data.forEach((activityDto) => { state.activities.push(toActivityModel(activityDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    },

    SET_ACTIVITY(state: { activity: Activity }, data: any) {
      state.activity = toActivityModel(data);
    },

    SET_ERRORS_MESSAGE(state: { errorsMessage: string[] }, data: any) {
      state.errorsMessage = data;
    },

    SET_SUCCESSFUL_REGISTRATION(state: { successfulRegistration: boolean }, data: any) {
      state.successfulRegistration = data;
    }
  },

  actions: {
    async getActivities({ commit }: any, requestParameters: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/activities${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_ACTIVITIES', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        } 
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async saveActivity({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addActivityNode(dataPost);
        const res = await axios.post(Api.getUrlApi() + `/activities`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
        
        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
        } 

        if (Response.badRequest(responseCode)) {
          commit('SET_ERRORS_MESSAGE', res.data['errorsMessage']);
        }

        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async updateActivity({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addActivityNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/activities/${ dataPost['idActivity'] }`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
        
        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_ACTIVITY', res.data['data']);
        } 

        if (Response.badRequest(responseCode)) {
          commit('SET_ERRORS_MESSAGE', res.data['errorsMessage']);
        }

        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },
  }
}