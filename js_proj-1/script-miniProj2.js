let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
// c.rotate(Math.PI / 2); //Toggle canvas direction
//Sliders:
let gravity = 0.6;
let bounce = 0.8;
let friction = 0.99 //Triggers while on ground
let wallBounce = 0.85;
let mouseBounce = 1.1;
let mouseX = 0;
let mouseY = 0;
//Ask user ball count
let ballCount = window.prompt("Number of Balls: ");
//Define mouse location
onmousemove = function(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
}
//Ball "class"
function Ball(x,y,dx,dy,radius,color) {
  let self = {
    x: x,
    y: y,
    dx: dx,
    dy: dy,
    radius: radius,
    color: color
  }
  self.update = () => {
    //Bounce the ball when it touches the ground, and apply friction
    if (self.y + self.radius + self.dy > canvas.height){
       self.dy = -self.dy * bounce;
       self.dx = self.dx * friction;

  // Calculate ball and mouse location
  } else if ((self.y + self.radius + self.dy + 100 > mouseY) && (Math.abs(self.x - (mouseX - 300)) < self.radius)) {
      //Bounce the ball up when it touches the mouse
       self.dy = -self.dy * mouseBounce;
       //Calculate directional mouse collisions
       if ((self.x > (mouseX-300)) && (self.dx < 0)){
        self.dx = -self.dx;
      }
      if ((self.x < (mouseX-300)) && (self.dx > 0)){
       self.dx = -self.dx;
     }
    } else{
      //Apply gravity
      self.dy+= gravity;
    }
    //Track wall collisions
    if (self.x + self.radius + self.dx >= canvas.width ) {
      self.dx = -self.dx-wallBounce;
    }
    if (self.x - self.radius <= 0 ) {
      self.dx = -self.dx+wallBounce;
    }
    //Update speeds
    self.x += self.dx;
    self.y += self.dy;
    self.draw();
  }
  self.draw = () => {
    //Draw cirlce
    c.beginPath();
    c.arc(self.x, self.y, self.radius, 0, Math.PI * 2, false)
    c.fillStyle = self.color;
    c.fill();
    // c.stroke();//Toggle stroke
    c.closePath();
    // velocity vector
    c.strokeStyle = "#A1A1A1";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(self.x, self.y);
    if (lines == true){
      c.lineTo(self.x - self.dx*10, self.y - self.dy*10);
    }
    if (lines_front == true){
      c.lineTo(self.x + self.dx*10, self.y + self.dy*10);
    }
    c.stroke();
  }
  //Shockwave command on click: send balls away from click
  self.shockwave = () => {
    if (self.x + self.radius + self.dx > (mouseX - 200)){
      self.dx += 6;
    } else {
      self.dx -= 6;
    }
    if (self.y + self.radius + self.dy > (mouseY - 200)){
      self.dy += 10;
    } else {
      self.dy -= 10;
    }
  }
  document.addEventListener("click", self.shockwave);
  return self;
}
//Antigravity command
let antigravity = false;
function antigrav() {
  if (antigrav == false){
    antigrav = true;
    gravity = -5;
  }else {
    antigravity = false;
    gravity = 0.6;
  }
}
let lines = false;
let lines_front = false;
//Track keys pressed
document.onkeypress = function (e) {
    e = e || window.event;
    // alert(e.keyCode);
    if (e.keyCode == 103){
        gravity = -gravity
    }
    if (e.keyCode == 108){
      if (lines == false){
        lines = true;
      }else{
        lines = false
      }}
    if (e.keyCode == 107){
      if (lines_front == false){
        lines_front = true;
      }else{
        lines_front = false
      }
    if (e.keycode == 117){
      Ball.sendUp()
    }
  }
}

//Failed ball collision code...
//Four hours down the drain...
Ball.updateVelocities = (b1, b2) => {
  let dx = b2.x - b1.x;
  let dy = b2.y - b1.y;
  let hyp = Math.sqrt(dx*dx + dy*dy);

  console.log(`b1: (${b1.x}, ${b1.y} delta ${b1.dx}, ${b1.dy})           b2: (${b2.x}, ${b2.y} delta ${b2.dx}, ${b2.dy})      deltas: ${dx}, ${dy}`);

  if (hyp > b1.radius + b2.radius) return;

  let d1 = (b2.dx * dx + b2.dy * dy); // amount of change (dot product of b2 velocity on <dx, dy>)
  let d2 = (b1.dx * dx + b1.dy * dy);

  //  * Math.sqrt(b1.dx * b1.dx + b2.dy * b2.dy)
  //  * Math.sqrt(b2.dx * b2.dx + b2.dy * b2.dy)

  let bx1 = b1.dx;
  let by1 = b1.dy;
  b1.dx -= b2.dx * d1/hyp;
  b1.dy -= b2.dy * d1/hyp;
  b2.dx += bx1 * d2/hyp;
  b2.dy += by1 * d2/hyp;

  console.log(`new velocities: b1: (${b1.dx}, ${b1.dy})           b2: (${b2.dx}, ${b2.dy})`);

}
//Ball collision code was made with help from Albert
let ball;
let ballArray = [];

//Generate balls
function ballGen(){
  let radius = 30;
  //If balls are negative, reduce radius and flip to positive
  if (ballCount < 0){
    ballCount = -ballCount;
    radius = 1;
  }
    //Randomize spawning location and speed
    for (var i = 0; i < ballCount; i++) {
      let x =  Math.floor(Math.random()*(canvas.width - radius - 1)+ radius);
      let y =  Math.floor(Math.random()*(canvas.height - radius - 1)+ 0)-600;
      let dx = Math.floor(Math.random()*(-2 - 1)+ 2);
      let dy = Math.floor(Math.random()*(-2 - 1)+ 2);
      ballArray.push(Ball(x, y, dx/10, dy/10, radius, '#8404DA'));
      // console.log(ballArray[ballArray.length-1])
    }
}
//Drawing loop
function makeBalls() {
  requestAnimationFrame(makeBalls)
  //Clear the screen
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update()
    ////For running broken code
    // for (let j = i+1; j < ballArray.length; j++) {
    //   Ball.updateVelocities(ballArray[i], ballArray[j]);
    // }
  }
}
ballGen();
makeBalls();
// Some help taken from https://www.youtube.com/watch?v=H1eEiI1S6LA
