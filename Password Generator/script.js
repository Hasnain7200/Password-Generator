
// Decleartion of varibales
const inputSlider=document.querySelector("[data-Lengthslider]");
const lengthNumber=document.querySelector("[password-length-number]");
const passwordDisplay=document.querySelector("[data-PasswordDisplay]");
const copyMessage=document.querySelector("[dataCopyMessage]");
const copyBtn=document.querySelector("[dataCopy]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const symbol=document.querySelector("#symbols");
const number=document.querySelector("#numbers");
const indicator=document.querySelector("[ data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~!@#$%^&*()_-+={[}]|\:;".<,>?/';

let password="";
let passwordlength=10;
let checkCount=0;
handleSlider();
// set strength circle color to grey


// Function which sets the length of password
// This function reflects the value of password on the screen
function handleSlider(){
inputSlider.value=passwordlength;
lengthNumber.innerText=passwordlength;
}


// This function sets the color and colour and the shadow for the indicator which tells that the password is strong or not
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.textShadow=color;
}

// It retruns a Random integer between the min and the max value 
function getRandomInteger(min,max){
return Math.floor(Math.random()*(max-min))+min;
}
 

// It returns the radaom value between 0 and 9
function generateRandomNum(){
    return getRandomInteger(0,9);
}
 

// It return the random lowercase
function generateLowerCase(){
    // String.fromCharCode converts intgere to string
    return String.fromCharCode(getRandomInteger(97,123));
}


// It return the random uppercase
function generateUpperCase(){
    // String.fromCharCode converts intgere to string
    return String.fromCharCode(getRandomInteger(65,91));
}


// It return the random symbol
function genearteSymbol(){
const randomNum=getRandomInteger(0,symbols.length);
return symbols.charAt(randomNum);
}


// This function caclculate the strength of the password
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (number.checked) hasNum = true;
    if (symbol.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

// unction to copy content on clipboard
async function copyContent(){

try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMessage.innerText="copied";
}

catch(e){
copyMessage.innerText="Failed";
}

// To make copy message visible
copyMessage.classList.add("active");

setTimeout( () => {
    copyMessage.classList.remove("active");
},2000)

}

function handleCheckBoxChange(){
   checkCount=0;
   allCheckBox.forEach((checkbox) =>{
    if(checkbox.checked){
        checkCount++;
    }
   }) ; 

   if(passwordlength<checkCount){
    passwordlength=checkCount;
    handleSlider();
   }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) =>{
    passwordlength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value){
    copyContent();}
})

function shufflePass(array){
    // Fisher Yates Method
        //Fisher Yates Method
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        let str = "";
        array.forEach((el) => (str += el));
        return str;
}

generateBtn.addEventListener('click',() =>{
 //None of the checkbox are selected

 if(checkCount == 0)
 return;

 if(passwordlength <checkCount){
    passwordLength =checkCount;
    handleSlider();
 }

//  lets start the game

console.log( )
//Remove old password
password="";
// if(uppercaseCheck.checked){
//     password += generateUpperCase();
// }


// if(lowercasecaseCheck.checked){
//     password += generateLowerCase();
// }

// if(symbolCheck.checked){
//     password += genearteSymbol();
// }

// if(numbersCheckCheck.checked){
//     password += generateRandomNum();
// }

let funcArr=[];

if(uppercase.checked)
funcArr.push(generateUpperCase);

if(lowercase.checked)
funcArr.push(generateLowerCase);

if(number.checked)
funcArr.push(generateRandomNum);

if(symbol.checked)
funcArr.push(genearteSymbol);

// Compulasar addition

for(let i=0;i<funcArr.length;i++){
    password +=funcArr[i]();
}


for(let i=0;i<passwordlength-funcArr.length;i++){
    let ranIndex=getRandomInteger(0,funcArr.length);
    password += funcArr[ranIndex]();
}

//SHufle password

password =shufflePass(Array.from(password));

passwordDisplay.value=password;

calcStrength();

});

