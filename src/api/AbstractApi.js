import AbstractModel from '@/models/AbstractModel';

class AbstractApi {
  static _activeCurrent = null;

  static _activeModel = null;

  static _data = [];

  static _status = [];

  static _error = [];

  constructor() {
    if (new.target === AbstractApi) {
      throw new Error('Невозможно создать экземпляр класса из абстрактного класса!');
    }
  }

  static _hasActiveCurrent() {
    if (!this._activeCurrent) {
      throw new Error('Необходимо установить корректку запроса; Api.setActiveCurrent(NAME_CURRENT)');
    }

    return true;
  }

  static _parseContext(context = {}) {
    const { data, status } = context;

    let dataContext = [];
    if (data) {
      dataContext = Array.isArray(data) ? data : [data];
    }

    if (this._activeModel) {
      const result = [];

      dataContext.forEach((item) => {
        const model = this._activeModel.constructor();

        if (model.setProps(item)) {
          result.push(model);
        }
      });

      dataContext = result;
    }

    this._data = this._data.filter((item) => item.current !== this._activeCurrent);
    this._data.push({ current: this._activeCurrent, data: dataContext });

    this._status = this._status.filter((item) => item.current !== this._activeCurrent);
    this._status.push({ current: this._activeCurrent, status });
  }

  static _parseError(error) {
    this._error = this._error.filter((item) => item.current !== this._activeCurrent);
    this._error.push({ current: this._activeCurrent, error });
  }

  static setActiveCurrent(activeCurrent) {
    this._activeCurrent = activeCurrent;
  }

  static setActiveModel(activeModel) {
    if (!(activeModel instanceof AbstractModel)) {
      throw new Error('Модель должна наследоваться от AbstractModel');
    }

    this._activeModel = activeModel;
  }

  static getError() {
    this._hasActiveCurrent();

    const find = this._error.find((item) => item.current === this._activeCurrent);
    return find ? find.error : null;
  }

  static getData() {
    this._hasActiveCurrent();

    const find = this._data.find((item) => item.current === this._activeCurrent);
    return find ? find.data : null;
  }

  static getStatus() {
    this._hasActiveCurrent();

    const find = this._status.find((item) => item.current === this._activeCurrent);
    return find ? find.status : null;
  }

  static getDataAsync() {
    return Promise.resolve(this.getData());
  }
}

export default AbstractApi;
