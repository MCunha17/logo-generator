const inquirer = require('inquirer');
const fs = require('fs');
const {Triangle, Circle, Square} = require('./lib/shapes.js');

function generateSVGFile(answers) {
  const {text, textColor, shape, shapeColor} = answers;

  // Create shape object
  const shapeObject = createShapeObject(shape);
  // Set color of shape
  shapeObject.setColor(shapeColor);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeObject.render()}
      <text x="150" y="150" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-size="48">${text}</text>
    </svg>
  `;

  // Writes SVG content to file
  fs.writeFileSync('logo.svg', svgContent);
}

// Creates new object
function createShapeObject(shape) {
  switch (shape) {
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

// User prompts
const questions = [
  {
    name: 'text',
    type: 'input',
    message: 'Enter the logo text (up to three characters)',
    // Validates input
    validate: function (value) {
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
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    name: 'shapeColor',
    type: 'input',
    message: 'Enter the logo shape color (enter either the color keyword or hexadecimal):'
  }
];

inquirer.prompt(questions).then(answers => {
  // Generates SVG files based on prompt inputs
  generateSVGFile(answers);
  console.log('Generated logo.svg');
});