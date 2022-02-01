import AbstractModel from '@/models/AbstractModel';

class ModelCity extends AbstractModel {
  nameRU = null;

  nameEN = null;

  lat = null;

  lon = null;

  setProps(object = {}, original = false) {
    if (original) return super.setProps(object);

    const { local_names: { en, ru } } = object;
    if (!en || !ru) return false;

    return super.setProps({
      ...object,
      nameRU: ru || '',
      nameEN: en || '',
    });
  }

  getName(lang) {
    return this[`name${lang.toUpperCase()}`] || '';
  }
}

export default ModelCity;
