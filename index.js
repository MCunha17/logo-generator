const inquirer = require ('inquirer');
const {Triangle, Circle, Square} = require('./lib/shapes.js');

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
            message: 'Enter logo shape color',
        },
    ]);

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
    const logoSVG = shapeInstance.render();

    return {text, textColor, logoSVG};
}

// Function to generate logo
async function generateLogo() {
    const {text, textColor, logoSVG} = await promptLogoDetails();
    console.log('Generate logo.svg')
}

// Save the logo as a file
generateLogo();