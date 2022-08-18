import * as dishes from '/dishes.json';

class WeekView extends HTMLElement {
  constructor() {
    super();

    this.eventListener();
  }

  eventListener() {
    this.querySelector('.create').addEventListener('click', () => {
      this.createMenu();
    });
  }

  createMenu() {
    const calories = this.querySelector('#calories').value;
    const dishesArray = Object.entries(dishes);

    const mainDishes = this.getDishesByType(dishesArray, 'main');
    const garnishDishes = this.getDishesByType(dishesArray, 'garnish');
    const soupDishes = this.getDishesByType(dishesArray, 'soup');

    const breakfast = [];
    breakfast.push(this.getRandomDish(mainDishes)[1]);
    breakfast.push(this.getRandomDish(garnishDishes)[1]);

    console.log(breakfast);
    console.log(this.getCalories(breakfast));
  }

  getCalories(breakfast) {
    return (breakfast[0].portion/100)*breakfast[0].calories + (breakfast[1].portion/100)*breakfast[1].calories;
  }

  getDishesByType(dishes, type) {
    return dishes.filter(obj => {
      return obj[1].type === type;
    });
  }

  getRandomDish(dishes) {
    return dishes[Math.floor(Math.random()*dishes.length)];
  }

}

customElements.define('week-view', WeekView);
