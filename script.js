const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCase = document.querySelector("#uppercase");
const lowercaseCase = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbole");
const indicator = document.querySelector("[data-indicater]");
const generaterBtn = document.querySelector(".generateButton");
const allChechBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set circle color  


// set passwordlength
  function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
  }

  function setIndicator(color) {
    indicator.computedStyleMap.backgroundcolor = color;
  }

  function grtRndInt(mim , max) {
    return Math.floor (Math.random() * (max - min))()  + min;
  }

function getRandomNumber() {
  return getRndInt(0,9);
}

function generateUpperCase() {
  return String.fromCharCode(getRndInt(65,91));
}

function generatelowerCase() {
  return String.fromCharCode(getRndInt(97,123));
}

function generateSymbol() {
  const randNum =grtRndInt(0,symbols.length);
  return symbols.charArt(randNum);
}

function calcStrength(){
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if(uppercaseCheck.checked) hasUpper = true;
  if(lowercaseCheck.checked) hasLower = true;
  if(numberCheck.checked) hasNum = true;
  if(symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
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

async function copyContent() {
      try{
          await navigator.clipboard.writeText(passwordDisplay.value);
          copyMsg.innerText = "copied";
       }
      catch(e) {
          copyMsg.innerText("Failed")
       }
       //copy span invisible

       copyMsg.classList.add("active");

       setTimeout(() => {
        copyMsg.classList.remove("active")
       }, 2000);
}



function shufflePassword() {
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

function handleCheckBoxChange() {
  checkcount = 0;
  allChechBox.forEach( (checkbox) => {
    checkcount++;
  });

  if (passwordLength < checkcount) {
    passwordLength = checkcount;
    handleSlider();
  }
}

allChechBox.forEach( (checkBox) => {
  checkBox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) =>{
  passwordLength = e.target.value;
  handleSlider();
})

copyBtn.addEventListener( 'click', () => {
  if (passwordDisplay.value)
  copyContent();
})

generaterBtn.addEventListener('click', () => {
  //none of the checkbox are selected

  if(checkCount == 0) 
      return;

  if(passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
  }

  // let's start the jouney to find new password
  console.log("Starting the Journey");
  //remove old password
  password = "";

  //let's put the stuff mentioned by checkboxes

  // if(uppercaseCheck.checked) {
  //     password += generateUpperCase();
  // }

  // if(lowercaseCheck.checked) {
  //     password += generateLowerCase();
  // }

  // if(numbersCheck.checked) {
  //     password += generateRandomNumber();
  // }

  // if(symbolsCheck.checked) {
  //     password += generateSymbol();
  // }

  let funcArr = [];

  if(uppercaseCheck.checked)
      funcArr.push(generateUpperCase);

  if(lowercaseCheck.checked)
      funcArr.push(generateLowerCase);

  if(numbersCheck.checked)
      funcArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
      funcArr.push(generateSymbol);

  //compulsory addition
  for(let i=0; i<funcArr.length; i++) {
      password += funcArr[i]();
  }
  console.log("COmpulsory adddition done");

  //remaining adddition
  for(let i=0; i<passwordLength-funcArr.length; i++) {
      let randIndex = getRndInteger(0 , funcArr.length);
      console.log("randIndex" + randIndex);
      password += funcArr[randIndex]();
  }
  console.log("Remaining adddition done");
  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling done");
  //show in UI
  passwordDisplay.value = password;
  console.log("UI adddition done");
  //calculate strength
  calcStrength();
});