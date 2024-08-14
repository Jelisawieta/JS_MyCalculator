/**
 * const calculator - object to store the state of the calculator
 * displayValue - the current value displayed on the calculator
 * firstOperand - the first number entered by the user
 * waitingForSecondOperand -Indicates if the calculator is waiting for the second operand
 * operator - the operator (+, -, *, /, etc.)
 */
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Function to handle digit input
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // If waiting for the second operand, replace the display value with the new digit
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Otherwise, append the new digit to the display value
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Function to handle decimal point input
function inputDecimal(dot) {
    // If waiting for the second operand, ignore the decimal point
    if (calculator.waitingForSecondOperand === true) return;

    // If there's no decimal point already, add it to the display value
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Function to handle operator input (+, -, *, /, etc.)
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue); // Convert the display value to a number

    // If there's an operator and we are waiting for the second operand, just change the operator
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }

    // If there's no first operand yet, set it to the current input value
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // Otherwise, perform the calculation using the current operator
        const result = performCalculation[operator](firstOperand, inputValue);

        // Update the display with the result and set it as the new first operand
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    // Set the calculator to wait for the next operand and store the new operator
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// Object to store the functions for each operator
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand // Equals sign just returns the second operand
};

// Function to reset the calculator to its initial state
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

// Function to update the display with the current display value
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

// Initialize the display
updateDisplay();

// Add event listener to handle button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;

    // Ignore clicks that are not on buttons
    if (!target.matches('button')) {
        return;
    }

    // Handle operator buttons
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    // Handle decimal point button
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    // Handle all-clear button
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    // Handle digit buttons
    inputDigit(target.value);
    updateDisplay();
});
