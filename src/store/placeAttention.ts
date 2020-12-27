import { PlaceAttention, toPlaceAttentionModel } from '@/models/PlaceAttention';
import * as Api from '@/api';
import * as Response from '@/api/serviceResponse';
import * as Node from '@/node/index';
import axios from 'axios';

export default {

  namespaced: true,

  state: {
    placesAttention: [] as PlaceAttention[],
    totalPages: -1,
    placeAttention: {} as PlaceAttention,
    successfulRegistration: false,
    errorsMessage: [] as string[]
  },

  mutations: {
    SET_PLACES_ATTENTION(state: { placesAttention: PlaceAttention[] }, data: any[]) {
      state.placesAttention = [];
      data.forEach((placeAttentionDto) => { state.placesAttention.push(toPlaceAttentionModel(placeAttentionDto)) });
    },

    SET_TOTAL_PAGES(state: { totalPages: number }, data: number) {
      state.totalPages = data;
    },

    SET_PLACE_ATTENTION(state: { placeAttention: PlaceAttention }, data: any) {
      state.placeAttention = toPlaceAttentionModel(data);
    },

    SET_SUCCESSFUL_REGISTRATION(state: { successfulRegistration: boolean }, data: any) {
      state.successfulRegistration = data;
    },

    SET_ERRORS_MESSAGE(state: { errorsMessage: string[] }, data: any) {
      state.errorsMessage = data;
    }
  },

  actions: {
    async getPlacesAttention({ commit }: any, requestParameters: string) {

      try {
        const res = await axios.get(Api.getUrlApi() + `/places-attention${ requestParameters || '' }`, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
  
        if (Response.ok(responseCode) || Response.noContent(responseCode)) {
          commit('SET_PLACES_ATTENTION', res.data['data']);
          commit('SET_TOTAL_PAGES', res.data['pages']);
        }
        Response.showResponse(res);
      } catch (e) {
        Response.verifyStatusResponse(e.response.status);
      }
    },

    async updatePlaceAttention({ commit }: any, dataPost: any) {

      try {
        const dto = Node.addPlaceAttentionNode(dataPost);
        const res = await axios.put(Api.getUrlApi() + `/places-attention/${ dataPost['idPlaceAttention'] }`, dto, Api.getAuthorization())
        const responseCode = res.data['responseCode'];
        
        if (Response.created(responseCode)) {
          commit('SET_SUCCESSFUL_REGISTRATION', true);
          commit('SET_PLACE_ATTENTION', res.data['data']);
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