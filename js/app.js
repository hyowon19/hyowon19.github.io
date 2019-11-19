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


// Modal Logic
var modalContainer = document.getElementsByClassName('modal--container');
// Setting click event to each item in this section to show its modal element
for(var i = 0; i < modalContainer.length; i++) {
  modalContainer[i].addEventListener('click', function() {
    this.nextElementSibling.nextElementSibling.classList.add('modal__open');
  });
}

var modalClose = document.getElementsByClassName('modal__close');
// On click event close the modal
for(var i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener('click', function() {
    this.parentNode.classList.remove('modal__open');
  })
}
