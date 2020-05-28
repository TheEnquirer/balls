let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
// c.rotate(Math.PI / 4);
let gravity = 0.1;
let bounce = 0.8;
let wallBounce = 1;
let mouseBounce = 100
let mouseX = 0;
let mouseY = 0;

onmousemove = function(e){
  // console.log("mouse location:", e.clientX, e.clientY);
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function Ball(x,y,dx,dy,radius,color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = () => {
    //console.log("location: ", this.x, this.y);
    if (this.y + this.radius + this.dy > canvas.height){
      console.log("eh?")
       this.dy = -this.dy * bounce;
    } else if ((this.y + this.radius + this.dy + 100 > mouseY) && (Math.abs(this.x - (mouseX - 200)) < this.radius)) {
      alert("yes")
       this.dy = -this.dy * mouseBounce;

    } else{
      this.dy+= gravity;
    }

    if (this.x + this.radius + this.dx >= canvas.width ) {
      this.dx = -this.dx-wallBounce;
    }
    if (this.x - this.radius <= 0 ) {
      this.dx = -this.dx+wallBounce;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color;
    c.fill();
    // c.stroke();
    c.closePath();
  }

  return this;
}


//
// Ball.updateVelocities = (b1, b2) => {
//   console.log(`b1: <${b1.x}, ${b1.y}> b2: <${b2.x}, ${b2.y}>`);
//   let dx = b2.x - b1.x;
//   let dy = b2.y - b1.y;
//
//   b1.dx += b2.dx*dx;
//   b1.dy += b2.dy*dy;
//   b2.dx -= b1.dx*dx;
//   b2.dy -= b1.dy*dy;
// }



let ball;
let ballArray = [];

function init(){
  let radius = 30;
  for (var i = 0; i < 10; i++) {
    let x =  Math.floor(Math.random()*(canvas.width - radius - 1)+ radius);
    let y =  Math.floor(Math.random()*(canvas.height - radius - 1)+ 0)-600;
    let dx = Math.floor(Math.random()*(-2 - 1)+ 2);
    let dy = Math.floor(Math.random()*(-2 - 1)+ 2);
    ballArray.push(Ball(x, y, dx/10, dy/10, radius, '#8404DA'));
  }
  // ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
}

function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update()
    for (let other of ballArray) {
      // Ball.updateVelocities(ballArray[i], other);
    }
  }


}


init();
animate();

//
//
// document.onkeypress = function (e) {
//     e = e || window.event;
//     if (e.keyCode == 113){
//         alert("yes")
//     }
//
// };
