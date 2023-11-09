/* Example 1 : Todo-list (without local storage)

Write a Todo-list where you can create, delete items and save the list in local storage:
1. write the logic of adding a task by pressing the add button
  1.1. read the value from the input field
  1.2. we check for an empty term, if it is empty, we inform the user about it and do not add a task
  1.3. if there is a task, then we create a list item to which we add the text of the task
  1.4. add a cross to the list item
  1.5. clear the input field
2. write the logic of the task state (completed or not)
  2.1. by clicking on the excess - toddle class check
3. write the logic for removing a task from the list
  3.1. if we clicked on the cross - we delete the excess from the page
*/

const inputEl = document.getElementById('myInput');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('myUL');

addBtn.addEventListener('click', createTasks);

function createTasks() {
  const inputValue = inputEl.value.trim();

  if (!inputEl.value) {
    alert('Please, fill the field');
    return;
  }

  createLi(inputValue);
  inputEl.value = '';
}

function createLi(text) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  listEl.append(liEl);
  createCloseBtn(liEl);
}

function createCloseBtn(li) {
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '\u00D7';
  closeBtn.classList.add('close');
  li.append(closeBtn);
}

listEl.addEventListener('click', handleTask);

function handleTask({ target }) {
  if (target.nodeName === 'LI') {
    target.classList.toggle('checked');
    return;
  }

  if (target.nodeName === 'SPAN') {
    target.parentNode.remove();
  }
}
