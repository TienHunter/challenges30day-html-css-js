const $ = document.querySelector.bind(document);
const container = $('.container');
const image = $('.image');
const lens = $('.lens');
const result = $('.result');
result.style.backgroundImage = `url(${image.src})`;
const containerRect = container.getBoundingClientRect();
const imageRect = image.getBoundingClientRect();
const lensRect = lens.getBoundingClientRect();
const resultRect = result.getBoundingClientRect();

container.addEventListener('mousemove', zoomImage);

function zoomImage(e) {
   const { x, y } = getMousePos(e);
   lens.style.top = y + 'px';
   lens.style.left = x + 'px';
   let fx = resultRect.width / lensRect.width;
   let fy = resultRect.height / lensRect.height;
   result.style.backgroundSize = `${imageRect.width * fx}px ${imageRect.height * fy}px`;
   result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`
   console.log('sss');
}
function getMousePos(e) {
   let x = e.clientX - containerRect.left - lensRect.width / 2;
   let y = e.clientY - containerRect.top - lensRect.height / 2;
   let minX = 0;
   let minY = 0;
   let maxX = containerRect.width - lensRect.width;
   let maxY = containerRect.height - lensRect.height;

   if (x <= minX) {
      x = minX;
   } else if (x >= maxX) {
      x = maxX;
   }
   if (y <= minY) {
      y = minY;
   } else if (y >= maxY) {
      y = maxY;
   }
   return { x, y };
}
