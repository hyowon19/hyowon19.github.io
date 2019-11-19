// Accordion Logic, checks for active class on load and toggles the class accordingly
var accordion = document.getElementsByClassName("module--top");

for (var i = 0; i < accordion.length; i++) {
  // Checks on page load for any accordion element that has the active class to open
  if (accordion[i].children[1].classList.contains('module--accordion__active')) {
    accordion[i].nextElementSibling.style.maxHeight = accordion[i].nextElementSibling.scrollHeight + 'px';
  }
  // Assign click event handler to each accordion
  accordion[i].addEventListener("click", function() {
    this.children[1].classList.toggle("module--accordion__active");
    var module = this.nextElementSibling;
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
  var skills = document.querySelector('#skills');
  for(var i = skills.children.length; i >= 0; i--) {
    skills.appendChild(skills.children[Math.random() * i | 0]);
  }
}) ();

// console.log('hey');

var modalTest = document.getElementsByClassName('modal--container');

for(var i=0; i < modalTest.length; i++) {
  modalTest[i].addEventListener('click', function() {
    console.log(this);
    // console.log(this.nextElementSibling.nextElementSibling).classList.add('modal--open');
    this.nextElementSibling.nextElementSibling.classList.add('modal--open');
    console.log(this.nextElementSibling.nextElementSibling);
  });
}

var modalClose = document.querySelector('.modal__close');
// console.log(modalClose)

modalClose.addEventListener('click', function() {
  // console.log('i got clicked and i want to close this window');
  // console.log(this);
  this.parentNode.classList.remove('modal--open');
})
