import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

fetch(process.env.BASE_URL + "config.json")
  .then(async function(response) {
    const config = await response.json()
    Vue.prototype.$config = config
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.component('TextInputComponent', require('./components/TextInput.vue').default);
Vue.component('DatePickerComponent', require('./components/DatePicker.vue').default);
Vue.component('ItemMenuComponent', require('./components/ItemMenu.vue').default);
Vue.component('SubmitButtonComponent', require('./components/SubmitButton.vue').default);
Vue.component('SubmitButtonComponent', require('./components/SubmitButton.vue').default);
Vue.component('SnackbarComponent', require('./components/Snackbar.vue').default);
Vue.component('SearchInputComponent', require('./components/SearchInput.vue').default);
Vue.component('ChipComponent', require('./components/Chip.vue').default);
Vue.component('AddButtonComponent', require('./components/AddButton.vue').default);
Vue.component('IconButtonComponent', require('./components/IconButton.vue').default);
Vue.component('SelectInputComponent', require('./components/SelectInput.vue').default);
Vue.component('ConfirmDialogComponent', require('./components/ConfirmDialog.vue').default);
Vue.component('InputSwitchComponent', require('./components/InputSwitch.vue').default);
Vue.component('DialogFormComponent', require('./components/DialogForm.vue').default);
