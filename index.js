let items = [
	"Waking UP at 09:00",
	"Check Mails , TG ",
	"fix all the work ",
	"drink coffee",
	"dunno maybe some sport",
	"watching movie ",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if(localStorage.getItem("tasks")) {
		items = JSON.parse(localStorage.getItem("tasks"));
	}
	items.forEach((item) => {
		listElement.append(createItem(item));
	});
	return items;
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener("click", () => {
		clone.remove();
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", () => {
		let itemName = textElement.textContent;
		let newItem = createItem(itemName);
		listElement.prepend(newItem);
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", true);
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", false);
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	textElement.textContent = item;
	return clone;
}

function getTasksFromDOM() {
	itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	let tasks = [];
	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	listElement.prepend(createItem(inputElement.value));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
});

items = loadTasks();
