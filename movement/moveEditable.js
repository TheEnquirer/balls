let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height/2;
let mU, mD, mL, mR = false;

// Variables:
let moveSpeed = 10;
let radius = 30;
let color = "#07B1CB";

document.onkeypress = function (e) {
    e = e || window.event;
    // alert(e.keyCode);
    if (e.keyCode == 32){
      moveSpeed = 5;
    }
    if (e.keyCode == 119){
      mU = true;
    }
    if (e.keyCode == 97){
      mL = true;
    }
    if (e.keyCode == 115){
      mD = true;
    }
    if (e.keyCode == 100){
      mR = true;
    }

}
document.onkeyup = function (e) {
    e = e || window.event;
    // alert(e.keyCode);
    if (e.keyCode == 32){
      moveSpeed = 10;
    }
    if (e.keyCode == 87){
      mU = false;
    }
    if (e.keyCode == 65){
      mL = false;
    }
    if (e.keyCode == 83){
      mD = false;
    }
    if (e.keyCode == 68){
      mR = false;
    }

}
function makeBalls() {

  requestAnimationFrame(makeBalls)
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  if (mU == true){
    y -=moveSpeed;
  }
  if (mD == true){
    y +=moveSpeed;
  }
  if (mL == true){
    x -=moveSpeed;
  }
  if (mR == true){
    x +=moveSpeed;
  }
  if (x == canvas.width + radius + 10){
    x = 0 - (radius) ;
    // console.log("right");
  }
  if (x == 0 - (radius + 20)){
    x = canvas.width + (radius+10) ;
    // console.log("left");
  }
  if (y == canvas.height + radius + 10){
    y = 0 - (radius) ;
    // console.log("top");
  }
  if (y == 0 - (radius + 20)){
    y = canvas.height + (radius+10) ;
    // console.log("bottom");
  }

  c.arc(x, y, radius, 0, Math.PI * 2)
  c.fillStyle = color;
  c.fill();
  // c.stroke();//Toggle stroke
  c.closePath();

}
makeBalls();
