const container = document.querySelector('.container');
const SQUARES = 200;
const colors = '0123456789abcdef';
for (let i = 0; i < SQUARES; i++) {
   const square = document.createElement('div');
   square.classList.add('square');
   square.addEventListener('mouseover', () => {
      setColor(square);
   })
   square.addEventListener('mouseout', () => {
      removeColor(square);
   })
   container.appendChild(square);
}
function randomColor() {
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += colors[Math.floor(Math.random() * colors.length)];
   }
   return color;
}
function setColor(el) {
   const color = randomColor()
   el.style.backgroundColor = color;
   el.style.boxShadow = `0 0 2px ${color}, 0 0 100px ${color} `
}
function removeColor(el) {
   el.style.backgroundColor = '#1d1d1d';
   el.style.boxShadow = '0 0 2px #000';
}