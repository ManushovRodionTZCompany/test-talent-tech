<template>
  <v-app>
    <LayoutDefault>
      <ProcessInitialization v-if="!init" />

      <template v-else>
        <WeatherToolBar
          :locale="langCurrent"
          @update:locale="handleUpdateLocale"
        />

        <div class="pr-5 pl-5 pt-3 pb-3">
          <WeatherSearch
            :prefab="searchCity"
            @result:search="handleResultSearch"
          />
        </div>

        <WeatherData :current="currentCity" />
      </template>
    </LayoutDefault>
  </v-app>
</template>

<script>
import ServiceBrowserStorage from '@/services/ServiceBrowserStorage';
import ModelCity from '@/models/ModelCity';

import LayoutDefault from '@/layouts/Default/LayoutDefault.vue';
import ProcessInitialization from '@/components/ProcessInitialization.vue';
import WeatherToolBar from '@/components/Weather/WeatherToolBar.vue';
import WeatherSearch from '@/components/Weather/WeatherSearch.vue';
import WeatherData from '@/components/Weather/WeatherData.vue';

const LANG_CURRENT_KEY = 'langCurrent';
const SEARCH_CITY_KEY = 'searchCity';

export default {
  name: 'App',
  components: {
    WeatherData,
    WeatherSearch,
    WeatherToolBar,
    ProcessInitialization,
    LayoutDefault,
  },

  computed: {
    langCurrent: {
      set(value) {
        this.$vuetify.lang.current = value;
      },
      get() {
        return this.$vuetify.lang.current;
      },
    },
    searchCity: {
      set(data) {
        const searchCity = ServiceBrowserStorage.getByKey(SEARCH_CITY_KEY);
        if ((searchCity || []).find((item) => item.nameEN === data.nameEN)) return;

        ServiceBrowserStorage.setValueByKey(SEARCH_CITY_KEY, [...(searchCity || []), data]);
      },
      get() {
        return ServiceBrowserStorage.getByKey(SEARCH_CITY_KEY);
      },
    },
  },

  data: () => ({
    init: false,
    currentCity: new ModelCity(),
  }),

  created() {
    const locale = ServiceBrowserStorage.getByKey(LANG_CURRENT_KEY);
    if (locale) this.langCurrent = locale;

    this.init = true;
  },

  methods: {
    handleUpdateLocale(value) {
      this.langCurrent = value;
      ServiceBrowserStorage.setValueByKey(LANG_CURRENT_KEY, value);
    },

    handleResultSearch(data) {
      this.searchCity = data;
      this.currentCity.setProps(data, true);
    },
  },
};
</script>
