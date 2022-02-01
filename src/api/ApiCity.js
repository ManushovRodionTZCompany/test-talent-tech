import AbstractApi from '@/api/AbstractApi';
import ServiceHTTP from '@/services/ServiceHTTP';
import ModelCity from '@/models/ModelCity';

class ApiCity extends AbstractApi {
  static async search(search) {
    this.setActiveCurrent('search');
    this.setActiveModel(new ModelCity());

    try {
      const context = await ServiceHTTP.get('/geo/1.0/direct', { q: search });
      this._parseContext(context);
    } catch (error) {
      this._parseError(error);
    }

    return this.getDataAsync();
  }
}

export default ApiCity;
