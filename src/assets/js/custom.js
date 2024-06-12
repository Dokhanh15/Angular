// custom.js

// Function to handle zoom effect on mouseover
function zoomImage(event) {
  var element = event.target;
  element.style.transform = "scale(1.2)";
}

// Function to handle zoom out effect on mouseout
function zoomOutImage(event) {
  var element = event.target;
  element.style.transform = "scale(1)";
}
