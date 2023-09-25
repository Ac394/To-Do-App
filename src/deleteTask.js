export default function deleteTask(taskToDelete) {
  const taskIndex = tasks.indexOf(taskToDelete);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
}
