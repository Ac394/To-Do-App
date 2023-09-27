import newCard from "./cardCreate";

export const tasks = [];

class Task {
  constructor(
    description = "",
    dueDate = new Date().toJSON().slice(0, 10),
    priority = "high",
    check = true,
    project = "Lorem Ipsum"
  ) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = check;
    this.project = project;
  }
}

// Get tasks from local storage and generate UI
(() => {
  const storedTaskString = localStorage.getItem("tasks");
  const storedTasks = JSON.parse(storedTaskString);
  console.log(`This is parse objects ${storedTasks}`);
  if (storedTaskString !== null) {
    storedTasks.forEach((task) => {
      const d = task.description,
        dd = task.dueDate,
        p = task.priority,
        c = task.check,
        pr = task.project;

      newCard(new Task(d, dd, p, c, pr));
    });
  }
})();

// Event listener for Add Task button
const addTask = document.querySelector(".add-task");
addTask.addEventListener("click", () => newCard(new Task()));

// Click title to debug
const title = document.querySelector(".title");
title.addEventListener("click", () => console.log(tasks));
