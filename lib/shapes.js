class Shape {
    constructor() {
        this. color = '';
    }

    setColor(color) {
        this.color = color;
    }
}

class Triangle extends Shape {
    render() {
      return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
}

class Circle extends Shape {
    render() {
      return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
  }