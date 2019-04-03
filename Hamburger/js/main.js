'use strict';

window.onload = () => {
  const form = document.querySelector('.hamburger__choose');

  form.addEventListener('submit', (e) => {
    hamburger.setSize(form.elements['h_size'].value);
    hamburger.setStuffing(form.elements['h_stuffing'].value);
    const spices = [];
    for(const input of form.elements['h_spice']) {
      if (input.checked) {
        spices.push(input.value);
      }
    }
    hamburger.setSpice(spices);

    const choice = hamburger.getComposition();
    const descBlock = document.querySelector('.hamburger__total-desc');
    let descText = `Вы выбрали ${choice.size} гамбургер. `;
    descText += `Начинка - ${choice.stuffing}.`;
    if (0 < choice.spices.length) {
      descText += ` Дополнительно: ${choice.spices.join(', ')}.`;
    }
    descBlock.textContent = descText;

    const total = hamburger.getTotalAmount();
    document.querySelector('#h_cost').textContent = total.cost.toString();
    document.querySelector('#h_calories').textContent = total.calories.toString();

    e.preventDefault();
  });

  form.addEventListener('reset', () => {
    hamburger.cleanComposition();
    document.querySelector('.hamburger__total-desc').textContent = '';
    document.querySelector('#h_cost').textContent = '0';
    document.querySelector('#h_calories').textContent = '0';
  });
};