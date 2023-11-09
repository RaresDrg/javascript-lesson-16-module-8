/* Example 2 : Todo-list (with local storage)

Write a Todo-list where you can create, delete items and save the list in local storage:
1. we will store tasks in the form of an array of objects
  1.1. object with fields: text, isDone, ID. The ID is required to search for items,
    to delete items, and to update the status of items. 
  The identifier must be both in the element and in the object in the repository.
2. when we add li to the page, we will add it to storage
3. write the logic of the function that will retrieve data from storage and add them to the page
  in the form of extras
4. write the logic for removing the task from the page and for updating the status of the task.
*/

const inpulEl = document.getElementById('myInput');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('myUL');

let currentId = 0;
const tasksArray = [];

// click on addBtn //
addBtn.addEventListener('click', addTask);

function addTask() {
  if (inpulEl.value === '') {
    alert('Please, write a task !');
    return;
  }

  createLi(inpulEl.value);
  inpulEl.value = '';
}

function createLi(text) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  liEl.setAttribute('id', currentId);
  listEl.append(liEl);

  currentId += 1;

  createTaskObj(liEl); // daca nu il put in fata, trimite in task si x-ul de bun (span e considerat textul, li)
  createCloseBtn(liEl);
}

function createTaskObj(li) {
  const task = {};
  task.text = li.textContent;
  task.isDone = false;
  task.ID = li.getAttribute('id');
  tasksArray.push(task);

  sendDataLocal();

  console.log(tasksArray);
}

function sendDataLocal() {
  const dataForSent = JSON.stringify(tasksArray);
  localStorage.setItem('tasks', dataForSent);
}

function removeDataLocal() {
  localStorage.removeItem('tasks');
}

function createCloseBtn(li) {
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '\u00D7';
  closeBtn.classList.add('close');
  li.append(closeBtn);
}

// click on li(body) or X //
listEl.addEventListener('click', handleTask);

function handleTask({ target }) {
  if (target.nodeName === 'LI') {
    target.classList.toggle('checked');
    updateTaskStatus(target);
    return;
  }

  if (target.nodeName === 'SPAN') {
    target.parentNode.remove();
    currentId -= 1;

    const targetId = target.parentNode.getAttribute('id');
    deleteTaskObj(targetId);
    updateId();
  }
}

function updateTaskStatus(target) {
  if (target.classList.contains('checked')) {
    const targetId = target.getAttribute('id');
    const indexTaskStatusUpdate = tasksArray.findIndex(
      task => task.ID == targetId
    );
    tasksArray[indexTaskStatusUpdate].isDone = true;
  }

  if (!target.classList.contains('checked')) {
    const targetId = target.getAttribute('id');
    const indexTaskStatusUpdate = tasksArray.findIndex(
      task => task.ID == targetId
    );
    tasksArray[indexTaskStatusUpdate].isDone = false;
  }

  sendDataLocal();
  console.log(' dupa ce am scjimbat starea task-ul', tasksArray);
}

function deleteTaskObj(targetId) {
  const indexTaskForDelete = tasksArray.findIndex(task => task.ID == targetId);
  tasksArray.splice(indexTaskForDelete, 1);

  console.log(' dupa ce am sters task-ul', tasksArray);
}

function updateId() {
  if (currentId > 0) {
    const liArray = listEl.querySelectorAll('li');
    for (let i = 0; i < currentId; i++) {
      liArray[i].setAttribute('id', i);
      tasksArray[i].ID = i;
    }

    sendDataLocal();
    return;
  }

  if (currentId === 0) {
    removeDataLocal();
  }
}

// Reload page //
window.addEventListener('DOMContentLoaded', fillTaskList);

function fillTaskList() {
  debugger;
  const dataSavedObj = JSON.parse(localStorage.getItem('tasks'));

  dataSavedObj.forEach(task => {
    if (task.isDone === true) {
      createLi(task.text);

      // const taskId = task.ID;

      const liChecked = document.getElementById(task.ID);
      liChecked.classList.add('checked');

      tasksArray[task.ID].isDone = true;

      sendDataLocal();
      return;
    }

    createLi(task.text);
  });
}

// function handleLiStatus() {
//   const li
// }

// function updateTasksArray(targetId) {
//   const indexTaskForDelete = tasksArray.findIndex(task => task.ID === targetId);
//   tasksArray.splice(indexTaskForDelete, 1);

//   console.log(tasksArray);

//   tasksArray.
// }

// function deleteTaskObj(targetId) {
//   debugger;
//   const indexTaskForDelete = tasksArray.findIndex(task => task.ID === targetId);
//   tasksArray.splice(indexTaskForDelete, 1);

//   console.log(' dupa ce am sters task-ul', tasksArray);
// }

// function updateTasksId() {
//   if (currentId === 0) {
//     return;
//   }

//   for (let i = 0; i < currentId; i++) {
//     tasksArray[i].ID = i;
//   }

//   console.log(tasksArray);
// }
