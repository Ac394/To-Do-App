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

  // get description() {
  //   return this.description;
  // }

  // set description(updateDescription) {
  //   this.description = updateDescription;
  // }

  // get dueDate() {
  //   return this.dueDate;
  // }

  // set dueDate(updateDate) {
  //   this.dueDate = updateDate;
  // }

  // get priority() {
  //   return this.priority;
  // }

  // set priority(updatePriority) {
  //   this.priority = updatePriority;
  // }

  // get check() {
  //   return this.check;
  // }

  // set check(updateCheck) {
  //   this.check = updateCheck;
  // }

  // get project() {
  //   return this.project;
  // }

  // set project(updateProject) {
  //   this.project = updateProject;
  // }
}

// Get tasks from local storage and generate UI
(() => {
  const storedTaskString = localStorage.getItem("tasks");
  const storedTasks = JSON.parse(storedTaskString);
  console.log(`This is parse objects ${storedTasks}`);
  if (storedTaskString !== null) {
    // console.log(`This is the storage ${taskStorage}`);
    // tasks.push(JSON.parse(taskStorage));
    // console.log(`This is the new array ${tasks[0][0].priority}`);
    storedTasks.forEach((task) => {
      // console.log(`My name is ${task.dueDate}`);
      const d = task.description,
        dd = task.dueDate,
        p = task.priority,
        c = task.check,
        pr = task.project;

      newCard(new Task(d, dd, p, c, pr));
    });
  }
})();

// Create the first card by default

// let createFirstCard = new Task();
// newCard(createFirstCard);

// Event listener for Add Task button
const addTask = document.querySelector(".add-task");

addTask.addEventListener("click", () => newCard(new Task()));

const title = document.querySelector(".title");
title.addEventListener("click", () => console.log(tasks));
