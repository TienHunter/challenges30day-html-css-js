const $ = document.querySelector.bind(document);

const stateInput = $('.form-input');
const input = $('form input');
const isShow = $('.form-eyes');

isShow.addEventListener('click', () => {
   stateInput.classList.toggle('show');

   input.type === 'password' ? (input.type = 'text') : (input.type = 'password')
   console.log(input.type);
})

const lowercase = $('.lowercase').classList;
const uppercase = $('.uppercase').classList;
const number = $('.number').classList;
const symbol = $('.symbol').classList;
const characters = $('.characters').classList;

input.oninput = (e) => {
   let password = e.target.value;

   // Validator

   password.search(/[a-z]/) >= 0
      ? lowercase.add('valid')
      : lowercase.remove('valid')

   password.search(/[A-Z]/) >= 0
      ? uppercase.add('valid')
      : uppercase.remove('valid')

   password.search(/[0-9]/) >= 0
      ? number.add('valid')
      : number.remove('valid')

   password.search(/\W/) >= 0
      ? symbol.add('valid')
      : symbol.remove('valid')

   password.length >= 8
      ? characters.add('valid')
      : characters.remove('valid')
}
