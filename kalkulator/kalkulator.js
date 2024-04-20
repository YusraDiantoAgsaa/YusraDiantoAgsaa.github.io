const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('num'));
const operators = Array.from(document.getElementsByClassName('operator'));
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

let currentNum = '';
let prevNum = '';
let result = null;
let currentOperator = null;

const updateDisplay = (value) => {
  display.value = value;
};

const appendNumber = (event) => {
  currentNum += event.target.value;
  updateDisplay(currentNum);
};

const clearDisplay = () => {
  currentNum = '';
  prevNum = '';
  result = null;
  currentOperator = null;
  updateDisplay('');
};

const chooseOperator = (event) => {
  if (currentOperator || result) return;
  currentOperator = event.target.value;
  prevNum = currentNum;
  currentNum = '';
};

const calculateResult = () => {
  if (!currentOperator || !prevNum || !currentNum) return;
  result = operate(prevNum, currentOperator, currentNum);
  currentNum = result;
  prevNum = '';
  currentOperator = null;
  updateDisplay(result);
};

const operate = (num1, operator, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  let result;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      return;
  }
  return result.toString();
};

buttons.forEach((button) => button.addEventListener('click', appendNumber));
operators.forEach((operator) => operator.addEventListener('click', chooseOperator));
equals.addEventListener('click', calculateResult);
clear.addEventListener('click', clearDisplay);