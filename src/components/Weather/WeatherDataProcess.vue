<template>
  <v-container>
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        {{ textDataLoading }}
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WeatherDataProcess',

  computed: {
    textDataLoading: (self) => self.$vuetify.lang.t('$vuetify.app.data.loading'),
  },
};
</script>
