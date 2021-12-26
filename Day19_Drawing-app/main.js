const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = 400;
let context = canvas.getContext("2d"); //method returns a drawing context on the canvas, or null
let start_backgroundColor = 'white';
context.fillStyle = start_backgroundColor;  // property of the Canvas 2D API specifies the color, gradient, or pattern
context.fillRect(0, 0, canvas.width, canvas.height); // void ctx.fillRect(x, y, width, height)
let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let restore_array = [];
let index = -1;
function change_color(element) {
   draw_color = element.style.backgroundColor;
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', end, false);
canvas.addEventListener('mouseup', end, false);
canvas.addEventListener('mouseout', end, false);


function start(event) {
   is_drawing = true;
   context.beginPath(); //method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
   context.moveTo(event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop); //The moveTo() method moves the path to the specified point in the canvas, without creating a line.
   event.preventDefault();

}
function draw(event) {
   if (is_drawing) {
      context.lineTo(event.clientX - canvas.offsetLeft,
         event.clientY - canvas.offsetTop); // The lineTo() method adds a new point and creates a line TO that point FROM the last specified point in the canvas (this method does not draw the line).
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke(); // The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods. The default color is black.
   }
   event.preventDefault();
}

function end(event) {
   if (is_drawing) {
      context.stroke();
      context.closePath();// The closePath() method creates a path from the current point back to the starting point.
      is_drawing = false;
   }
   event.preventDefault();
   if (event.type != 'mouseout') {
      //The getImageData() method returns an ImageData object that copies the pixel data for the specified rectangle on a canvas.
      restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
      index++;
   }
}
function clear_canvas() {
   context.fillStyle = start_backgroundColor;
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.fillRect(0, 0, canvas.width, canvas.height);
   restore_array = [];
   index = -1;
}

function undo_canvas() {
   if (index <= 0) {
      clear_canvas();
   } else {
      index--;
      restore_array.pop();
      // The putImageData() method puts the image data (from a specified ImageData object) back onto the canvas
      context.putImageData(restore_array[index], 0, 0);
   }
}