import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    successfulSmsSending: false
  },

  mutations: {
    SET_SUCCESSFUL_SMS_SENDING(state: { successfulSmsSending: boolean }, data: any) {
      state.successfulSmsSending = data;
    }
  },

  actions: {
    async sendSms({ commit }: any, dataPost: any) {

      const dto = Node.addSmsNode(dataPost);
      try {
        const res = await axios.post(Api.getUrlApi() + `/sms/send`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode)) {
          commit('SET_SUCCESSFUL_SMS_SENDING', true);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },
  }
}