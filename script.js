const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [
  { id: 1, text: 'Learn HTML', checked: true },
  { id: 2, text: 'Learn CSS', checked: true },
  { id: 3, text: 'Learn JavaScript', checked: false },
];

let nextId = 4;

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log('Lost saved to Local Storage.');
}

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    if (todos.length > 0) {
      nextId = Math.max(...todos.map(todo => todo.id)) + 1;
    } else {
      nextId = 1; 
    }
    console.log('List loaded from Local Storage:', todos);
  } else {
    todos = [
      { id: 1, text: 'Вивчити HTML', checked: true },
      { id: 2, text: 'Вивчити CSS', checked: true },
      { id: 3, text: 'Вивчити JavaScript', checked: false },
    ];
    nextId = 4; 
    console.log('Local Storage empty, loaded default data.');
  }
}


function newTodo() {
  const todoText = prompt('Enter new task: ');

  if (todoText !== null && todoText.trim() !== '') {
    const newTodoItem = {
      id: nextId++,
      text: todoText.trim(),
      checked: false
    };

    todos.push(newTodoItem); // adding new task to array 

    console.log('current todoList: ', todos); //Checking array in console

    // !!! this shi is important 
    saveTodos();
    render();
  } else {
    alert('Task has not been added. Please enter a valid description.');
  }
}

function renderTodo(todo) {
  const textClasses = todo.checked
    ? 'text-success text-decoration-line-through'
    : '';

  const isChecked = todo.checked ? 'checked' : '';

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${isChecked} onchange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${textClasses}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  console.log(`Deleted task with ID: ${id}. Current list:`, todos);

  saveTodos();
  render();
}

function checkTodo(id) {
  const todoToToggle = todos.find(todo => todo.id === id);

  if (todoToToggle) {
    todoToToggle.checked = !todoToToggle.checked;
    console.log(`Змінено статус справи з ID: ${id}. Поточний список:`, todos);
  }
  saveTodos();
  render();
}

function render() {
  list.innerHTML = '';

  // transforming array into html lines 
  const todoHtmlArray = todos.map(todo => renderTodo(todo));

  // joining all lines in big one 
  const fullHtml = todoHtmlArray.join('');

  list.innerHTML = fullHtml;

  updateCounters();
}

function updateCounters() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}



loadTodos();
render();