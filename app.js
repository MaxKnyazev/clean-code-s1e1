const taskInput = document.querySelector('#new-task');
const addButton = document.querySelector('.add__btn');
const incompleteTaskHolder = document.querySelector('#incomplete-tasks');
const completedTasksHolder = document.querySelector('#completed-tasks');

const createNewTaskElement = taskString => {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task-item';
  label.innerText = taskString;
  label.className = 'task-item__label';
  checkBox.type = 'checkbox';
  checkBox.className = 'input-checkbox';
  editInput.type = 'text';
  editInput.className = 'task-item__text input-text';
  editButton.innerText = 'Edit';
  editButton.className = 'task-item__btn edit';
  deleteButton.className = 'task-item__btn delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Remove';
  deleteButtonImg.className = 'img-remove';

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = () => { 
  console.log('Add Task...');
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

function editTask () {
  console.log('Edit Task...');

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.input-text');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('edit-mode');
};

function deleteTask () {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted () {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete () {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener('click', addTask);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('.input-checkbox');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
