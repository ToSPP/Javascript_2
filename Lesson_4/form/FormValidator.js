'use strict';

// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

class FormValidator {
  constructor(element, fields = '', options = {}) {
    this.form = document.querySelector(`.${element}`);
    this.fields = fields || [
      {name: 'name', regexp: /^[a-zа-яё]+$/gi},
      {name: 'phone', regexp: /^\+7\(\d{3}\)\d{3}-\d{4}$/},
      {name: 'email', regexp: /^[a-z.-]+@[a-z]+\.[a-z]{2,3}$/i},
    ];
    this.options = {
      validClass: options.valid || 'valid',
      invalidClass: options.invalid || 'invalid',
    };

    this._init();
  }

  _init() {
    this.form.addEventListener('submit', e => {
      if (!this.checkForm()) e.preventDefault();
    });

    this.form.addEventListener('focusin', e => {
      e.target.classList.remove(this.options.validClass);
      e.target.classList.remove(this.options.invalidClass);
    });
  }

  checkForm() {
    let result = true;
    for (const field of this.fields) {
      const value = this.form.querySelector(`.input__${field.name}`).value;
      const isValid = this._checkField(field.regexp, value);
      if (isValid) {
        this._highlightField(field.name);
      } else {
        this._highlightField(field.name, false);
        result = false;
      }
    }
    return result;
  }

  _checkField(regexp, str) {
    regexp.lastIndex = 0;
    return regexp.test(str);
  }

  _highlightField(element, isValid = true) {
    const input = document.querySelector(`.input__${element}`);
    const hint = document.querySelector(`.hint__${element}`);

    if (isValid) {
      input.classList.remove(this.options.invalidClass);
      input.classList.add(this.options.validClass);
      hint.classList.remove(`hint__${this.options.invalidClass}`);
    } else {
      input.classList.remove(this.options.validClass);
      input.classList.add(this.options.invalidClass);
      hint.classList.add(`hint__${this.options.invalidClass}`);
    }
  }
}

window.onload = () => {
  const validator = new FormValidator('form');
};