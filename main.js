const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor (field) {
        this._field = field;
        printInstructions();
    }

    printInstructions() {
        console.log('Welcome to "Find Your Hat"!');
        console.log('Instructions:');
        console.log('- Navigate the field');
        console.log('- "O" = Holes');
        console.log('- "^" = Hat');
        console.log('- "░" = Field');
    }

    print () {
        let arr = this._field;
        console.log(arr.map(e => e.join(' ')).join('\n'));
    }


}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.print();