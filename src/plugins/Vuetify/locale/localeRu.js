import { ru } from 'vuetify/lib/locale';

const localeRu = {
  ...ru,

  app: {
    appName: 'Прогноз погоды',
    initialization: 'Инициализация...',

    search: {
      search: 'Поиск',
      searchCity: 'Поиск по названию города',
      noResultSearchCity: 'нет такого города',
      textNoTextSearchCity: 'заполнение поля поиска',
    },

    data: {
      loading: 'Загрузка данных по погоде...',
      other: 'Прочее',
      condition: 'Состояние',

      temperature: {
        temperature: 'Температура',
        feelsLike: 'По ощущениям',
        tempMin: 'Минимальная',
        tempMax: 'Максимальная',
        pressure: 'Атмосферное давление',
        unitPressure: 'гПа',
        humidity: 'Влажность',
      },

      wind: {
        wind: 'Ветер',
        speed: 'Скорость',
        deg: 'Направление',
        unit: 'метр/сек',
      },
    },
  },
};

export default localeRu;
