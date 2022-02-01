import Vue from 'vue';
import vuetify from '@/plugins/Vuetify/vuetify';
import ServiceHTTP from '@/services/ServiceHTTP';
import App from './App.vue';

Vue.config.productionTip = false;

ServiceHTTP.baseURL = process.env.VUE_APP__OPENWEATHERMAP__API_URL;
ServiceHTTP.hookParams = (params) => ({
  ...params,
  appid: process.env.VUE_APP__OPENWEATHERMAP__API_KEY,
});
ServiceHTTP.createInstance();

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
