<template>
  <v-row>
    <v-col>
      <v-combobox
        :items="collection"
        :loading="loading"
        :search-input.sync="search"
        hide-no-data
        :item-text="itemValue"
        :item-value="itemValue"
        :label="textSearchCity"
        :placeholder="textSearchCity"
        prepend-icon="mdi-database-search"
        :error="!!errorText"
        :messages="errorText"
        return-object
        @input="handleInput"
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
        color="primary"
        x-large
        @click="handleSearch"
      >
        {{ textSearch }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ApiCity from '@/api/ApiCity';

export default {
  name: 'WeatherSearch',

  props: {
    prefab: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    lang: (self) => self.$vuetify.lang.current,

    textSearch: (self) => self.$vuetify.lang.t('$vuetify.app.search.search'),
    textSearchCity: (self) => self.$vuetify.lang.t('$vuetify.app.search.searchCity'),
    textNoResultSearchCity: (self) => self.$vuetify.lang.t('$vuetify.app.search.noResultSearchCity'),
    textNoTextSearchCity: (self) => self.$vuetify.lang.t('$vuetify.app.search.textNoTextSearchCity'),

    itemValue() {
      if (!this.lang) return 'nameRu';
      return `name${this.lang.toUpperCase()}`;
    },
  },

  data: () => ({
    search: '',
    collection: [],
    loading: false,
    errorText: '',
  }),

  mounted() {
    this.collection = this.$props.prefab;
  },

  methods: {
    async handleSearch() {
      this.errorText = '';

      if (!this.search) {
        this.errorText = this.textNoTextSearchCity;
        return;
      }

      this.loading = true;

      await ApiCity.search(this.search);
      this.collection = [
        ...this.$props.prefab,
        ...ApiCity.getData(),
      ];

      const error = ApiCity.getError();
      if (error || !this.collection.length) {
        this.errorText = this.textNoResultSearchCity;
      }

      this.loading = false;
    },

    handleInput(data) {
      if (typeof data === 'string') return;

      this.$emit('result:search', data);
    },
  },
};
</script>
