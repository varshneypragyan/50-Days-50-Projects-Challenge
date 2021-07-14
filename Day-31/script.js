const resultEl =  document.getElementById('result');
const lengthEl =  document.getElementById('length');
const upperCaseEl =  document.getElementById('uppercase');
const lowerCaseEl =  document.getElementById('lowercase');
const numberEl =  document.getElementById('numbers');
const symbolEl =  document.getElementById('symbols');
const generateEl =  document.getElementById('generate');
const clipboardEl =  document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', ()=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})

generate.addEventListener('click', ()=> {
    const length = +lengthEl.value;
    const hasLower = lowerCaseEl.checked;
    const hasUpper = upperCaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter( item => Object.values(item)[0] );
    if(typesCount === 0) {
        return '';
    }

    for(let i=0; i< length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const prefinalPassword = generatedPassword.slice(0, length);
    const finalPassword = shuffleString(prefinalPassword);
    console.log(finalPassword, prefinalPassword);
    return finalPassword;
}

function shuffleString(s) {
    let arr = s.split('');
    let n = arr.length;
  
    for(let i=0 ; i<n-1 ; ++i) {
        let j = Math.floor(Math.random() * n);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    s = arr.join('');
    return s;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol() {
    const Symbols = "!@#$%^&*()[]{}=<>/.,";
    return Symbols[Math.floor(Math.random()*Symbols.length)];
}