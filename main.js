const form = document.querySelector('#task-form');
const list = document.querySelector('#task-list');
const taskNumber = document.querySelector('#task-number span');
const listItems = document.getElementsByClassName('item');
const imageCheckbox = document.querySelector('#checkbox-list');
const textInput = document.querySelector("#task-form input[type='text']");
const imageInput = document.querySelector("#task-form input[type='file']");

const tasks = [];

const removeItem = (e) => {
    const index = e.target.parentNode.dataset.key;
    tasks.splice(index, 1);
    renderList();
};

const randomBgColor = (element) => {
    const randomLightColor = Math.floor(Math.random() * 256);
    element.style.backgroundColor = `rgb(255,${randomLightColor},176)`;
};

const inputToggle = () => {
    textInput.classList.toggle('hidden');
    imageInput.classList.toggle('hidden');
};

imageCheckbox.addEventListener('click', () => {
    inputToggle();
});

const addItem = (e) => {
    e.preventDefault();

    const newItem = document.createElement('div');
    newItem.className = 'item';

    if (imageCheckbox.checked === true) {
        const imageURL = URL.createObjectURL(imageInput.files[0]);
        newItem.innerHTML = `<img src="${imageURL}" > <span>x</span>`;
        inputToggle();
    } else {
        const textInputVal = textInput.value;
        if (textInputVal === '') return;
        newItem.innerHTML = `${textInputVal} <span>x</span>`;
    }

    randomBgColor(newItem);

    tasks.push(newItem);
    renderList();

    list.appendChild(newItem);
    textInput.value = "";
    imageInput.value = "";
    imageCheckbox.checked = false;

    taskNumber.textContent = listItems.length;
    newItem.querySelector('span').addEventListener('click', removeItem);
};

const renderList = () => {
    list.textContent = "";
    tasks.forEach((task, key) => {
        task.dataset.key = key;
        list.appendChild(task);
    });

    taskNumber.textContent = listItems.length;
};

tasks.forEach((task, key) => {
    task.addEventListener('click', () => {
        removeItem(this)
    })
});

form.addEventListener('submit', addItem);
