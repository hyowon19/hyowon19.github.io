// Accordion Logic, checks for active class on load and toggles the class accordingly
const accordion = document.getElementsByClassName("module--top");

for (let i = 0; i < accordion.length; i++) {
  // Checks on page load for any accordion element that has the active class to open
  if (accordion[i].children[1].classList.contains('module--accordion__active')) {
    accordion[i].nextElementSibling.style.maxHeight = accordion[i].nextElementSibling.scrollHeight + 'px';
  }
  // Assign click event handler to each accordion
  accordion[i].addEventListener("click", function() {
    this.children[1].classList.toggle("module--accordion__active");
    let module = this.nextElementSibling;
    // Checks on click if element is at maxHeight or not. If true, accordion will close.  If false, accordion will open.
    if (module.style.maxHeight) {
      module.style.maxHeight = null;
    } else {
      module.style.maxHeight = module.scrollHeight + 'px';
    }
  });
}

// On page load, shuffle div elements randomly in contact section
(function() {
  const skills = document.querySelector('#skills');
  for(let i = skills.children.length; i >= 0; i--) {
    skills.appendChild(skills.children[Math.random() * i | 0]);
  }
}) ();


// Modal Logic
const modalContainer = document.getElementsByClassName('modal--container');
// Setting click event to each item in this section to show its modal element
for(let i = 0; i < modalContainer.length; i++) {
  modalContainer[i].addEventListener('click', function() {
    this.nextElementSibling.nextElementSibling.classList.add('modal__open');
  });
}

const modalClose = document.getElementsByClassName('modal__close');
// On click event close the modal
for(let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener('click', function() {
    this.parentNode.classList.remove('modal__open');
  })
}

// Character Remaining Display Logic
const charDisplay = document.querySelector('#charDisplay');
const formMessage = document.querySelector('#formMessage');
const charMax = formMessage.getAttribute('maxlength');

charDisplay.innerHTML = charMax; // set initial value of message box

// logic to display remaining characters in textbox
formMessage.addEventListener('input', () => {
  const charCount = formMessage.textLength;
  charDisplay.innerHTML = charMax - charCount;
})

// Form Reset Button logic
const formReset = document.querySelector('#formReset');
const formName = document.querySelector('#formName');
const formEmail = document.querySelector('#formEmail');
const formPass = document.querySelector('#formPass');
const formConfirmPass = document.querySelector('#formConfirmPass');

const errName = document.querySelector('#errName');
const errEmail = document.querySelector('#errEmail');
const errPass = document.querySelector('#errPass');
const errConfirmPass = document.querySelector('#errConfirmPass');

formReset.addEventListener('click', event => {
  event.preventDefault();
  formName.value = '';
  formEmail.value = '';
  formPass.value = '';
  formConfirmPass.value = '';
  formMessage.value = '';
  errName.innerHTML = '';
  errEmail.innerHTML = '';
  errPass.innerHTML = '';
  errConfirmPass.innerHTML = '';
  errName.classList.remove('form--error__active');
  errEmail.classList.remove('form--error__active');
  errPass.classList.remove('form--error__active');
  errConfirmPass.classList.remove('form--error__active');
  formResult.classList.remove('form--result__pass', 'form--result__error');
  event.currentTarget.blur();
  event.target.blut();
})

// Checks if form field is empty
function validateField(str) {
  return str.value.length === 0 ? false : true;
}

// Checks if name is valid
function validateName(str) {
  const textReg = new RegExp(/^[A-zÀ-ÿ-_.' ]*$/);
  return textReg.test(str.value.trim());
}

// Checks if email is valid
function validateEmail(str) {
  const emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailReg.test(str.value);
}

function validateCreatePass(str) {
  const passReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{8,12}$)");
  return passReg.test(str.value);
}

function validateConfirmPass(str) {
  const passConfirmReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{8,12}$)");
  return passConfirmReg.test(str.value);
}

const formSubmit = document.querySelector('#formSubmit');
const formResult = document.querySelector('.form--result');


formSubmit.addEventListener('click', event => {
  event.preventDefault();
  formResult.classList.remove('form--result__pass', 'form--result__error');
  let isName = false;
  let isEmail = false;
  let isPass = false;
  let isConfirmPass = false;
  // checks Name field
  if (validateField(formName)) { // field is not empty
    if (validateName(formName)) { // name is valid
      errName.innerHTML = '';
      errName.classList.remove('form--error__active');
      isName = true;
    } else { // name is invalid
      errName.innerHTML = 'Invalid. Please use text only.';
      errName.classList.add('form--error__active');
    }
  } else { // field is empty
    errName.innerHTML = 'This field is required.';
    errName.classList.add('form--error__active');
  }
  // checks Email field
  if (validateField(formEmail)) { // field is not empty
    if (validateEmail(formEmail)) { // email is valid
      errEmail.innerHTMl = '';
      errEmail.classList.remove('form--error__active');
      isEmail = true;
    } else { // email is invalid
      errEmail.innerHTML = 'Invalid. Please enter a correct email.';
      errEmail.classList.add('form--error__active');
    }
  } else { // field is empty
    errEmail.innerHTML = 'This field is required.'
    errEmail.classList.add('form--error__active');
  }
  // checks password field
  if (validateField(formPass)) { // field is not empty
    if (validateCreatePass(formPass)){ // password is valid
      if (formPass.value === formConfirmPass.value) { // password matches with confirm passowrd
        errPass.innerHTML = '';
        errPass.classList.remove('form--error__active');
        isPass = true;
      } else { // passwords do not match
        errPass.innerHTML = 'The passwords do not match.';
        errPass.classList.add('form--error__active');
      }
    } else { // password is invalid
      errPass.innerHTML = 'Need upper and lowercase letter, number, and symbol';
      errPass.classList.add('form--error__active');
    }
  } else { // field is empty
    errPass.innerHTML = 'This field is required.';
    errPass.classList.add('form--error__active');
  }
  // checks confirm password field
  if (validateField(formConfirmPass)) { // field is not empty
    if (validateConfirmPass(formConfirmPass)){ // confirm password is valid
      if (formConfirmPass.value === formPass.value) { // confirm password matches with password
        errConfirmPass.innerHTML = '';
        errConfirmPass.classList.remove('form--error__active');
        isConfirmPass = true;
      } else { // passwords do not match
        errConfirmPass.innerHTML = 'The passwords do not match.';
        errConfirmPass.classList.add('form--error__active');
      }
    } else { // confirm password is invalid
      errConfirmPass.innerHTML = 'Need upper and lowercase letter, number, and symbol';
      errConfirmPass.classList.add('form--error__active');
    }
  } else { // field is empty
    errConfirmPass.innerHTML = 'This field is required';
    errConfirmPass.classList.add('form--error__active');
  }

  // checks if form can be submitted or not
  if (isName && isEmail && isPass && isConfirmPass) { // form passes
    formResult.innerHTML = 'Your fields are correct and pass the js verification test client side.';
    formResult.classList.add('form--result__pass');
  } else { // form fails
    formResult.innerHTML = 'There is an issue with your form.  Please correct it.'
    formResult.classList.add('form--result__error');
  }
  event.target.blur();
})

// JS Clock Section
let d, h, m, s;

function initClock() {
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  clockUpdate();
}

function clockUpdate() {
  s++;
  if (s >= 60) {
    s = 0;
    m++;
    if (m >= 60) {
      m = 0;
      h++;
      if (h >= 24) {
        h = 0;
      }
    }
  }
  clockBlink();
  setCounter('seconds', s);
  setCounter('minutes', m);
  setCounter('hours', h);
  setTimeout(clockUpdate, 1000);
}

function setCounter(id, num) {
  if (id != 'hours' && num < 10) {
    num = '0' + num;
  } else if (id == 'hours') {
    num = '  ' + num;
  }
  document.getElementById(id).textContent = num;
}

function clockBlink() {
  const timeSep = document.querySelectorAll('.jsClock--seperator');
  for (let i = 0; i < timeSep.length; i++) {
    if (timeSep[i].classList.contains('hideSep')) {
      timeSep[i].classList.remove('hideSep');
    } else {
      timeSep[i].classList.add('hideSep');
    }
  }
}

initClock();

// JS StopWatch
let stopH = 0,
    stopM = 0,
    stopS = 0,
    stopMS = 0,
    paused = false;

function initStopWatch() {
  resetTimer();
}

function timerUpdate() {
  // console.log('in here');
  stopMS++;
  // console.log(stopMS);
  if (stopMS >= 100) {
    stopMS = 0;
    stopS++;
    if (stopS >= 60) {
      stopS = 0;
      stopM++;
      if (stopM >= 60) {
        stopM = 0;
        stopH++;
        if (stopH >= 24) {
          stopH = 0;
        }
      }
    }
  }
  setTimeUnit('sMilSecs', stopMS);
  setTimeUnit('sSecs', stopS);
  setTimeUnit('sMins', stopM);
  setTimeUnit('sHrs', stopH);
  if (!paused) {
    setTimeout(timerUpdate, 10);
  }
}

function stopTimer() {
  paused = true;
}

function startTimer() {
  paused = false;
  timerUpdate();
}

function resetTimer() {
  paused = true;
  setTimeout(function() {
    stopH = 0;
    stopM = 0;
    stopS = 0;
    stopMS = 0;
    document.getElementById('sMilSecs').innerHTML = '00';
    document.getElementById('sSecs').innerHTML = '00';
    document.getElementById('sMins').innerHTMl = '00';
    document.getElementById('sHrs').innerHTML = '00';
  },10)
}

initStopWatch();

// function msDisplay(spd) {
//
// }

function setTimeUnit(id, num) {
  if (num < 10) {
    num = '0' + num;
  }
  document.getElementById(id).textContent = num;
}


// var startTime = Date.now();
//
// var ss = 0;
//
// var interval = setInterval(function() {
//     // var ss = 0;
//     var elapsedTime = Date.now() - startTime;
//     // console.log(elapsedTime);
//     if ((elapsedTime / 1000) >= 1000) {
//       ss++;
//       console.log(ss);
//     }
//     document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
// }, 10);
