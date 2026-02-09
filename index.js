
// Функция для загрузки задач из localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return []; // Возвращаем пустой массив вместо items
}

// Функция для сохранения задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для получения задач из DOM
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach(element => {
    tasks.push(element.textContent);
  });
  
  return tasks;
}

// Функция для создания элемента задачи
function createItem(item) {
  const template = document.querySelector('#to-do__item-template');
  const clone = template.content.cloneNode(true);
  
  const textElement = clone.querySelector('.to-do__item-text');
  textElement.textContent = item;
  
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');
  
  // Обработчик для кнопки удаления
  deleteButton.addEventListener('click', () => {
    clone.querySelector('.to-do__item').remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  // Обработчик для кнопки копирования
  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  // Обработчик для кнопки редактирования
  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });
  
  // Обработчик для потери фокуса при редактировании
  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  
  // Обработчик для сохранения при нажатии Enter
  textElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textElement.blur();
    }
  });
  
  return clone;
}

// Инициализация приложения
let items = loadTasks(); // Теперь items будет либо из localStorage, либо пустым массивом
const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

// Отображение задач при загрузке страницы
items.forEach(item => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

// Обработчик отправки формы
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const taskText = inputElement.value.trim();
  
  if (taskText) {
    const newItem = createItem(taskText);
    listElement.prepend(newItem);
    
    items = getTasksFromDOM();
    saveTasks(items);
    
    inputElement.value = '';
  }
});
