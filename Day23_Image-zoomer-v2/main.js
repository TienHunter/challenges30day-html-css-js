const $ = document.querySelector.bind(document);
const wrapper = $('.wrapper');
const image = $('.image');
const lens = $('.lens');
const Zoomer = 3;
lens.style.backgroundImage = `url(${image.src})`;
const wrapperRect = wrapper.getBoundingClientRect();
const imageRect = image.getBoundingClientRect();
const lensRect = lens.getBoundingClientRect();

wrapper.addEventListener('mousemove', zoomImage);

function zoomImage(e) {
   const { x, y } = getMousePos(e);
   lens.style.top = y + 'px';
   lens.style.left = x + 'px';
   lens.style.backgroundSize = `${imageRect.width * Zoomer}px ${imageRect.height * Zoomer}px`;
   lens.style.backgroundPosition = `-${(x + lensRect.width / 2) * Zoomer}px -${(y + lensRect.height / 2) * Zoomer}px`;
}
function getMousePos(e) {
   let x = e.clientX - wrapperRect.left - lensRect.width / 2;
   let y = e.clientY - wrapperRect.top - lensRect.height / 2;
   let minX = 0;
   let minY = 0;
   let maxX = wrapperRect.width - lensRect.width;
   let maxY = wrapperRect.height - lensRect.height;

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
