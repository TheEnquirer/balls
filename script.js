// alert("yeets")

var canvas = document.getElementById('myCanvas');
// let lineX1 = 75;
// let lineY1 = 50;
let ctx = canvas.getContext('2d');

// var circleNum = prompt("Gimme a number")
// alert(circleNum)
//
// function repeatOften() {
//   //ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.beginPath();
//   ctx.moveTo(lineX1, lineY1);
//   ctx.lineTo(50, 75);
//   ctx.stroke();
//   ctx.fill();
//   lineX1 += 10;
//   lineY1 += 10;
//   requestAnimationFrame(repeatOften);
// }
// y=-10;
// for(i=0;i<100; i++){
//
//   y+=10;
//   for(x=0;x<610;x+=10){
//     ctx.beginPath();
//     ctx.arc(x, y, 5, 0, 2*Math.PI);
//     ctx.stroke();
//
//   }
// }

// var x = event.clientX;     // Get the horizontal coordinate
// var y = event.clientY;     // Get the vertical coordinate
// var coor = "X coords: " + x + ", Y coords: " + y;
// alert("yup")

//
// function drawCircle(){
//   alert("done")
// };
//
// var c = document.getElementById("myCanvas")
// c.addEventListener("Click", function(o){
//   drawCircle(o.clientX = 7, o.clientY = 7)
// });

// document.getElementById("myCanvas").addEventListener("click", function(o){
//   // alert("yeet")
//   // drawCircle(o.clientX = 7, o.clientY = 7)
//   ctx.beginPath();
//   ctx.arc(o.clientX, o.clientY, 5, 0, 2*Math.PI);
//   ctx.stroke();
// });
//
// circleX = [1, 240,300, 550, 125];
// circleX.forEach(drawCircle);
//
// function drawCircle(value){
//   ctx.beginPath();
//   ctx.arc(value, 75, 5, 0, 2*Math.PI);
//   ctx.stroke();
//
// }

// requestAnimationFrame(repeatOften);

// repeatOften();




let sqaure1 = {
  x: 20,
  y: 20,
  height: 150,
  width: 150,
  color: "#6600ff",
  draw: function (){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.stroke();
  }
}

sqaure1.draw()
