const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const wrapper = $('.wrapper');
let isMove = false;
let start, scrollLeft;
wrapper.addEventListener('mousedown', (e) => {
   isMove = true;
   start = e.pageX - wrapper.offsetLeft;
   scrollLeft = wrapper.scrollLeft;
})
wrapper.addEventListener('mouseleave', () => {
   isMove = false;
})
wrapper.addEventListener('mouseup', () => {
   isMove = false;
})
wrapper.addEventListener('mousemove', (e) => {
   if (isMove) {

      const x = e.pageX - wrapper.offsetLeft;
      // speed scroll
      const walk = (x - start) * 3;
      wrapper.scrollLeft = scrollLeft - walk;
   }
   else {
      return;
   }
})

// btn prev, next

const prev = $('.btn-prev');
const next = $('.btn-next');

prev.addEventListener('click', () => {
   wrapper.scrollLeft -= 330;
   console.log(wrapper.scrollLeft);
})
next.addEventListener('click', () => {
   wrapper.scrollLeft += 330;
   console.log(wrapper.scrollLeft);
})