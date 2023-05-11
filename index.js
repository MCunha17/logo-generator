const inquirer = require('inquirer');
const fs = require('fs');
const { create } = require('xmlbuilder2');
const { Triangle, Circle, Square } = require('./lib/shapes.js');

// Function for user prompt
async function promptLogoDetails() {
  const { text, textColor, shape, shapeColor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter logo text (up to three characters)',
      validate: (input) => {
        return input.length <= 3 ? true : 'Please enter a logo text up to three characters';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter logo text color (either the color keyword or hexadecimal number)',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a logo shape',
      choices: ['Triangle', 'Circle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter logo shape color (either the color keyword or hexadecimal number)',
    },
  ]);

  return { text, textColor, shape, shapeColor };
}

async function generateLogo() {
  const { text, textColor, shape, shapeColor } = await promptLogoDetails();

  // Create an SVG instance using the xmlbuilder2 library
  const svg = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 300 200',
      width: '300',
      height: '200',
    });

  // Add text element
  svg
    .ele('text', {
      x: '10',
      y: '50',
      fill: textColor,
    })
    .txt(text);

  // Add shape element
  let shapeInstance;
  switch (shape) {
    case 'Triangle':
      shapeInstance = new Triangle();
      break;
    case 'Circle':
      shapeInstance = new Circle();
      break;
    case 'Square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);
  const shapeSVGString = shapeInstance.render();
  const shapeFragment = create(shapeSVGString).node;
  svg.node.appendChild(shapeFragment.firstChild);

  // Save the logo as a file
  fs.writeFile('logo.svg', svg.end({ prettyPrint: true }), (err) => {
    if (err) {
      console.error('Error saving logo:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

generateLogo();