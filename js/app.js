// Accordion Logic, checks for active class on load and toggles the class accordingly
var accordion = document.getElementsByClassName("module--accordion");

for (var i = 0; i < accordion.length; i++) {
  // Checks on page load for any accordion element that has the active class to open
  if (accordion[i].classList.contains('module--accordion__active')) {
    accordion[i].parentNode.nextElementSibling.style.maxHeight = accordion[i].parentNode.nextElementSibling.scrollHeight + 'px';
  }
  // Assign click event handler to each accordion
  accordion[i].addEventListener("click", function() {
    this.classList.toggle("module--accordion__active");
    var module = this.parentNode.nextElementSibling;
    // Checks on click if element is at maxHeight or not. If true, accordion will close.  If false, accordion will open.
    if (module.style.maxHeight) {
      module.style.maxHeight = null;
    } else {
      module.style.maxHeight = module.scrollHeight + 'px';
    }
  });
}
