const obj = {
    activeTodo: document.querySelector('.active-todo'),
    allImages: document.querySelectorAll('img'),
    allTodo: document.querySelector('.all-todo'),
    boxBorders: document.querySelectorAll('.box-border'),
    clearOption: document.querySelector('.clear-option'),
    completedTodo: document.querySelector('.completed-todo'),
    inputBorder: document.querySelector('.input-border'),
    inputBox: document.querySelector('.input-box'),
    itemsCont: document.querySelector('.items-container'),
    themeIcon: document.querySelector('.theme-icon'),
    todoBoxes: document.querySelectorAll('.todo-box'),
    todoCrosses: document.querySelectorAll('.todo-cross'),
    todoFilter: document.querySelector('.todo-filter'),
    todoItems: document.querySelectorAll('.todo-item'),
    todoParags: document.querySelectorAll('.todo-text p'),
    todoTexts: document.querySelectorAll('.todo-text'),
    todoTicks: document.querySelectorAll('.todo-tick'),
}

for (let img of obj.allImages) {
    img.setAttribute('draggable', 'false');
}

const arrayList = [];
let storedString = localStorage.storedItems;

let userInput;

let bottomMenu = 'all';

localStorage.removeItem('itemsBackup');
if (storedString === '') {
    localStorage.removeItem('storedItems');
}
if (storedString) {
    const storedArray = storedString.split(',');
    storedArray.forEach(function (el) {
        arrayList.push(el);
    });
    console.log(arrayList); // unnecessary
    for (let i = 0; i < arrayList.length; i++) {
        addTodoItem();
        addCrossEvent();
        addBoxEvent();
        obj.todoItems[i].classList.replace(
            obj.todoItems[i].classList[1], `item-${i + 1}`);
    }
}

function storeItems() {
    localStorage.setItem('storedItems', arrayList.toString());
    storedString = localStorage.storedItems;
}

function storeInput() {
    userInput = document.querySelector('#new-todo');
    if (userInput.value === '') { return }
    arrayList.push(userInput.value);
    storeItems();
    console.log(arrayList); // unnecessary
}

function assignText() {
    for (let i = 0; i < obj.todoTexts.length; i++) {
        obj.todoTexts[i].children[0].innerText = arrayList[i];
    }
}

function updateNum() {
    console.log(obj.todoItems);
    const itemsNum = document.querySelector('.items-number');
    const itemsArray = [];
    const convObject = Object.entries(obj.todoItems);
    convObject.forEach(el => itemsArray.push(el[1]));
    const noTickItems = itemsArray.filter(el => {
        return el.classList[3] !== 'tick';
    });
    console.log(noTickItems);
    if (noTickItems.length === 1) {
        itemsNum.innerText = '1 item left';
    } else {
        itemsNum.innerText = `${noTickItems.length} items left`;
    }
}

function addTodoItem() {
    const newItem = document.createElement('div');
    newItem.classList.add('todo-item', `item-${arrayList.length}`);
    obj.itemsCont.appendChild(newItem);
    newItem.innerHTML =
        '<div class="box-border">' +
        '    <div class="todo-box">' +
        '        <img class="todo-tick" src="images/icon-check.svg" ' +
        '             alt="tick" draggable="false">' +
        '    </div>' +
        '</div>' +
        '<div class="todo-text"><p></p></div>' +
        '<img class="todo-cross" src="images/icon-cross.svg" ' +
        '     alt="icon-cross" draggable="false"/>';
    obj.todoItems = document.querySelectorAll('.todo-item');
    obj.boxBorders = document.querySelectorAll('.box-border');
    obj.todoBoxes = document.querySelectorAll('.todo-box');
    obj.todoTexts = document.querySelectorAll('.todo-text');
    for (let i = 0; i < obj.todoItems.length; i++) {
        if (obj.themeIcon.classList[1] === 'switch') {
            obj.inputBorder.classList.add('input-border-dark');
            obj.inputBox.classList.add('input-box-dark');
            obj.todoItems[i].classList.add('todo-item-dark');
            obj.boxBorders[i].classList.add('box-border-dark');
            obj.todoBoxes[i].classList.add('todo-box-dark');
            obj.todoTexts[i].classList.add('todo-text-dark');
        } else {
            obj.inputBorder.classList.add('input-border-light');
            obj.inputBox.classList.add('input-box-light');
            obj.todoItems[i].classList.add('todo-item-light');
            obj.boxBorders[i].classList.add('box-border-light');
            obj.todoBoxes[i].classList.add('todo-box-light');
            obj.todoTexts[i].classList.add('todo-text-light');
        }
    }
    assignText();
    updateNum();
}

function counterReassign() {
    for (let i = 0; i < obj.itemsCont.children.length; i++) {
        obj.itemsCont.children[i].classList.replace(
            obj.itemsCont.children[i].classList[1],
            `item-${i + 1}`);
    }
    console.log(obj.itemsCont.children); // unnecessary
}

function addCrossEvent() {
    obj.todoCrosses = document.querySelectorAll('.todo-cross');
    obj.todoCrosses[obj.todoCrosses.length - 1].addEventListener(
        'click', function deleteItem(e) {
            let classCount = e.target.parentElement.classList[1];
            let numCount = parseInt(classCount.slice(5));
            e.target.parentElement.remove();
            obj.todoItems = document.querySelectorAll('.todo-item');
            arrayList.splice(numCount - 1, 1);
            counterReassign();
            updateNum();
            storeItems();
            console.log(arrayList);  // unnecessary
        });
}

function boxCheck(e) {
    const item = e.currentTarget.parentElement.parentElement;
    item.classList.toggle('tick');
    e.currentTarget.classList.toggle('box-background');
    e.currentTarget.children[0].classList.toggle('todo-tick');
    const text = e.currentTarget.parentElement.nextElementSibling;
    if (obj.themeIcon.classList[1] === 'switch') {
        text.classList.toggle('todo-text-tick-dark');
    } else {
        text.classList.toggle('todo-text-tick-light');
    }
    updateNum();
}

function textCheck(e) {
    const item = e.target.parentElement.parentElement;
    item.classList.toggle('tick');
    const box = e.target.parentElement.previousElementSibling;
    box.children[0].classList.toggle('box-background');
    box.children[0].children[0].classList.toggle('todo-tick');
    const textClassList = e.target.parentElement.classList;
    if (obj.themeIcon.classList[1] === 'switch') {
        textClassList.toggle('todo-text-tick-dark');
    } else {
        textClassList.toggle('todo-text-tick-light');
    }
    updateNum();
}

function addBoxEvent() {
    obj.todoBoxes = document.querySelectorAll('.todo-box');
    obj.todoParags = document.querySelectorAll('.todo-text p');
    const index = obj.todoBoxes.length - 1;
    obj.todoBoxes[index].addEventListener('click', boxCheck);
    obj.todoParags[index].addEventListener('click', textCheck);
}

document.querySelector('#new-todo').addEventListener(
    'keypress', function (keyboardEvent) {
        if (keyboardEvent.key === 'Enter') {
            storeInput();
            if (userInput.value === '') { return }
            addTodoItem();
            addCrossEvent();
            addBoxEvent();
            userInput.value = null;
        }
    });

function changeTheme() {
    const obPage = document.querySelector('.page');
    obPage.classList.toggle('page-dark');
    obPage.classList.toggle('page-light');
    const obAddTodo = document.querySelector('.add-todo');
    obAddTodo.classList.toggle('add-todo-dark');
    obAddTodo.classList.toggle('add-todo-light');
    obj.inputBorder.classList.toggle('input-border-dark');
    obj.inputBorder.classList.toggle('input-border-light');
    obj.inputBox.classList.toggle('input-box-dark');
    obj.inputBox.classList.toggle('input-box-light');
    const obTodoList = document.querySelector('.todo-list');
    obTodoList.classList.toggle('todo-list-dark');
    obTodoList.classList.toggle('todo-list-light');
    for (let obTodoItem of obj.todoItems) {
        if (obTodoItem.classList[2] === 'todo-item-dark') {
            obTodoItem.classList.replace(
                'todo-item-dark', 'todo-item-light');
        } else if (obTodoItem.classList[2] === 'todo-item-light') {
            obTodoItem.classList.replace(
                'todo-item-light', 'todo-item-dark');
        }
    }
    for (let obBoxBorders of obj.boxBorders) {
        obBoxBorders.classList.toggle('box-border-dark');
        obBoxBorders.classList.toggle('box-border-light');
    }
    for (let obTodoBox of obj.todoBoxes) {
        obTodoBox.classList.toggle('todo-box-dark');
        obTodoBox.classList.toggle('todo-box-light');
    }
    for (let obTodoText of obj.todoTexts) {
        obTodoText.classList.toggle('todo-text-dark');
        obTodoText.classList.toggle('todo-text-light');
    }
    const obBottomMenu = document.querySelector('.bottom-menu');
    obBottomMenu.classList.toggle('bottom-menu-dark');
    obBottomMenu.classList.toggle('bottom-menu-light');
    const obFeatureTip = document.querySelector('.feature-tip');
    obFeatureTip.classList.toggle('feature-tip-dark');
    obFeatureTip.classList.toggle('feature-tip-light');
    const dark = document.querySelectorAll('.todo-text-tick-dark');
    const light = document.querySelectorAll('.todo-text-tick-light');
    const obTickTexts = [...dark, ...light];
    for (let obTickText of obTickTexts) {
        obTickText.classList.toggle('todo-text-tick-dark');
        obTickText.classList.toggle('todo-text-tick-light');
    }
}

obj.themeIcon.addEventListener('click', function () {
        if (obj.themeIcon.classList[1] === 'switch') {
            obj.themeIcon.src = 'images/icon-moon.svg';
            obj.themeIcon.alt = 'moon-icon';
        } else {
            obj.themeIcon.src = 'images/icon-sun.svg';
            obj.themeIcon.alt = 'sun-icon';
        }
        obj.themeIcon.classList.toggle('switch');
        changeTheme();
    });

obj.todoFilter.addEventListener('click', function (e) {
    const tickBoxes = document.querySelectorAll('.box-background');
    if (e.target.nodeName === 'SPAN') {
        const itemsArray = [];
        const convObject = Object.entries(obj.todoItems);
        convObject.forEach(el => itemsArray.push(el[1]));
        let noTickItems = itemsArray.filter(el => {
            return el.classList[3] !== 'tick';
        });
        let tickItems = itemsArray.filter(el => {
            return el.classList[3] === 'tick';
        })
        if (e.target.parentElement.classList[0] === 'all-todo') {
            obj.allTodo.classList.add('filter-color');
            obj.activeTodo.classList.remove('filter-color');
            obj.completedTodo.classList.remove('filter-color');
            if (bottomMenu === 'all') {
                return; }
            if (bottomMenu === 'active') {
                for (let tickBox of tickBoxes) {
                    tickBox.parentElement.parentElement.style.display = 'flex';
                }
            }
            if (bottomMenu === 'completed') {
                for (let noTickItem of noTickItems) {
                    noTickItem.style.display = 'flex';
                }
            }
            bottomMenu = 'all';
        }
        if (e.target.parentElement.classList[0] === 'active-todo') {
            obj.allTodo.classList.remove('filter-color');
            obj.activeTodo.classList.add('filter-color');
            obj.completedTodo.classList.remove('filter-color');
            if (bottomMenu === 'active') {
                tickItems = itemsArray.filter(el => {
                    return el.classList[3] === 'tick';
                })
                for(let tickItem of tickItems) {
                    tickItem.style.display = 'none';
                }
            }
            if (bottomMenu === 'all') {
                for (let tickBox of tickBoxes) {
                    tickBox.parentElement.parentElement.style.display = 'none';
                }
            }
            if (bottomMenu === 'completed') {
                for (let noTickItem of noTickItems) {
                    noTickItem.style.display = 'flex';
                }
                for(let tickItem of tickItems) {
                    tickItem.style.display = 'none';
                }
            }
            bottomMenu = 'active';
        }
        if (e.target.parentElement.classList[0] === 'completed-todo') {
            obj.allTodo.classList.remove('filter-color');
            obj.activeTodo.classList.remove('filter-color');
            obj.completedTodo.classList.add('filter-color');
            if (bottomMenu === 'completed') {
                noTickItems = itemsArray.filter(el => {
                    return el.classList[3] !== 'tick';
                });
                for (let noTickItem of noTickItems) {
                    noTickItem.style.display = 'none';
                }
            }
            if (bottomMenu === 'all') {
                for (let noTickItem of noTickItems) {
                    noTickItem.style.display = 'none';
                }
            }
            if (bottomMenu === 'active') {
                for (let noTickItem of noTickItems) {
                    noTickItem.style.display = 'none';
                }
                for (let tickItem of tickItems) {
                    tickItem.style.display = 'flex';
                }
            }
            bottomMenu = 'completed';
        }
    }
})

obj.clearOption.addEventListener('click', function (e) {
    if (e.target.nodeName === 'SPAN') {
        const itemsArray = [];
        const convObject = Object.entries(obj.todoItems);
        convObject.forEach(el => itemsArray.push(el[1]));
        let tickItems = itemsArray.filter(el => {
            return el.classList[3] === 'tick';
        })
        for (let tickItem of tickItems) {
            console.dir(tickItem);
            const numCount = parseInt(tickItem.classList[1].slice(5));
            tickItem.remove();
            arrayList.splice(numCount - 1, 1);
            counterReassign();
            storeItems();
            console.log(arrayList); // unnecessary
        }
    }
})