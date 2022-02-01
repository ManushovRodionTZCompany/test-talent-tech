<template>
  <v-toolbar
    color="deep-purple accent-4"
    dark
  >
    <v-btn-toggle
      :value="$props.locale"
      @change="v => $emit('update:locale', v)"
    >
      <v-btn
        value="ru"
        color="primary"
        light
      >
        RU
      </v-btn>

      <v-btn
        value="en"
        color="primary"
        light
      >
        EN
      </v-btn>
    </v-btn-toggle>

    <v-spacer />

    <v-toolbar-title>{{ textAppName }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'WeatherToolBar',

  props: {
    locale: {
      type: String,
      default: '',
      require: true,
    },
  },

  computed: {
    textAppName: (self) => self.$vuetify.lang.t('$vuetify.app.appName'),
  },
};
</script>
