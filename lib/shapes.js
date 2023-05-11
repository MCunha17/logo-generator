// Parent class for the shapes
class Shape {
    constructor() {
        // Sets the color property as an empty string
        this. color = '';
    }

    setColor(color) {
        // Sets color property with the given color
        this.color = color;
    }
}

// Extends the Shape class
class Triangle extends Shape {
    render() {
        // Returns an SVG that is a triangle shape and is the given color
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
}

// Extends the Shape class
class Circle extends Shape {
    render() {
        // Returns an SVG that is a circle shape and is the given color
        return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
}

// Extends the Shape class
class Square extends Shape {
    render() {
        // Returns an SVG taht is a square shape and is the given color
        return `<rect x="100" y="50" width="100" height="100" fill="${this.color}" />`;
    }
}

// Exports the Triangle, Circle, and Square classes
module.exports = {Triangle, Circle, Square};