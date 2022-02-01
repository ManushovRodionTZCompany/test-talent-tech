import AbstractApi from '@/api/AbstractApi';
import ServiceHTTP from '@/services/ServiceHTTP';
import ModelWeatherData from '@/models/ModelWeatherData';

class ApiWeatherData extends AbstractApi {
  static async findBy(lat, lon, lang) {
    this.setActiveCurrent('findBy');
    this.setActiveModel(new ModelWeatherData());

    try {
      const context = await ServiceHTTP.get('/data/2.5/weather', {
        lat, lon, lang, units: 'metric',
      });
      this._parseContext(context);
    } catch (error) {
      this._parseError(error);
    }

    return this.getDataAsync();
  }
}

export default ApiWeatherData;
