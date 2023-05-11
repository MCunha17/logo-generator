const inquirer = require('inquirer');
const fs = require('fs');
const {Triangle, Circle, Square} = require('./lib/shapes.js');

// Function to create shape object
function createShapeObject(shape) {
  switch (shape.toLowerCase()) {
    case 'circle':
      return new Circle();
    case 'triangle':
      return new Triangle();
    case 'square':
      return new Square();
    default:
      throw new Error('Invalid shape');
  }
}

// Function to get shape dimensions to center text
function getShapeDimensions(shape) {
  switch (shape.toLowerCase()) {
    case 'circle':
      return {centerX: 150, centerY: 100};
    case 'triangle':
      return {centerX: 150, centerY: 127};
    case 'square':
      return {centerX: 150, centerY: 100};
    default:
      throw new Error('Invalid shape');
  }
}

// Function to generate SVG file
function generateSVGFile(answers) {
  const { text, textColor, shape, shapeColor } = answers;
  const shapeObject = createShapeObject(shape);
  shapeObject.setColor(shapeColor);

  const shapeSVG = shapeObject.render();
  const shapeDimensions = getShapeDimensions(shape);

  const textX = shapeDimensions.centerX;
  const textY = shapeDimensions.centerY;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeSVG}
      <text x="${textX}" y="${textY}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-size="48">${text}</text>
    </svg>
  `;

  // Writing SVG content to a file
  fs.writeFileSync('logo.svg', svgContent);
}

const questions = [
  {
    name: 'text',
    type: 'input',
    message: 'Enter the logo text (up to three characters)',
    validate: function (value) {
      // Validating that input is less than or equal to three characters
      return value.length <= 3;
    }
  },
  {
    name: 'textColor',
    type: 'input',
    message: 'Enter the logo text color (enter either color keyword or hexadecimal)'
  },
  {
    name: 'shape',
    type: 'list',
    message: 'Select a logo shape:',
    choices: ['circle', 'triangle', 'square']
  },
  {
    name: 'shapeColor',
    type: 'input',
    message: 'Enter the logo shape color (enter either the color keyword or hexadecimal):'
  }
];

// Generating SVG file based on user's answers to prompts
inquirer.prompt(questions).then(answers => {
  generateSVGFile(answers);
  console.log('Generated logo.svg');
});