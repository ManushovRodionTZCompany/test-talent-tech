<template>
  <div style="height: 300px;">
    <WeatherDataProcess
      v-if="loading"
      style="height: 300px;"
    />

    <v-card
      v-else-if="context"
      class="pa-7"
      style="height: 300px;"
    >
      <v-card-text>
        <p class="text-h4 text--primary">
          {{ $props.current.getName(lang) }}
        </p>

        <v-row>
          <WeatherDataTemp
            :context="context.main"
            cols="4"
          />

          <WeatherDataWind
            :context="context.wind"
            cols="4"
          />

          <v-col cols="4">
            <p>{{ textOther }}:</p>
            <div class="text--primary">
              <ul>
                <li>
                  <strong class="pr-1">{{ textPressure }}: </strong>
                  <span class="pr-1">{{ context.main.pressure }}</span>
                  <span>{{ textUnitPressure }}</span>
                </li>
                <li>
                  <strong class="pr-1">{{ textHumidity }}: </strong>
                  <span class="pr-1">{{ context.main.humidity }}</span>
                  <span>%</span>
                </li>
                <li>
                  <strong class="pr-1">{{ textCondition }}: </strong>
                  <span class="pr-1">{{ condition }}</span>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ModelCity from '@/models/ModelCity';
import ApiWeatherData from '@/api/ApiWeatherData';

import WeatherDataProcess from '@/components/Weather/WeatherDataProcess.vue';
import WeatherDataTemp from '@/components/Weather/WeatherDataTemp.vue';
import WeatherDataWind from '@/components/Weather/WeatherDataWind.vue';

export default {
  name: 'WeatherData',
  components: { WeatherDataWind, WeatherDataTemp, WeatherDataProcess },
  props: {
    current: {
      type: ModelCity,
      default: () => new ModelCity(),
    },
  },

  computed: {
    lang: (self) => self.$vuetify.lang.current,

    textOther: (self) => self.$vuetify.lang.t('$vuetify.app.data.other'),
    textPressure: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.pressure'),
    textUnitPressure: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.unitPressure'),
    textHumidity: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.humidity'),
    textCondition: (self) => self.$vuetify.lang.t('$vuetify.app.data.condition'),

    condition() {
      return this.context.weather.map((item) => item.description).join(',');
    },
  },

  watch: {
    '$props.current': {
      deep: true,
      immediate: true,
      handler(value) {
        this.handleData(value.lat, value.lon);
      },
    },
    lang() {
      this.handleData(this.$props.current.lat, this.$props.current.lon);
    },
  },

  data: () => ({
    loading: false,
    context: null,
  }),

  methods: {
    async handleData(lat, lon) {
      if (!lat || !lon) return;

      this.loading = true;
      await ApiWeatherData.findBy(lat, lon, this.lang);
      this.context = ApiWeatherData.getData()[0] || null;

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>
