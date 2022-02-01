import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css';

import localeRu from '@/plugins/Vuetify/locale/localeRu';
import localeEn from '@/plugins/Vuetify/locale/localeEn';

Vue.use(Vuetify);

const current = process.env.VUE_APP__DEFAULT_CONFIG__LOCALE || 'ru';

const locales = {
  ru: localeRu,
  en: localeEn,
};

const icons = {
  iconfont: 'mdi',
};

const opts = {
  lang: {
    locales,
    current,
  },
  icons,
};

export default new Vuetify(opts);
