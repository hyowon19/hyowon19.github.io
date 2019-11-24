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

formReset.addEventListener('click', event => {
  event.preventDefault();
  formName.value = '';
  formEmail.value = '';
  formPass.value = '';
  formConfirmPass.value = '';
  formMessage.value = '';
  event.target.blur();
})

function validateName(str) {
  var textRegex = /^[A-zÀ-ÿ-_.' ]*$/;
  if (str.value.length === 0) {
    return false;
  } else {
    return textRegex.test(str.value.trim());
  }
}

function validateEmail(str) {

}

function validateCreatePass(str) {

}

function validateConfirmPass(str) {

}

const formSubmit = document.querySelector('#formSubmit');

formSubmit.addEventListener('click', event => {
  event.preventDefault();
  console.log('pressed');
  event.target.blur();
})
