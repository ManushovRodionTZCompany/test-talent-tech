import axios from 'axios';

function paramsToString(params) {
  const textArray = Object.keys(params).map((key) => `${key}=${params[key]}`);
  return textArray.join('&');
}

function mergeParams(...args) {
  return args.reduce((result, item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return result;
    return { ...result, ...item };
  }, {});
}

class ServiceHTTP {
  static _instance;

  static _baseURL;

  static _headers = {};

  static _params = {};

  static _hookHeaders;

  static _hookParams;

  static _hasBaseURL() {
    if (!this._baseURL) throw new Error('Необходимо установит baseURL; ServiceHTTP.baseURL = URL');
    return true;
  }

  static _hasInstance() {
    if (!this._instance) throw new Error('Необходимо инициализировать HTTP Сервис; ServiceHTTP.createInstance()');
    return true;
  }

  static set baseURL(baseURL) {
    if (baseURL) {
      this._baseURL = String(baseURL).trim();
    }
  }

  static set hookHeaders(callable) {
    if (typeof callable !== 'function') return;
    this._hookHeaders = callable;
  }

  static set hookParams(callable) {
    if (typeof callable !== 'function') return;
    this._hookParams = callable;
  }

  static get headers() {
    const headers = this._hookHeaders ? this._hookHeaders(this._headers) : this._headers;

    if (headers && typeof headers === 'object' && !Array.isArray(headers)) {
      return headers;
    }

    return null;
  }

  static get params() {
    const params = this._hookParams ? this._hookParams(this._params) : this._params;

    if (params && typeof params === 'object' && !Array.isArray(params)) {
      return params;
    }

    return null;
  }

  static createInstance() {
    this._hasBaseURL();

    this._instance = axios.create({
      baseURL: this._baseURL,
      headers: this.headers || {},
    });
  }

  static get(url, data = null, config = {}) {
    this._hasInstance();

    const options = {};

    const params = mergeParams(this.params, data);
    if (params) options.params = params;

    return this._instance.get(url, { ...config, ...options });
  }

  static delete(url, data = null, config = {}) {
    this._hasInstance();

    const options = {};

    const params = mergeParams(this.params, data);
    if (params) options.params = params;

    return this._instance.delete(url, { ...config, ...options });
  }

  static post(url, data = null, config = {}) {
    this._hasInstance();

    const params = paramsToString(this.params);
    const prefix = url.indexOf('?') ? '&' : '?';
    const urlValue = params ? `${url}${prefix}${params}` : url;

    return this._instance.post(urlValue, data, config);
  }

  static put(url, data = null, config = {}) {
    this._hasInstance();

    const params = paramsToString(this.params);
    const prefix = url.indexOf('?') ? '&' : '?';
    const urlValue = params ? `${url}${prefix}${params}` : url;

    return this._instance.put(urlValue, data, config);
  }

  static path(url, data = null, config = {}) {
    this._hasInstance();

    const params = paramsToString(this.params);
    const prefix = url.indexOf('?') ? '&' : '?';
    const urlValue = params ? `${url}${prefix}${params}` : url;

    return this._instance.path(urlValue, data, config);
  }
}

export default ServiceHTTP;
