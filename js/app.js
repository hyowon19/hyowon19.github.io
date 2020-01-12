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
const htmlBody = document.querySelector('body');

// Setting click event to each item in this section to show its modal element
for(let i = 0; i < modalContainer.length; i++) {
  modalContainer[i].addEventListener('click', function() {
    this.nextElementSibling.nextElementSibling.classList.add('modal__open');
    htmlBody.classList.add('bodyHideOverflow'); // hides scrolling of body while viewing modals
  });
}

const modalClose = document.getElementsByClassName('modal__close');
// On click event close the modal
for(let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener('click', function() {
    this.parentNode.classList.remove('modal__open');
    htmlBody.classList.remove('bodyHideOverflow'); // adds back scrolling functionality when exiting modals
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
  event.target.blur();
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
let d, month, h, m, s, clockRunning, clockTicking;
const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Sets up clock
function initClock() {
  d = new Date();
  y = d.getFullYear();
  da = d.getDate();
  mon = d.getMonth();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  clockRunning = true;
  clockUpdate();
}

// Updates clock with incremental time counters
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
  setDate();

  if(clockRunning) {
     clockTicking = setTimeout(clockUpdate, 1000);
  }
}

const todayDate = document.querySelector('.jsClock--date');
function setDate() {
  todayDate.innerHTML = months[mon] + ' ' + da + ', ' + y;
}

// Updates the value of counter
function setCounter(id, num) {
  if (id != 'hours' && num < 10) {
    num = '0' + num;
  } else if (id == 'hours') {
    num = '  ' + num;
  }
  document.getElementById(id).textContent = num;
}

// Intermittent blinking of the seperators
const timeSep = document.querySelectorAll('.jsClock--seperator');

function clockBlink() {
  for (let i = 0; i < timeSep.length; i++) {
    if (timeSep[i].classList.contains('hideSep')) {
      timeSep[i].classList.remove('hideSep');
    } else {
      timeSep[i].classList.add('hideSep');
    }
  }
}

// Reset clock
function resetClock() {
  clockRunning = false;
  clearTimeout(clockTicking);

  setTimeout(function() {
    h = 0;
    m = 0;
    s = 0;
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
  }, 50)
}

const jsClockModal = document.getElementById('jsClockModal');
const jsClockClose = document.getElementById('jsClockClose');

jsClockModal.addEventListener('click', () => {
  initClock();
})

jsClockClose.addEventListener('click', () => {
  setTimeout(() => {
    resetClock();
    for (let j = 0; j < timeSep.length; j++) {
      if (timeSep[j].classList.contains('hideSep')) {
        timeSep[j].classList.remove('hideSep');
      } else {
        timeSep[j].classList.add('hideSep');
      }
    }
  }, 25);
})


// JS StopWatch
let stopH = 0,
    stopM = 0,
    stopS = 0,
    stopMS = 0,
    paused = false;

// Sets up stopwatch
function initStopWatch() {
  resetTimer();
}

// Logic handling the time incremental counts
function timerUpdate() {
  stopMS++;
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
  setCounter('sMilSecs', stopMS);
  setCounter('sSecs', stopS);
  setCounter('sMins', stopM);
  setCounter('sHrs', stopH);

  // While not paused, continue the recursive function
  if (!paused) {
    setTimeout(timerUpdate, 10);
  }
}

// Pauses stopwatch
function pauseTimer() {
  paused = true;
}

// Starts stopwatch
function startTimer() {
  paused = false;
  timerUpdate();
}

// Resets/clears stopwatch
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

// Setting up button controls for stopwatch
const pauseButton = document.querySelector('#stopPause');
const resetButton = document.querySelector('#stopReset');
const startButton = document.querySelector('#stopStart');

pauseButton.addEventListener('click', () => { pauseTimer(); });
resetButton.addEventListener('click', () => { resetTimer(); });
startButton.addEventListener('click', () => { startTimer(); });

initStopWatch();


// Little Adventure Logic

// Setting up variables for interaction and data/state storage
const advModal = document.querySelector('#adventureModal');
const storyGreet = document.querySelector('.modal--story--greetings');
const storyQuestion = document.querySelector('.modal--story--question');
const storyAnswers = document.querySelector('.modal--story--answers');
const storyResults = document.querySelector('.modal--story--results');
const storyQuery = document.querySelector('.modal--story--query');
const storyChoices = document.querySelector('.modal--story--query--choices');
const storyQueryResult = document.querySelector('.modal--story--query--result');
const imageResultLocation = document.querySelector('.modal--story--results--images');
const imageResultPerson = document.querySelector('#imgResPerson');
const imageResultActivity = document.querySelector('#imgResActivity');

const choiceOne = document.querySelector('#choice1');
const choiceTwo = document.querySelector('#choice2');
const choiceThree = document.querySelector('#choice3');
const answerOne = document.querySelector('#answer1');
const answerTwo = document.querySelector('#answer2');
const answerThree = document.querySelector('#answer3');
const imageOne = document.querySelector('#image1');
const imageTwo = document.querySelector('#image2');
const imageThree = document.querySelector('#image3');
const queryYes = document.querySelector('#qYes');
const queryNo = document.querySelector('#qNo');
const storyClose = document.querySelector('.modalStoryClose');

const storyAvatars = ['Jimmy', 'Billy', 'Jessica'];
const storyLocations = ['Montreal', 'Toronto', 'Vancouver'];
const storyActivities = ['Dining', 'Shopping', 'Swimming'];

const initialQuery = 'Please select your character.';

const avatarHappy = ['great', 'Loved', 'Will definitely do this again!'];
const avatarUnhappy = ['terrible','Hated', 'Hopefully will not experience this again.'];
const avatarBored = ['boring', 'Suffered', 'Maybe next time will be better...']
let avatarState = '';
let avatarReaction = '';
let avatarConclusion = '';

//initial setup of values
answerOne.innerHTML = storyAvatars[0];
answerTwo.innerHTML = storyAvatars[1];
answerThree.innerHTML = storyAvatars[2];

let answ1, answ2, answ3, locationComplete, avatarComplete, activityComplete, qYes, qNo;
    answ1 = answ2 = answ3 = locationComplete = avatarComplete = activityComplete = qYes = qNo = false;
let locationPicked = '';
let avatarPicked = '';
let activityPicked= '';
let imageLocation = '';
let imageAvatar = '';
let imageActivity = '';

// initial load up on opening of modal
advModal.addEventListener('click', () => {
  if (advModal.classList.contains('advModalOpen')) {

  } else {
    advModal.classList.add('advModalOpen');
    initStory();
  }
})

// Click events on choices
choiceOne.addEventListener('click', () => {
  answ1 = true;
  hideGreet();
  hideQuestion();
  hideAnswers();
  updateInfo();
  updateStory();
})

choiceTwo.addEventListener('click', () => {
  answ2 = true;
  hideGreet();
  hideQuestion();
  hideAnswers();
  updateInfo();
  updateStory();
})

choiceThree.addEventListener('click', () => {
  answ3 = true;
  hideGreet();
  hideQuestion();
  hideAnswers();
  updateInfo();
  updateStory();
})

// Click event, restarts story
queryYes.addEventListener('click', () => {
  resetStory();
  setTimeout(() => {
    initStory();
  }, 1000)
});

// Click event, closes modal and resets story
queryNo.addEventListener('click', () => {
  queryNo.closest('.modal--content').parentNode.classList.remove('modal__open')
  htmlBody.classList.remove('bodyHideOverflow');
  setTimeout(() => { advModal.classList.remove('advModalOpen'); }, 100)
  resetStory();
})

// Click event, closes modal and resets story
storyClose.addEventListener('click', () => {
  setTimeout(() => { advModal.classList.remove('advModalOpen'); }, 100)
  resetStory();
})

// Initializes story
function initStory() {
  setCharacterImage();
  showGreet();
  showQuestion();
  showAnswers();
  hideImageResults();
  hideQueryResult();
  hideResults();
  hideQuery();
  hideChoices();
}

// Resets story parameters
function resetStory() {
  hideGreet();
  hideQuestion();
  hideAnswers();
  hideImageResults();
  hideQueryResult();
  hideResults();
  hideQuery();
  hideChoices();
  setTimeout(() => {
    setCharacterImage();
    storyQuestion.innerHTML = initialQuery;
    answerOne.innerHTML = storyAvatars[0];
    answerTwo.innerHTML = storyAvatars[1];
    answerThree.innerHTML = storyAvatars[2];
    locationPicked = avatarPicked = activityPicked = '';
    answ1 = answ2 = answ3 = locationComplete = avatarComplete = activityComplete = qYes = qNo = false;
  }, 150)
}

// Selects a random experience for the avatar
function randomExp() {
  switch(Math.floor(Math.random() * 3) + 1) {
    case 1:
      avatarState = avatarHappy[0];
      avatarReaction = avatarHappy[1];
      avatarConclusion = avatarHappy[2];
      break;
    case 2:
      avatarState = avatarUnhappy[0];
      avatarReaction = avatarUnhappy[1];
      avatarConclusion = avatarUnhappy[2];
      break;
    case 3:
      avatarState = avatarBored[0];
      avatarReaction = avatarBored[1];
      avatarConclusion = avatarBored[2];
      break;
  }
}

// Sets the images for avatar selection
function setCharacterImage() {
  imageOne.src = "./img/person01.jpg";
  imageTwo.src = "./img/person02.jpg";
  imageThree.src = "./img/person03.jpg";
}

// Sets the images for location selection
function setLocationImage() {
  imageOne.src = "./img/montreal0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
  imageTwo.src = "./img/toronto0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
  imageThree.src = "./img/vancouver0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
}

// Sets the images for activity selection
function setActivityImage() {
  imageOne.src = "./img/food0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
  imageTwo.src = "./img/shopping0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
  imageThree.src = "./img/swimming0" + (Math.floor(Math.random() * 2) + 1) + ".jpg";
}

// Updates story information depending on which section it is in
function updateInfo() {
  setTimeout(() => {
    if (!avatarComplete) {
      if (answ1) {
        avatarPicked = answerOne.innerHTML;
        imageAvatar = imageOne.src;
      } else if (answ2) {
        avatarPicked = answerTwo.innerHTML;
        imageAvatar = imageTwo.src;
      } else if (answ3) {
        avatarPicked = answerThree.innerHTML;
        imageAvatar = imageThree.src;
      }
      answ1 = answ2 = answ3 = false;
      answerOne.innerHTML = storyLocations[0];
      answerTwo.innerHTML = storyLocations[1];
      answerThree.innerHTML = storyLocations[2];
      storyQuestion.innerHTML = "Greetings " + avatarPicked + "! Where would you like to go today?";
      setLocationImage();
      avatarComplete = true;
    }
    else if (avatarComplete && !locationComplete) {
      if (answ1) {
        locationPicked = answerOne.innerHTML;
        imageLocation = imageOne.src;
      } else if (answ2) {
        locationPicked = answerTwo.innerHTML;
        imageLocation = imageTwo.src;
      } else if (answ3) {
        locationPicked = answerThree.innerHTML;
        imageLocation = imageThree.src;
      }
      answ1 = answ2 = answ3 = false;
      answerOne.innerHTML = storyActivities[0];
      answerTwo.innerHTML = storyActivities[1];
      answerThree.innerHTML = storyActivities[2];
      storyQuestion.innerHTML = "And what would like you to do in " + locationPicked + '?';
      setActivityImage();
      locationComplete = true;
    }
    else if (avatarComplete && locationComplete && !activityComplete) {
      if (answ1) {
        activityPicked = answerOne.innerHTML;
        imageActivity = imageOne.src;
      } else if (answ2) {
        activityPicked = answerTwo.innerHTML;
        imageActivity = imageTwo.src;
      } else if (answ3) {
        activityPicked = answerThree.innerHTML;
        imageActivity = imageThree.src;
      }
      answ1 = answ2 = answ3 = false;
      activityComplete = true;
      activityPicked = activityPicked.toLowerCase();
      imageResultPerson.src = imageAvatar;
      imageResultActivity.src = imageActivity;
      imageResultLocation.style.backgroundImage = "url(" + imageLocation + ")";
      randomExp();
      storyQueryResult.innerHTML = avatarPicked + ' had a ' + avatarState + ' time ' + activityPicked + ' in ' + locationPicked + '. ' + avatarReaction + ' every minute of it!';
      storyResults.innerHTML = avatarConclusion;
    }
  }, 500)
}

// Loads/shows the next part of story with updated information
function updateStory() {
  setTimeout(() => {
    if (avatarComplete && !locationComplete && !activityComplete) {
      showQuestion();
      showAnswers();
    } else if (avatarComplete && locationComplete && !activityComplete) {
      showQuestion();
      showAnswers();
    } else if (avatarComplete && locationComplete && activityComplete) {
      showImageResults();
      showQueryResult();
      showResults();
      showQuery();
      showChoices();
    }
  }, 500);
}

// Shows the greet component
function showGreet() {
  storyGreet.style.display = 'flex';
  setTimeout(() => {
    if(storyGreet.classList.contains('modal--story--hide')) {
      storyGreet.classList.remove('modal--story--hide');
    }
  }, 375);
}

// Hides the greet component
function hideGreet() {
  storyGreet.classList.add('modal--story--hide');
  setTimeout(() => { storyGreet.style.display = 'none'; }, 500);

}

// Hides the question component
function showQuestion() {
  storyQuestion.style.display = 'flex';
  setTimeout(() => {
    if(storyQuestion.classList.contains('modal--story--hide')) {
      storyQuestion.classList.remove('modal--story--hide');
    }
  }, 875);
}

// Shows the question component
function hideQuestion() {
  storyQuestion.classList.add('modal--story--hide');
  setTimeout(() => { storyQuestion.style.display = 'none'; }, 500)
}

// Shows the answer section component
function showAnswers() {
  storyAnswers.style.display = 'flex';
  setTimeout(() => {
    if(storyAnswers.classList.contains('modal--story--hide')) {
      storyAnswers.classList.remove('modal--story--hide');
      setTimeout(() => {
        if(choiceOne.classList.contains('modal--story--hideTwo')) {
          choiceOne.classList.remove('modal--story--hideTwo');
        }
      }, 150);
      setTimeout(() => {
        if(choiceTwo.classList.contains('modal--story--hideTwo')) {
          choiceTwo.classList.remove('modal--story--hideTwo');
        }
      }, 300);
      setTimeout(() => {
        if(choiceThree.classList.contains('modal--story--hideTwo')) {
          choiceThree.classList.remove('modal--story--hideTwo');
        }
      }, 450);
    }
  }, 1375)
}

// Hides the answer section component
function hideAnswers() {
  storyAnswers.classList.add('modal--story--hide');
  choiceOne.classList.add('modal--story--hideTwo');
  choiceTwo.classList.add('modal--story--hideTwo');
  choiceThree.classList.add('modal--story--hideTwo');
  setTimeout(() => { storyAnswers.style.display = 'none'; }, 500);
}

// Shows the results component
function showResults() {
  storyResults.style.display = 'flex';
  setTimeout(() => {
    if(storyResults.classList.contains('modal--story--hide')) {
      storyResults.classList.remove('modal--story--hide');
    }
  }, 1500)
}

// Hides the results component
function hideResults() {
  storyResults.classList.add('modal--story--hide');
  setTimeout(() => { storyResults.style.display = 'none'; }, 500);
}

// Shows the final query component
function showQuery() {
  storyQuery.style.display = 'flex';
  setTimeout(() => {
    if(storyQuery.classList.contains('modal--story--hide')) {
      storyQuery.classList.remove('modal--story--hide');
    }
  }, 2500)
}

// Hides the final query component
function hideQuery() {
  storyQuery.classList.add('modal--story--hide');
  setTimeout(() => { storyQuery.style.display = 'none'; }, 500);
}

// Shows the query results component
function showQueryResult() {
  storyQueryResult.style.display = 'flex';
  setTimeout(() => {
    if(storyQueryResult.classList.contains('modal--story--hide')) {
      storyQueryResult.classList.remove('modal--story--hide');
    }
  }, 1250)
}

// Hides the query results component
function hideQueryResult() {
  storyQueryResult.classList.add('modal--story--hide');
  setTimeout(() => { storyQueryResult.style.display = 'none'; }, 500);
}

// Shows the choices component
function showChoices() {
  storyChoices.style.display = 'flex';
  setTimeout(() => {
    if(storyChoices.classList.contains('modal--story--hide')) {
      storyChoices.classList.remove('modal--story--hide');
      setTimeout(() => {
        if(queryYes.classList.contains('modal--story--hideTwo')) {
          queryYes.classList.remove('modal--story--hideTwo');
        }
      }, 150);
      setTimeout(() => {
        if(queryNo.classList.contains('modal--story--hideTwo')) {
          queryNo.classList.remove('modal--story--hideTwo');
        }
      }, 300);
    }
  }, 2750)
}

// Hides the choices component
function hideChoices() {
  storyChoices.classList.add('modal--story--hide');
  queryYes.classList.add('modal--story--hideTwo');
  queryNo.classList.add('modal--story--hideTwo');
  setTimeout(() => { storyChoices.style.display = 'none'; }, 500);
}

// Shows the image results component
function showImageResults() {
  imageResultLocation.style.display = 'flex';
  setTimeout(() => {
    if(imageResultLocation.classList.contains('modal--story--hideTwo')) {
      imageResultLocation.classList.remove('modal--story--hideTwo');
      setTimeout(() => {
        if(imageResultPerson.classList.contains('modal--story--hideTwo')) {
          imageResultPerson.classList.remove('modal--story--hideTwo');
        }
      }, 450);
      setTimeout(() => {
        if(imageResultActivity.classList.contains('modal--story--hideTwo')) {
          imageResultActivity.classList.remove('modal--story--hideTwo');
        }
      }, 650);
    }
  }, 250)
}

// Hides the image results component
function hideImageResults() {
  imageResultLocation.classList.add('modal--story--hideTwo');
  imageResultPerson.classList.add('modal--story--hideTwo');
  imageResultActivity.classList.add('modal--story--hideTwo');
  setTimeout(() => { imageResultLocation.style.display = 'none'; }, 500);
}


//Random User API fetch logic
// helper functions for carousel creation
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const rUsers = document.getElementById('rUsers');
const url = 'https://randomuser.me/api/?results=15';

//debating on this, maybe will just load a carousel of 15 instead
function initiateCall() {
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let randomUsers = data.results;
    return randomUsers.map(function(randomUser) {
      let div = createNode('div'),
          img = createNode('img'),
          span = createNode('span');
      div.classList.add('randomUsers--item');
      img.src = randomUser.picture.large;
      span.innerHTML = `${randomUser.name.first} ${randomUser.name.last}`;
      append(div, img);
      append(div, span);
      append(rUsers, div);
    })
  })
  .catch(function(error) {
    console.log(error);
  });
}

// new Glide('.glide').mount();

// var glide = new Glide('#intro', {
//   type: 'carousel',
//   perView: 4,
//   focusAt: 'center',
//   breakpoints: {
//     800: {
//       perView: 2
//     },
//     480: {
//       perView: 1
//     }
//   }
// }).mount();

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  focusAt: 'center'
}).mount();

// glide.mount()

setTimeout(() => {
  const leftArrow = document.querySelector('.glide__arrow--left');
  const rightArrow = document.querySelector('.glide__arrow--right');

  leftArrow.addEventListener('click', () => { console.log('left arrow clicked'); })

  rightArrow.addEventListener('click', () => { console.log('right arrow clicked'); })
}, 500);
