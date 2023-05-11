const inquirer = require('inquirer');
const {Triangle, Circle, Square} = require('lib/shapes.js');

// Function for user prompt
async function promptLogoDetails() {
    const {text, textColor, shape, shapeColor} = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter logo text',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter logo text color',
        }
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter logo shape',
        },
    ]);

    let shapeInstance;
        switch (shape) {
            case 'Triangle':
                shapeInstance = new Triangle();
            case 'Circle':
                shapeInstance = new Circle();
            case 'Square':
                shapeInstance = new Square();
        }
