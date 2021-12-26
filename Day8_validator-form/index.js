const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const repassword = $('#repassword');
const submitBtn = $('.btn');

function showError(input, message) {
   let formControl = input.parentElement;
   formControl.className = 'form-control error';
   const notice = formControl.querySelector('.notice');
   notice.innerText = message;
}

function showSuccess(input) {
   let formControl = input.parentElement;
   formControl.className = 'form-control success';
   const notice = formControl.querySelector('.notice');
   notice.innerText = '';
}

function checkRequired(inputs) {
   let isRequired = true;
   inputs.forEach((input) => {
      if (input.value.trim() === '') {
         // showError()... 
         showError(input, `*${getFileName(input)} is required !`);
         isRequired = false;
      } else {
         // showSuccess()...
         showSuccess(input);
      }
   })
   return isRequired;
}
function checkSimpleRequired(input) {
   if (input.value.trim() === '') {
      // showError()... 
      showError(input, `*${getFileName(input)} is required !`);
   } else {
      // showSuccess()...
      showSuccess(input);
   }
}
username.onblur = () => {
   checkSimpleRequired(username);
   checkLength(username, 6, 33);
}
username.onfocus = () => {
   showSuccess(username);
}
function getFileName(input) {
   return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkLength(input, min, max) {
   if (input.value.length < min) {
      // showError()...
      showError(input, `*${getFileName(input)} min ${min} characters`);
   }
   else if (input.value.length > max) {
      // showError() ...
      showError(input, `*${getFileName(input)} min ${max} characters`);
   }
   else {
      showSuccess(input)
   }
}

function checkEmail(input) {
   const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (re.test(input.value.trim())) {
      showSuccess(input)
   } else {
      showError(input, 'Email is not valid')
   }
}

function checkPasswordMatch(password, repassword) {
   if (password.value !== repassword.value) {
      showError(repassword, `* ${getFileName(repassword)} do not match`);
   } else {
      showSuccess(repassword);
   }
}
function checkValueWhenBlur(inputs) {
   inputs.forEach((input) => {

   })
}
submitBtn.onclick = (e) => {
   e.preventDefault();

   if (checkRequired([username, email, password, repassword])) {
      checkLength(username, 6, 33);
      checkLength(password, 6, 25);
      checkEmail(email);
      console.log(password.value, repassword.value);
      checkPasswordMatch(password, repassword);
   }
}
