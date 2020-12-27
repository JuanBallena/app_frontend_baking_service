import { BakeTicket, toBakeTicketModel } from '@/models/BakeTicket';
import * as Api from '@/api';
import * as Node from '@/node/index';
import * as Response from '@/api/serviceResponse';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    bakeTickets: [] as BakeTicket[],
    totalPages: -1,
    bakeTicket: {} as BakeTicket,
    errorsMessage: [] as string[],
    successfulRegistration: false
  },

  mutations: {
    SET_BAKE_TICKETS(state: { bakeTickets: BakeTicket[]; totalPages: number }, data: any[]) {
      state.bakeTickets = [];
      data.forEach((bakeTicketDto) => { state.bakeTickets.push(toBakeTicketModel(bakeTicketDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    },

    SET_BAKE_TICKET(state: { bakeTicket: BakeTicket }, data: any) {
      state.bakeTicket = toBakeTicketModel(data);
    },

    SET_SUCCESSFUL_REGISTRATION(state: { successfulRegistration: boolean }, data: any) {
      state.successfulRegistration = data;
    },

    SET_ERRORS_MESSAGE(state: { errorsMessage: string[] }, data: any) {
      state.errorsMessage = data;
    }
  },

  actions: {
    async getBakeTickets({ commit }: any, requestParameters: string) {
      
      try {
        const res = await axios.get(Api.getUrlApi() + `/bake-tickets${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_BAKE_TICKETS', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        } 
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async getBakeTicket({ commit }: any, idBakeTicket: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/bake-tickets/${ idBakeTicket }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_BAKE_TICKET', res.data['data']);
        } 
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async searchBakeTickets({ commit }: any, requestParameters: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/bake-tickets/search${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];

        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_BAKE_TICKETS', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        } 
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async saveBakeTickeAndCustomer({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addBakeTicketNode(dataPost);
        const res = await axios.post(Api.getUrlApi() + `/bake-tickets/customer`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];

        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_BAKE_TICKET', res.data['data']);
        }

        if (Response.badRequest(responseCode)) {
          commit('SET_ERRORS_MESSAGE', res.data['errorsMessage']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async updateBakeTicket({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addBakeTicketNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/bake-tickets/${ dataPost['idBakeTicket'] }`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
        
        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_BAKE_TICKET', res.data['data']);
        }

        if (Response.badRequest(responseCode)) {
          commit('SET_ERRORS_MESSAGE', res.data['errorsMessage']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async updateBakeTicketBakingStatus({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addBakeTicketNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/bake-tickets/${ dataPost['idBakeTicket'] }/baking-status`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
        
        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_BAKE_TICKET', res.data['data']);
        }

        if (Response.badRequest(responseCode)) {
          commit('SET_ERRORS_MESSAGE', res.data['errorsMessage']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    }
  }
}