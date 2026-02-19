let justCalculated = false;

function add(a, b){
return a + b
}
function subtract(a, b){
return a - b
}
function multiply(a, b){
return a * b
}
function divide(a, b){
return a / b
}
let clickCount = 0;
let num1= ""
let num2= ""
let op = null
function operate(op, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);


    if(op === "+"){
        return add(num1,num2)
    }else if (op === "-"){
        return subtract(num1,num2)
    }else if (op === "*"){
        return multiply(num1, num2)
    }else if (op === "/"){
        return divide(num1,num2)
    }
}


const display = document.getElementById("dspl")
const digits = document.querySelectorAll(".digit")

digits.forEach(digit => {
        digit.addEventListener("click", function(){
                    const value = digit.textContent;

        // If decimal point is clicked
        if (value === ".") {

            // If entering first number
            if (op === null) {
                if (num1.includes(".")) return; // 🚫 already has decimal
            } 
            // If entering second number
            else {
                if (num2.includes(".")) return; // 🚫 already has decimal
            }
        }
            
            if (justCalculated) {
            num1 = "";
            num2 = "";
            op = null;
            clickCount = 0;
            justCalculated = false;
        }

            if (op === null){
num1+= digit.textContent;
display.textContent= num1
}else{
num2+= digit.textContent;
display.textContent= display.textContent = num1 + " " + op + " " + num2
}
})})


const opreators = document.querySelectorAll(".operator")
/*opreators.forEach(operator => {
        operator.addEventListener("click", function(){
            clickCount++
            if (clickCount > 1) {
    calc()
    op= operator.textContent;
display.textContent = num1 + " " + op
  }else if (op !== null && num2 === "") {
            return
        }else {
op= operator.textContent;
display.textContent = num1 + " " + op}
})
});*/

opreators.forEach(operator => {
    operator.addEventListener("click", function(){

        // 🚫 No first number
        if (num1 === "") return;

        // 🚫 Prevent operator after operator
        if (op !== null && num2 === "") {
            return;
        }

        clickCount++; // increment only when valid

        if (clickCount > 1 && num2 !== "") {
            calc();
        }

        op = operator.textContent;
        display.textContent = num1 + " " + op;
    });
});

const result = document.getElementById("result")
function calc(){
    if(op==="/" && num2==="0"){
        return display.textContent = "thats a foul!"
    }else{
    let res = operate(op, num1, num2)
    res = parseFloat(res.toFixed(9));
display.textContent = res
num1 = res
num2=""
op=null
clickCount=0
justCalculated = true;

}}
result.addEventListener("click", calc)
;
const clc= document.getElementById("clearAll")
clc.addEventListener("click",()=>{
    display.textContent = "0"
 clickCount = 0;
 num1= ""
 num2= ""
 op = null
})

const backspaceBtn = document.getElementById('backspaceBtn');
backspaceBtn.addEventListener('click',()=>{
    if (num2 !==""){
        num2=num2.slice(0,-1);
        display.textContent = num1+" "+ op +" "+num2
        return
    }
    if (op !== null){
        op=null
        display.textContent = num1
        return
    }
    if (num1 !==""){
        num1=num1.slice(0,-1);
        display.textContent = num1 || 0
        return
    }
})
document.addEventListener("keydown", (event)=>{
    const key = event.key
    if (key === "Enter" || key ==="="){
        result.click()
    }
    if (!isNaN(key)){
        const digitBtn = [...digits].find(btn => btn.textContent === key)
        if (digitBtn) digitBtn.click();
    }
    if (["+","-","*","/"].includes(key)){
        const opBtn = [...opreators].find(btn => btn.textContent === key);
        if (opBtn) opBtn.click();

    }
    if(key === "."){
        const dotBtn = [...digits].find(btn => btn.textContent === ".");
if (dotBtn) dotBtn.click();

    }
    if (key === "backspace"){
        backspaceBtn.click()
    }
})
/*document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Equals
    if (key === "Enter" || key === "=") {
        result.click();
    }

    // Digits
    if (!isNaN(key)) {
        const digitBtn = [...digits].find(btn => btn.textContent === key);
        if (digitBtn) digitBtn.click();
    }

    // Operators
    if (["+", "-", "*", "/"].includes(key)) {
        const opBtn = [...opreators].find(btn => btn.textContent === key);
        if (opBtn) opBtn.click();
    }

    // Decimal
    if (key === ".") {
        const dotBtn = [...digits].find(btn => btn.textContent === ".");
        if (dotBtn) dotBtn.click();
    }

    // Backspace
    if (key === "Backspace") {
        backspaceBtn.click();
    }
});
*/

