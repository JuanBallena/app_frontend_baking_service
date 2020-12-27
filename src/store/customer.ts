import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';
import { Customer, toCustomerModel } from '@/models/Customer';

export default {

  namespaced: true,

  state: {
    successfulRegistration: false,
    customer: {} as Customer,
    errorsMessage: [] as string[]
  },

  mutations: {

    SET_CUSTOMER(state: { customer: Customer }, data: number) {
      state.customer = toCustomerModel(data);
    },

    SET_SUCCESSFUL_REGISTRATION(state: { successfulRegistration: boolean }, data: any) {
      state.successfulRegistration = data;
    },

    SET_ERRORS_MESSAGE(state: { errorsMessage: string[] }, data: any) {
      state.errorsMessage = data;
    },
  },

  actions: {
    async updateCustomer({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addCustomerNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/customers/${ dataPost['idCustomer'] }`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];

        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_CUSTOMER', res.data['data']);
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