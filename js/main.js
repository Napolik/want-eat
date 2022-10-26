import * as dishes from '/dishes.json';

class WeekView extends HTMLElement {
  constructor() {
    super();

    this.dayCalories = 0;
    this.eventListener();
  }

  eventListener() {
    this.querySelector('.create').addEventListener('click', () => {
      this.createMenu();
    });
  }

  createMenu() {
    const dayCalories = document.createElement('div');
    const calories = this.querySelector('#calories').value;
    const dishesArray = Object.entries(dishes);
    const mainDishes = this.getDishesByType(dishesArray, 'main');
    const garnishDishes = this.getDishesByType(dishesArray, 'garnish');
    const soupDishes = this.getDishesByType(dishesArray, 'soup');
    const breakfast = [];
    const dinner = [];
    const supper = [];

    breakfast.push(this.getRandomDish(mainDishes)[1]);
    if (this.getCalories(breakfast) < calories/3) {
      breakfast.push(this.getRandomDish(garnishDishes)[1]);
    }

    dinner.push(this.getRandomDish(soupDishes)[1]);

    supper.push(this.getRandomDish(mainDishes)[1]);
    if (this.getCalories(supper) < calories/3) {
      supper.push(this.getRandomDish(garnishDishes)[1]);
    }

    this.querySelector('.week__meals').innerHTML = '';
    this.renderMenu(breakfast, 'Сніданок', this.getCalories(breakfast));
    this.renderMenu(dinner, 'Обід', this.getCalories(dinner));
    this.renderMenu(supper, 'Вечеря', this.getCalories(supper));

    this.plusToDay(this.getCalories(breakfast));
    this.plusToDay(this.getCalories(dinner));
    this.plusToDay(this.getCalories(supper));
    dayCalories.innerHTML = 'Всього калорій: ' + this.dayCalories;
    this.querySelector('.week__meals').append(dayCalories);
    this.dayCalories = 0;
  }

  renderMenu(meal, heading, calories) {
    const mealContainer = document.createElement('div');
    const mealHeading = document.createElement('div');
    const mealList = document.createElement('ul');
    const mealListItem = document.createElement('li');
    const caloriesContainer = document.createElement('div');

    mealHeading.classList.add('week__meal-heading');
    mealList.classList.add('week__meal-list');
    mealListItem.classList.add('week__meal-list-item');
    mealHeading.innerHTML = heading;
    mealListItem.innerHTML = meal[0].name + '(' + meal[0].portion + meal[0].unit + ')';
    caloriesContainer.innerHTML = 'Калорій: ' + calories;

    if (meal[1]) {
      const mealListItem2 = document.createElement('li');
      mealListItem2.classList.add('week__meal-list-item');
      mealListItem2.innerHTML = meal[1].name + '(' + meal[1].portion + meal[1].unit + ')';
      mealList.append(mealListItem2);
    }
    mealList.append(mealListItem);
    mealContainer.append(mealHeading);
    mealContainer.append(mealList);
    mealContainer.append(caloriesContainer);
    this.querySelector('.week__meals').append(mealContainer);
  }

  getCalories(meal) {
    let calories = (meal[0].portion/100)*meal[0].calories;
    if (meal[1]) {
      calories = calories + (meal[1].portion/100)*meal[1].calories;
    }
    return calories;
  }

  plusToDay(calories) {
    this.dayCalories += calories;
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
