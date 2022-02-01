<template>
  <v-col v-bind="$attrs">
    <p>{{ textTemperature }}:</p>
    <div class="text--primary">
      <ul>
        <li>
          <strong class="pr-1">{{ textTemperature }}:</strong>
          <span class="pr-1">{{ $props.context.temp }}</span>
          <span>°C</span>
        </li>
        <li>
          <strong class="pr-1">{{ textFeelsLike }}:</strong>
          <span class="pr-1">{{ $props.context.feels_like }}</span>
          <span>°C</span>
        </li>
        <li>
          <strong class="pr-1">{{ textTempMin }}:</strong>
          <span class="pr-1">{{ $props.context.temp_min }}</span>
          <span>°C</span>
        </li>
        <li>
          <strong class="pr-1">{{ textTempMax }}:</strong>
          <span class="pr-1">{{ $props.context.temp_max }}</span>
          <span>°C</span>
        </li>
      </ul>
    </div>
  </v-col>
</template>

<script>
import ModelWeatherDataMain from '@/models/ModelWeatherDataMain';

export default {
  name: 'WeatherDataTemp',
  props: {
    context: {
      type: ModelWeatherDataMain,
      required: true,
      default: () => new ModelWeatherDataMain(),
    },
  },

  computed: {
    textTemperature: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.temperature'),
    textFeelsLike: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.feelsLike'),
    textTempMin: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.tempMin'),
    textTempMax: (self) => self.$vuetify.lang.t('$vuetify.app.data.temperature.tempMax'),
  },
};
</script>
