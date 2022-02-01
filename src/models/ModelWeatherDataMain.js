import AbstractModel from '@/models/AbstractModel';

class ModelWeatherDataMain extends AbstractModel {
  temp = null;

  // eslint-disable-next-line camelcase
  feels_like = null;

  // eslint-disable-next-line camelcase
  temp_min = null;

  // eslint-disable-next-line camelcase
  temp_max = null;

  pressure = null;

  humidity = null;
}

export default ModelWeatherDataMain;
