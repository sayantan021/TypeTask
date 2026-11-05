
import { type Task, type TaskStatus, addTask, completeTask, filterByStatus, deleteTask } from './model.js';
// State array to hold our tasks
let tasks: Task[] = [];

// Strictly typed DOM element access
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;

const filterAllBtn = document.getElementById('filter-all') as HTMLButtonElement;
const filterTodoBtn = document.getElementById('filter-todo') as HTMLButtonElement;
const filterDoneBtn = document.getElementById('filter-done') as HTMLButtonElement;

// Render function to update the UI
function renderTasks(tasksToRender: Task[]) {
    taskList.innerHTML = ''; 

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} [${task.status}]`;
        if (task.status === 'done') li.classList.add('done');

        // Add a complete/advance button for tasks not yet done
        if (task.status !== 'done') {
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.onclick = () => {
                tasks = completeTask(tasks, task.id);
                renderTasks(tasks);
            };
            li.appendChild(completeBtn);
        }

        // Include the custom deleteTask operation from Part 1
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks(tasks);
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Event Listeners for Actions
addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
        tasks = addTask(tasks, title);
        taskInput.value = '';
        renderTasks(tasks);
    }
});

// Event Listeners for Filters
filterAllBtn.addEventListener('click', () => renderTasks(tasks));
filterTodoBtn.addEventListener('click', () => renderTasks(filterByStatus(tasks, 'todo')));
filterDoneBtn.addEventListener('click', () => renderTasks(filterByStatus(tasks, 'done')));

// Initial render
renderTasks(tasks);