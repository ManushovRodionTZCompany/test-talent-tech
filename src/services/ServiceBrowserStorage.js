const TEXT_ERROR_NO_KEY = 'Не передан ключ!';

class ServiceBrowserStorage {
  static #encode(value) {
    return JSON.stringify(value);
  }

  static #decode(value) {
    return JSON.parse(value);
  }

  static updateValueByKey(key, value = null) {
    if (!key) throw Error(TEXT_ERROR_NO_KEY);

    if (!value) this.removeByKey(key);
    else localStorage.setItem(key, this.#encode(value));
  }

  static setValueByKey(key, value = null) {
    this.updateValueByKey(key, value);
  }

  static getByKey(key) {
    if (!key) throw Error(TEXT_ERROR_NO_KEY);

    const value = localStorage.getItem(key);
    return this.#decode(value);
  }

  static removeByKey(key) {
    if (!key) throw Error(TEXT_ERROR_NO_KEY);

    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default ServiceBrowserStorage;
