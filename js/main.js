class WeekView extends HTMLElement {
  constructor() {
    super();
    console.log('week');
    this.getContent('dishes.json');
  }

  getContent(source) {
    fetch(source)
      .then(response => response.text())
      .then(data => console.log(data))
  }

}

customElements.define('week-view', WeekView);
