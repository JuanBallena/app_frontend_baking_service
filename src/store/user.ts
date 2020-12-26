import { AuthenticatedUser, toAuthenticatedUserModel } from '@/models/AuthenticatedUser';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    authenticatedUser: {} as AuthenticatedUser,
    successfulAuthentication: false,
    errorMessage: ''
  },

  mutations: {

    SET_SUCCESSFUL_AUTHENTICATION(state: { successfulAuthentication: boolean }, data: any) {
      state.successfulAuthentication = data;
    },

    SET_AUTHENTICATED_USER(state: { authenticatedUser: AuthenticatedUser }, data: any) {
      state.authenticatedUser = toAuthenticatedUserModel(data);
    },

    SET_ERROR_MESSAGE(state: { errorMessage: string }, data: any) {
      state.errorMessage = data;
    },
  },

  actions: {
    async login({ commit }: any, dataPost: object) {

      try {
        const dto = Node.addCredentailsNode(dataPost);
        const res = await axios.post(Api.getUrlApi() + `/login`, dto)
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_AUTHENTICATED_USER', res.data['data']);
          commit('SET_SUCCESSFUL_AUTHENTICATION', true);
          localStorage.setItem('token', res.data['token']);
        }

        if (Response.badRequest(responseCode)) {
          commit('SET_ERROR_MESSAGE', res.data['responseMessage']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    }
  }
}