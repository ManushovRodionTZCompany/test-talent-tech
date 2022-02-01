class AbstractModel {
  constructor() {
    if (new.target === AbstractModel) {
      throw new Error('Невозможно создать экземпляр класса из абстрактного класса!');
    }
  }

  setProps(object = {}) {
    Object.keys(this).forEach((propName) => {
      this.setProp(propName, object[propName]);
    });

    return true;
  }

  setProp(propName, propValue) {
    // тут можно добавить приобразование типов
    this[propName] = propValue;

    return true;
  }
}

export default AbstractModel;
