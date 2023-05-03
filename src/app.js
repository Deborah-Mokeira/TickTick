let taskList = [];

// Retrieve taskList from local storage if it exists
if (localStorage.getItem('taskList')) {
  taskList = JSON.parse(localStorage.getItem('taskList'));
}

const form = document.getElementById('todo-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const taskNameInput = document.getElementById('task-name');
  const dueTimeInput = document.getElementById('due-time');

  const taskName = taskNameInput.value.trim();
  const dueTime = dueTimeInput.value;

  // Create new task object
  const task = {
    name: taskName,
    dueTime: dueTime
  };

  // Add task to taskList array and clear the form
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
  form.reset();

  // Render the task list
  renderTaskList();
});

function renderTaskList() {
  const taskListElement = document.getElementById('task-list');
  taskListElement.innerHTML = '';

  // Loop through taskList array and create HTML for each task
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];

    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const taskName = document.createElement('h3');
    taskName.textContent = task.name;
    listItem.appendChild(taskName);

    const dueTime = document.createElement('p');
    dueTime.textContent = 'Due Time: ' + task.dueTime;
    listItem.appendChild(dueTime);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.addEventListener('click', function() {
      editTask(i);
    });
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', function() {
      deleteTask(i);
    });
    listItem.appendChild(deleteButton);

    taskListElement.appendChild(listItem);
  }
}

function deleteTask(index) {
  // Remove task from taskList array and update local storage
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));

  // Re-render the task list
  renderTaskList();
}

function editTask(index) {
  // Set form values to current values of task being edited
  const task = taskList[index];
  const taskNameInput = document.getElementById('task-name');
  const dueTimeInput = document.getElementById('due-time');

  taskNameInput.value = task.name;
  dueTimeInput.value = task.dueTime;

  // Remove task from taskList array and update local storage
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));

  // Re-render the task list
  renderTaskList();
}

// Populate dropdown menu with time options
const dueTimeInput = document.getElementById('due-time');
for (let i = 5; i <= 21; i++) {
  const option = document.createElement('option');
  if (i < 12) {
    if (i === 6) {
      option.textContent = i + ':00 AM';
    } else {
      option.textContent = '' + i + ':00 AM';
    }
  } else if (i === 12) {
    option.textContent = i + ':00 PM';
  } else {
    option.textContent = i - 12 + ':00 PM';
  }
  option.value = option.textContent;
  dueTimeInput.appendChild(option);
}

// Render the task list on page load
renderTaskList();