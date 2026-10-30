let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll("[class^='digit-']");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.textContent);
    });
});

equalButton.addEventListener("click", () => {
    calculate();
});

clearButton.addEventListener("click", () => {
    clearCalculator();
});

decimalButton.addEventListener("click", appendDecimal);
backspaceButton.addEventListener("click", deleteNumber);

window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        appendNumber(e.key);
    }

    if (e.key === ".") {
        appendDecimal();
    }

    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        if (e.key === "/") e.preventDefault();
        chooseOperator(e.key);
    }
    if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        calculate();
    }
    if (e.key === "Backspace") {
        deleteNumber();
    }
    if (e.key === "Escape") {
        clearCalculator();
    }
});

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Nice try! 🚫";
    }
    return num1 / num2;
}

function operate(op, num1, num2) {
    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        firstNumber = "";
        shouldResetDisplay = false;
    }

    if (operator === "") {
        firstNumber += number;
        display.textContent = firstNumber;
    } else {
        secondNumber += number;
        display.textContent = secondNumber;
    }
}

function chooseOperator(op) {
    if (firstNumber === "") return;

    if (secondNumber !== "") {
        calculate();
    }

    operator = op;
    shouldResetDisplay = false;
}

function calculate() {
    if (firstNumber === "" || operator === "" || secondNumber === "") return;

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    let result = operate(operator, num1, num2);
    result = roundResult(result);

    display.textContent = result;

    if (typeof result !== "number") {
        firstNumber = "";
    } else {
        firstNumber = String(result);
    }

    operator = "";
    secondNumber = "";
    shouldResetDisplay = true;
}

function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;
    display.textContent = "0";
}

function roundResult(num) {
    if (typeof num === "number") {
        return Math.round(num * 100000) / 100000;
    }

    return num;

}

function appendDecimal() {
    if (shouldResetDisplay) {
        firstNumber = "";
        shouldResetDisplay = false;
    }

    if (operator === "") {
        if (firstNumber === "") firstNumber = "0";

        if (!firstNumber.includes(".")) {
            firstNumber += ".";
            display.textContent = firstNumber;
        }
    } else {
        if (secondNumber === "") secondNumber = "0";
        if (!secondNumber.includes(".")) {
            secondNumber += ".";
            display.textContent = secondNumber;
        }
    }
}

function deleteNumber() {
    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber || "0";
    } else {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber || "0";
    }
}

