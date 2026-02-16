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