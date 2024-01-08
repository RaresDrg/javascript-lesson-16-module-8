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

import { save, load, remove, clear } from './localStorage.js';

const inputEl = document.getElementById('myInput');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('myUL');

let currentId = 0;
const tasksArray = [];

addBtn.addEventListener('click', () => {
  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    alert('Please, fill the field');
    return;
  }

  createLi(inputValue);
  inputEl.value = '';
});

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

  save('tasks', tasksArray);
}

function createCloseBtn(li) {
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '\u00D7';
  closeBtn.classList.add('close');
  li.append(closeBtn);
}

listEl.addEventListener('click', ({ target }) => {
  if (target.nodeName === 'LI') {
    target.classList.toggle('checked');
    updateTaskStatus(target);
    return;
  }

  if (target.nodeName === 'SPAN') {
    target.parentNode.remove();
    currentId -= 1;

    deleteTaskObj(target);
    updateId();
  }
});

function updateTaskStatus(target) {
  const targetId = target.getAttribute('id');
  const indexTaskStatusUpdate = tasksArray.findIndex(
    task => task.ID == targetId
  );

  if (target.classList.contains('checked')) {
    tasksArray[indexTaskStatusUpdate].isDone = true;
  }

  if (!target.classList.contains('checked')) {
    tasksArray[indexTaskStatusUpdate].isDone = false;
  }

  save('tasks', tasksArray);
}

function deleteTaskObj(target) {
  const targetId = target.parentNode.getAttribute('id');
  const indexTaskForDelete = tasksArray.findIndex(task => task.ID == targetId);

  tasksArray.splice(indexTaskForDelete, 1);
}

function updateId() {
  if (currentId > 0) {
    const liArray = listEl.querySelectorAll('li');

    for (let i = 0; i < currentId; i++) {
      liArray[i].setAttribute('id', i);
      tasksArray[i].ID = i;
    }

    save('tasks', tasksArray);
    return;
  }

  if (currentId === 0) {
    remove('tasks');
  }
}

// Reload page //
window.addEventListener('DOMContentLoaded', () => {
  const dataSavedObj = load('tasks');

  if (dataSavedObj) {
    dataSavedObj.forEach(task => {
      createLi(task.text);

      if (task.isDone === true) {
        const liChecked = document.getElementById(task.ID);
        liChecked.classList.add('checked');

        tasksArray[task.ID].isDone = true;
        save('tasks', tasksArray);
      }
    });
  }
});
