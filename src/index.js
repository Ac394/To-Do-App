import newCard from "./cardCreate";
import createList from "./createList";
import { Task } from "./projectFunctions";

export let projects = [
  {
    name: "Home",
    tasks: [],
  },
];

// Get tasks from local storage and generate UI
(() => {
  createList(projects[0]);
  const storedProjectsString = localStorage.getItem("projects");
  const storedProjects = JSON.parse(storedProjectsString);
  console.log(`This is the original ${storedProjectsString}`);
  console.log(`This is parse objects ${storedProjects}`);
  if (storedProjectsString !== null) {
    projects = storedProjects;
    console.log(`This is projects ${projects}`);
    projects[0].tasks.forEach((task) => {
      const d = task.description,
        dd = task.dueDate,
        p = task.priority,
        c = task.check,
        pr = task.project;

      newCard(new Task(d, dd, p, c, pr), projects[0]);
    });
  }
})();

// Event listener for Add Task button
// const addTask = document.querySelector(".add-task");
// addTask.addEventListener("click", () => newCard(new Task()));

// Click title to debug
const title = document.querySelector(".title");
title.addEventListener("click", () => console.log(tasks));

const addProject = document.querySelector(".add-project");
addProject.addEventListener("click", () => {
  const ul = document.querySelector(".projects-content");
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.innerText = "New Project";
  const span = document.createElement("span");
  span.classList.add("material-symbols-rounded");
  span.innerHTML = "chevron_right";
  btn.prepend(span);
  li.appendChild(btn);
  ul.appendChild(li);
});
