import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#0D47A1',
        secondary: '#FBC02D',
        accent: '#ECEFF1',
        error: '#FF5252',
        danger: '#FF5252',
        info: '#8D959B',
        success: '#4CAF50',
        warning: '#FFC107',
        paginateColor: '#8D959B',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
