var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let rectArray = []

function Rectangle(width, height, x, y, color){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.stroke();
  };

};

rectArray.push(new Rectangle(100,100,100,100, 'black'));
rectArray.push(new Rectangle(200,200,200,200, 'red'));
for (let i = 0; i < rectArray.length; i ++){
  rectArray[i].draw(ctx);
}

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode == 113){
        alert("yes")
    }

};
