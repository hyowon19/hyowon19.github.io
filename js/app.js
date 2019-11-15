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



  // // checks if window size is larger than 960 to set mouse events
  // if (window.innerWidth > 960) {
  //   // Event listener for mouseover on accordion element
  //   accordion[i].addEventListener("mouseover", function() {
  //     var title = this.children[0].children[0];
  //     var subtitle = this.children[0].children[1];
  //     title.style.color = 'rgba(225,225,225,0.25)';
  //     subtitle.style.opacity = '1';
  //   });
  //
  //   // Event listener for mouseout on accordion element
  //   accordion[i].addEventListener("mouseout", function() {
  //     var title2 = this.children[0].children[0];
  //     var subtitle2 = this.children[0].children[1];
  //     title2.style.color = 'rgba(225,225,225,0.85)';
  //     subtitle2.style.opacity = '0.25';
  //   });
  // } else {
  // // if window is 960 or less, remove all set mouse events
  //   accordion[i].removeEventListener("mouseover", function() {}, false);
  //   accordion[i].removeEventListener("mouseout", function() {}, false);
  // }

  function mouseHandler() {
    var accTitle = document.querySelectorAll('.module--title');
    var accSubTitle = document.querySelectorAll('.module--subtitle');

    // checks if window size is larger than 960 to set mouse events
    if (window.innerWidth > 960) {
      // Event listener for mouseover on accordion element
      // accordion[i].addEventListener("mouseover", function() {
      //   var title = this.children[0].children[0];
      //   var subtitle = this.children[0].children[1];
      //   title.style.color = 'rgba(225,225,225,0.25)';
      //   subtitle.style.opacity = '1';
      // });
      // for(var i = 0; i < accTitle.length; i++) {
      //   accTitle[i].classList.add('module--title__hover');
      //   accSubTitle[i].classList.add('module--subtitle__hover');
      // }

      // for (var j = 0; j < accTitle.length; j++) {
      //   accTitle[j].addEventListener('mouseover', function() {
      //     // console.log(this, 'in here');
      //     this.style.color = 'rgba(225,225,225,0.25)';
      //     // this.style.opacity = '1'
      //   })
      //   accTitle[j].addEventListener('mouseout', function() {
      //     this.style.color = 'rgba(225,225,225,0.85)';
      //   })
      //   accSubTitle[j].addEventListener('mouseover', function() {
      //     this.style.opacity = '1';
      //   })
      //   accSubTitle[j].addEventListener('mouseout', function() {
      //     // this.style.color = 'rgba(225,225,225,0.85)';
      //     this.style.opacity = '0.25';
      //   })
      // }

      // Event listener for mouseout on accordion element
      // accordion[i].addEventListener("mouseout", function() {
      //   var title2 = this.children[0].children[0];
      //   var subtitle2 = this.children[0].children[1];
      //   title2.style.color = 'rgba(225,225,225,0.85)';
      //   subtitle2.style.opacity = '0.25';
      // });


    } else {
    // if window is 960 or less, remove all set mouse events
      // accordion[i].removeEventListener("mouseover", function() {}, false);
      // accordion[i].removeEventListener("mouseout", function() {}, false);

      // for (var k = 0; k < accTitle.length; k++) {
      //   accTitle[k].removeEventListener('mouseover', function() {
      //     // accTitle[j].style.color ='rgba(225,225,225,0.85)'';
      //   }, false)
      //   accSubTitle[k].removeEventListener('mouseout', function() {
      //     // accSubTitle[j].style.opacity = '0.25';
      //   }, false)
      // }
      // for(var j = 0; j < accTitle.length; j++) {
      //   accTitle[j].classList.add('module--title__hover');
      //   accSubTitle[j].classList.add('module--subtitle__hover');
      // }
    }
  }

  mouseHandler();

  // function consoleLog() {
  //   console.log('hay, how are you??');
  // }

  window.addEventListener('resize', () => { mouseHandler(); }, true);
  // window.addEventListener("resize", function(){ mouseHandler(); }, true);
// }

// On page load, shuffle div elements randomly in contact section
(function() {
  var skills = document.querySelector('#skills');
  for(var i = skills.children.length; i >= 0; i--) {
    skills.appendChild(skills.children[Math.random() * i | 0]);
  }
}) ();
