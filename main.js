const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor (field) {
        this._field = field;
        this._userInput;
        this._currentRow;
        this._currentCol;
        this._endGameMsg;
    }

    static generateField(height, width) {
        let field = [...Array(width)].map(e => Array(height));
        let startPointRow;
        let startPointCol;
        let hatRow;
        let hatCol;

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                field[row][col] = '░';
            }
        }

        return field;
    }

    startGame() {
        this.findPosition();
        this.printInstructions();
        this.print();
        this.promptUser();

        while(!this.isEndGame()) {
            this.updateField();
            this.print();
            this.promptUser();
        }

        console.log(this._endGameMsg);
    }

    findPosition() {
        let arr = this._field;
        for (let row = 0; row < arr.length; row++) {
            for (let col = 0; col < arr[row].length; col ++){
                if (arr[row][col] === '*') {
                    this._currentRow = row;
                    this._currentCol = col;
                }
            }
        }
    }

    printInstructions() {
        console.log(`\n
    *******************************
    * Welcome to "Find Your Hat"! *
    *******************************
    Instructions:
    - Navigate the field:
        - 'O' = Holes
        - '^' = Hat
        - '░' = Field
    - Program will prompt user:
        - 'u' = up
        - 'd' = down
        - 'l' = left
        - 'r' = right`);
    }

    print () {
        let arr = this._field;
        console.log('\nFIELD:\n')
        console.log(arr.map(e => e.join(' ')).join('\n'));
        console.log('\n')
    }

    promptUser () {
        this._userInput = prompt('Enter the direction you would like to go: ');
    }

    isEndGame () {
        let input = this._userInput.toLowerCase();

        switch (input) {
            case 'u':
                this._currentRow = this._currentRow-1;
                break;
            case 'd':
                this._currentRow = this._currentRow+1;
                break;
            case 'l':
                this._currentCol = this._currentCol-1;
                break;
            case 'r':
                this._currentCol = this._currentCol+1;
        }

        if (this._currentRow < 0 || 
            this._currentRow > this._field.length - 1 || 
            this._currentCol < 0 || 
            this._currentCol > this._field.length[0] - 1) {

            this._endGameMsg = 'You Lose! You moved outside the field';
            return true;
        }

        else if (this._field[this._currentRow][this._currentCol] === 'O') {
            this._endGameMsg = 'You Lose! You fell into a hole';
            return true;
        }

        else if (this._field[this._currentRow][this._currentCol] === '^') {
            this._endGameMsg = 'YOU WIN! YOU FOUND THE HAT!';
            return true;
        }

        else {
            return false;
        }

    }

    updateField () {
        this._field[this._currentRow][this._currentCol] = '*';
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

//myField.startGame();

let testField = Field.generateField(5,5);
const myField2 = new Field(testField);
myField2.print();