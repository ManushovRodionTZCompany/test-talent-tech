import { en } from 'vuetify/lib/locale';

const localeEn = {
  ...en,

  app: {
    appName: 'Weather',
    initialization: 'Initialization...',

    search: {
      search: 'Search',
      searchCity: 'Search city',
      noResultSearchCity: 'no result search city',
      textNoTextSearchCity: 'filling in the search field',
    },

    data: {
      loading: 'Loading...',
      other: 'Other',
      condition: 'Condition',

      temperature: {
        temperature: 'Temperature',
        feelsLike: 'Feels like',
        tempMin: 'Min',
        tempMax: 'Max',
        pressure: 'Pressure',
        unitPressure: 'hPa',
        humidity: 'Humidity',
      },

      wind: {
        wind: 'Wind',
        speed: 'Speed',
        deg: 'Deg',
        unit: 'meter/sec',
      },
    },
  },
};

export default localeEn;
