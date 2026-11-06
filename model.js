export function addTask(tasks, title) {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = { id: newId, title: title, status: "todo" };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map(task => task.id === id ? { ...task, status: "done" } : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}
export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}
//# sourceMappingURL=model.js.map