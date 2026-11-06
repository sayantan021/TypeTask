import { addTask, completeTask, filterByStatus, deleteTask } from './model.js';
let tasks = [];
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterAllBtn = document.getElementById('filter-all');
const filterTodoBtn = document.getElementById('filter-todo');
const filterDoneBtn = document.getElementById('filter-done');
function renderTasks(tasksToRender) {
    taskList.innerHTML = '';
    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        if (task.status === 'done')
            li.classList.add('done');
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.title;
        li.appendChild(textSpan);
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        if (task.status !== 'done') {
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'btn-complete';
            completeBtn.onclick = () => {
                tasks = completeTask(tasks, task.id);
                renderTasks(tasks);
            };
            actionsDiv.appendChild(completeBtn);
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks(tasks);
        };
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}
addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
        tasks = addTask(tasks, title);
        taskInput.value = '';
        renderTasks(tasks);
    }
});
filterAllBtn.addEventListener('click', () => renderTasks(tasks));
filterTodoBtn.addEventListener('click', () => renderTasks(filterByStatus(tasks, 'todo')));
filterDoneBtn.addEventListener('click', () => renderTasks(filterByStatus(tasks, 'done')));
renderTasks(tasks);
//# sourceMappingURL=app.js.map