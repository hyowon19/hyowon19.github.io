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

  // Event listener for mouseover on accordion element
  accordion[i].addEventListener("mouseover", function() {
    var title = this.children[0].children[0];
    var subtitle = this.children[0].children[1];
    title.style.color = 'rgba(225,225,225,0.25)';
    subtitle.style.opacity = '1';
  });

  // Event listener for mouseout on accordion element
  accordion[i].addEventListener("mouseout", function() {
    var title2 = this.children[0].children[0];
    var subtitle2 = this.children[0].children[1];
    title2.style.color = 'rgba(225,225,225,0.85)';
    subtitle2.style.opacity = '0.25';
  });
}

// On page load, shuffle div elements randomly
(function() {
  var skills = document.querySelector('#skills');

  for(var i = skills.children.length; i >= 0; i--) {
    skills.appendChild(skills.children[Math.random() * i | 0]);
  }
}) ();
