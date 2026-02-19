// ─── Math Operations ───────────────────────────────────────────────────────────

function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   { return a / b; }

function operate(op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (op === "+") return add(num1, num2);
    if (op === "-") return subtract(num1, num2);
    if (op === "*") return multiply(num1, num2);
    if (op === "/") return divide(num1, num2);
}


// ─── State ─────────────────────────────────────────────────────────────────────

let num1           = "";
let num2           = "";
let op             = null;
let clickCount     = 0;
let justCalculated = false;


// ─── DOM References ────────────────────────────────────────────────────────────

const display      = document.getElementById("dspl");
const result       = document.getElementById("result");
const clcBtn       = document.getElementById("clearAll");
const backspaceBtn = document.getElementById("backspaceBtn");
const digits       = document.querySelectorAll(".digit");
const operators    = document.querySelectorAll(".operator");


// ─── Core Logic ────────────────────────────────────────────────────────────────

function calc() {
    if (op === "/" && num2 === "0") {
        display.textContent = "thats a foul!";
        return;
    }

    let res = operate(op, num1, num2);
    res = parseFloat(res.toFixed(9));

    display.textContent = res;
    num1           = String(res);
    num2           = "";
    op             = null;
    clickCount     = 0;
    justCalculated = true;
}

function clearAll() {
    display.textContent = "0";
    num1           = "";
    num2           = "";
    op             = null;
    clickCount     = 0;
    justCalculated = false;
}

function backspace() {
    if (num2 !== "") {
        num2 = num2.slice(0, -1);
        display.textContent = `${num1} ${op} ${num2}`;
        return;
    }
    if (op !== null) {
        op = null;
        display.textContent = num1;
        return;
    }
    if (num1 !== "") {
        num1 = num1.slice(0, -1);
        display.textContent = num1 || "0";
    }
}


// ─── Digit Buttons ─────────────────────────────────────────────────────────────

digits.forEach(digit => {
    digit.addEventListener("click", function () {
        const value = digit.textContent;

        // Block duplicate decimal points
        if (value === ".") {
            if (op === null && num1.includes(".")) return;
            if (op !== null && num2.includes(".")) return;
        }

        // Reset state after a completed calculation
        if (justCalculated) {
            num1           = "";
            num2           = "";
            op             = null;
            clickCount     = 0;
            justCalculated = false;
        }

        if (op === null) {
            num1 += value;
            display.textContent = num1;
        } else {
            num2 += value;
            display.textContent = `${num1} ${op} ${num2}`;
        }
    });
});


// ─── Operator Buttons ──────────────────────────────────────────────────────────

operators.forEach(operator => {
    operator.addEventListener("click", function () {
        if (num1 === "") return;                     // No first number yet
        if (op !== null && num2 === "") return;      // Two operators in a row

        clickCount++;

        if (clickCount > 1 && num2 !== "") calc();   // Chain calculation

        op = operator.textContent;
        display.textContent = `${num1} ${op}`;
    });
});


// ─── Button Event Listeners ────────────────────────────────────────────────────

result.addEventListener("click", calc);
clcBtn.addEventListener("click", clearAll);
backspaceBtn.addEventListener("click", backspace);


// ─── Keyboard Support ──────────────────────────────────────────────────────────

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Enter" || key === "=") {
        result.click();
    } else if (!isNaN(key) && key !== " ") {
        const digitBtn = [...digits].find(btn => btn.textContent === key);
        if (digitBtn) digitBtn.click();
    } else if (["+", "-", "*", "/"].includes(key)) {
        const opBtn = [...operators].find(btn => btn.textContent === key);
        if (opBtn) opBtn.click();
    } else if (key === ".") {
        const dotBtn = [...digits].find(btn => btn.textContent === ".");
        if (dotBtn) dotBtn.click();
    } else if (key === "Backspace") {
        backspaceBtn.click();
    }
});