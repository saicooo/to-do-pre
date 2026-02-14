const initialTasks = [
	"Waking UP at 09:00",
	"Check Mails , TG ",
	"fix all the work ",
	"drink coffee",
	"dunno maybe some sport",
	"watching movie ",
	"fixing the code ",

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
  
  const itemElement = template.content.querySelector('.to-do__item').cloneNode(true);
  
  const textElement = itemElement.querySelector('.to-do__item-text');
  textElement.textContent = item;
  
  const deleteButton = itemElement.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = itemElement.querySelector('.to-do__item-button_type_duplicate');
  const editButton = itemElement.querySelector('.to-do__item-button_type_edit');
  
  deleteButton.addEventListener('click', () => {
    itemElement.remove();
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
    
    textElement.addEventListener('blur', function onBlur() {
      textElement.setAttribute('contenteditable', 'false');
      const items = getTasksFromDOM();
      saveTasks(items);
      textElement.removeEventListener('blur', onBlur);
    }, { once: true });
  });
  
  return itemElement;
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
