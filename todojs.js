document.addEventListener('DOMContentLoaded', function() {
    // Load tasks from local storage
    loadTasksFromLocalStorage();

    document.getElementById('addTaskButton').addEventListener('click', function() {
        addTask();
    });

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskList = document.getElementById('taskList');
            const listItem = createTaskElement(taskText);
            taskList.appendChild(listItem);

            saveTasksToLocalStorage();
            taskInput.value = ''; // Clear the input field
        }
    }

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            saveTasksToLocalStorage();
        });

        // Create a span for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create the edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '✏️';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task:', taskSpan.textContent);
            if (newTaskText !== null) {
                taskSpan.textContent = newTaskText.trim();
                saveTasksToLocalStorage();
            }
        });

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        });

        // Append elements to list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(function(listItem) {
            const taskText = listItem.querySelector('span').textContent;
            const isCompleted = listItem.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const listItem = createTaskElement(task.text);
            if (task.completed) {
                listItem.querySelector('input[type="checkbox"]').checked = true;
                listItem.classList.add('completed');
            }
            document.getElementById('taskList').appendChild(listItem);
        });
    }
});