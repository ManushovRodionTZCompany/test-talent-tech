import AbstractModel from '@/models/AbstractModel';
import ModelWeatherDataMain from '@/models/ModelWeatherDataMain';
import ModelWeatherDataWind from '@/models/ModelWeatherDataWind';
import ModelWeatherDataWeather from '@/models/ModelWeatherDataWeather';

class ModelWeatherData extends AbstractModel {
  main = new ModelWeatherDataMain();

  wind = new ModelWeatherDataWind();

  weather = [];

  setProp(propName, propValue) {
    switch (propName) {
      case 'main': {
        return this.main.setProps(propValue);
      }
      case 'wind': {
        return this.wind.setProps(propValue);
      }
      case 'weather': {
        if (!Array.isArray(propValue)) return false;

        propValue.forEach((item) => {
          const model = new ModelWeatherDataWeather();
          if (model.setProps(item)) {
            this.weather.push(model);
          }
        });

        return true;
      }
      default: {
        return super.setProp(propName, propValue);
      }
    }
  }
}

export default ModelWeatherData;
