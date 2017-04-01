var main = document.querySelector('#main'),
  addCircleBtn = document.querySelector('#add-circle'),
  container = main.querySelector('.container'),
  circles = container.querySelectorAll('.circle'),
  mainConfig = {
    autoRotate: true,
    autoAddCircle: true,
    interval: null,
    turn: 'circle'
  }

 function setPosition() {
  circles = main.querySelectorAll('.circle');

  var circleSize = circles[0].getBoundingClientRect().width;

  for (var i = 0; i < circles.length; i++) {

    transformX = window.height()/2
    transformY = window.width()/2
    
    circles[i].style.transform = "translate3d(" + transformX + ", " + transformY + ", 0)";
    circles[i].style.opacity = 1;
  };
}
function registerWindow(){
	window.open ("register.html");
	return false;
}

function login(){
	document.getElementById("botton").innerHTML = "Hello World";
}
