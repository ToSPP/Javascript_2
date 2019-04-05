'use strict';

// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). 

// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий). 

// ### Дополнительно гамбургер можно посыпать:
// приправой (+15 рублей, +0 калорий) 
// и полить майонезом (+20 рублей, +5 калорий). 

// ### Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
// Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Hamburger {
  constructor(size = 'small', stuffing = 'cheese', spice = []) {
    this.h_size = size;
    this.h_stuffing = stuffing;
    this.h_spice = spice;
    this.init();
  }

  init() {
    this._fetchSizes();
    this._fetchStuffing();
    this._fetchSpices();
  }

  _fetchSizes() {
    return this.sizes = {
      small: {
        title: 'маленький',
        cost: 50,
        calories: 20,
      },
      big: {
        title: 'большой',
        cost: 100,
        calories: 40,
      },
    };
  }

  _fetchStuffing() {
    return this.stuffings = {
      cheese: {
        title: 'сыр',
        cost: 10,
        calories: 20,
      },
      salad: {
        title: 'салат',
        cost: 20,
        calories: 5,
      },
      potato: {
        title: 'картофель',
        cost: 15,
        calories: 10,
      },
    };
  }

  _fetchSpices() {
    return this.spices = {
      spice: {
        title: 'приправа',
        cost: 15,
        calories: 0,
      },
      mayo: {
        title: 'майонез',
        cost: 20,
        calories: 5,
      },
    }
  }

  setSize(size) {
    this.h_size = this.sizes.hasOwnProperty(size) ? size : this.h_size;
  }

  setStuffing(stuffing) {
    this.h_stuffing = this.stuffings.hasOwnProperty(stuffing) ? stuffing : this.h_stuffing;
  }

  setSpice(spice) {
    this.h_spice = [];
    for (const val of spice) {
      if (this.spices.hasOwnProperty(val)) {
        this.h_spice.push(val);
      }
    }
  }

  cleanComposition() {
    this.h_size = 'small';
    this.h_stuffing = 'cheese';
    this.h_spice = [];
  }

  getTotalAmount() {
    let cost = 0;
    let calories = 0;

    if (this.sizes.hasOwnProperty(this.h_size)) {
      cost += this.sizes[this.h_size].cost;
      calories += this.sizes[this.h_size].calories;
    }

    if (this.stuffings.hasOwnProperty(this.h_stuffing)) {
      cost += this.stuffings[this.h_stuffing].cost;
      calories += this.stuffings[this.h_stuffing].calories;
    }

    this.h_spice.forEach((prop) => {
      if (this.spices.hasOwnProperty(prop)) {
        cost += this.spices[prop].cost;
        calories += this.spices[prop].calories;
      }
    });

    return {cost, calories};
  }

  getComposition() {
    const spices = [];
    for (let val of this.h_spice) {
      spices.push(this.spices[val].title);
    }

    return {
      size: this.sizes[this.h_size].title,
      stuffing: this.stuffings[this.h_stuffing].title,
      spices,
    }
  }
}

const hamburger = new Hamburger();