<template>
  <v-col v-bind="$attrs">
    <p>{{ textWind }}:</p>
    <div class="text--primary">
      <ul>
        <li>
          <strong class="pr-1">{{ textSpeed }}:</strong>
          <span class="pr-1">{{ $props.context.speed }}</span>
          <span>{{ textUnit }}</span>
        </li>
        <li>
          <strong class="pr-1">{{ textDeg }}:</strong>
          <span>{{ $props.context.deg }}</span>
          <span>°</span>
        </li>
      </ul>
    </div>
  </v-col>
</template>

<script>
import ModelWeatherDataWind from '@/models/ModelWeatherDataWind';

export default {
  name: 'WeatherDataWind',
  props: {
    context: {
      type: ModelWeatherDataWind,
      required: true,
      default: () => new ModelWeatherDataWind(),
    },
  },

  computed: {
    textWind: (self) => self.$vuetify.lang.t('$vuetify.app.data.wind.wind'),
    textSpeed: (self) => self.$vuetify.lang.t('$vuetify.app.data.wind.speed'),
    textDeg: (self) => self.$vuetify.lang.t('$vuetify.app.data.wind.deg'),
    textUnit: (self) => self.$vuetify.lang.t('$vuetify.app.data.wind.unit'),
  },
};
</script>
