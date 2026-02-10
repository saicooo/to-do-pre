

const initialTasks = [
	"Waking UP at 09:00",
	"Check Mails , TG ",
	"fix all the work ",
	"drink coffee",
	"dunno maybe some sport",
	"watching movie ",
];

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return initialTasks; 
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach(element => {
    tasks.push(element.textContent);
  });
  
  return tasks;
}

function createItem(item) {
  const template = document.querySelector('#to-do__item-template');
  const clone = template.content.cloneNode(true);
  
  const textElement = clone.querySelector('.to-do__item-text');
  textElement.textContent = item;
  
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');
  
  deleteButton.addEventListener('click', (e) => {
    e.target.closest('.to-do__item').remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });
  
  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  textElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textElement.blur();
    }
  });
  
  return clone;
}



const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

let items = loadTasks();

items.forEach(item => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const taskText = inputElement.value.trim();
  
  if (taskText) {
    const newItem = createItem(taskText);
    listElement.prepend(newItem);
    
    const updatedItems = getTasksFromDOM();
    saveTasks(updatedItems);
    
    inputElement.value = '';
  }
});
