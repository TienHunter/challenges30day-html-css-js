const $ = document.querySelector.bind(document);
const inputBox = $('.inputFiled input');
const addBtn = $('.inputFiled button');

const todoList = $('.todoList');
const totalTasks = $('.totalTasks');
const removeAllTaks = $('.removeAllTaks');
// storeage
let storage = {
   get() {
      return JSON.parse(localStorage.getItem('todoList')) || [] // get data from localStorage
   },
   set(tasks) {
      localStorage.setItem('todoList', JSON.stringify(tasks)) // set data to localStorage
   }
}
let listTasks = storage.get();
showTasks();
inputBox.onkeyup = () => {
   let userData = inputBox.value // get data from input user
   if (userData.trim() !== '') {
      addBtn.classList.add('active');
   } else {
      addBtn.classList.remove('active');

   }
}
//  when user click addBtn
addBtn.onclick = () => {
   let userData = inputBox.value // get data from input user
   inputBox.value = '';
   inputBox.focus();
   addBtn.classList.remove('active');
   listTasks.push(userData);
   storage.set(listTasks);
   showTasks();
}
// when press enter in input box
function addTask(e) {
   if (e.keyCode === 13) {
      let userData = inputBox.value // get data from input user
      if (userData.trim() !== '') {
         inputBox.value = '';
         inputBox.focus();
         addBtn.classList.remove('active');
         listTasks.push(userData);
         storage.set(listTasks);
         showTasks();
      }
   }
}
inputBox.addEventListener('keypress', addTask);
// show tasks
function showTasks() {
   let newTasks = '';
   listTasks.forEach((element, index) => {
      newTasks += `<li class="todoItem">
                     <p>${element}</p>
                     <span onclick='deleteTask(${index})'><i class='bx bxs-trash'></i> </span>
                  </li>`
   })
   todoList.innerHTML = newTasks; // add new li tag inside ul tag
   totalTasks.innerText = `You have ${listTasks.length} pending task${listTasks.length > 1 ? 's' : ''}`
   if (listTasks.length > 0) {
      removeAllTaks.classList.add('active');
   } else {
      removeAllTaks.classList.remove('active');
   }
}
// remove one task when click it
function deleteTask(index) {
   listTasks.splice(index, 1);
   storage.set(listTasks);
   showTasks();
}
// remove all tasks
removeAllTaks.onclick = () => {
   listTasks = [];
   storage.set(listTasks);
   showTasks();
}