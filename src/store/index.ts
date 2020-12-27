import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import activityModule from './activity';
import bakeTicketModule from './bakeTicket';
import customerModule from './customer';
import parameterModule from './parameter';
import placeAttentionModule from './placeAttention';
import reportModule from './report';
import settingModule from './setting';
import userModule from './user';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    activityModule,
    bakeTicketModule,
    customerModule,
    parameterModule,
    placeAttentionModule,
    reportModule,
    settingModule,
    userModule
  }
})
