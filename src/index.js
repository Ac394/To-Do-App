import createList from "./createList";
import { createProject, addProject } from "./createProject";

export let projects = [
  {
    id: 1,
    name: "Home",
    tasks: [],
  },
];

// Get tasks from local storage and generate UI
(() => {
  const storedProjectsString = localStorage.getItem("projects");
  const storedProjects = JSON.parse(storedProjectsString);
  // console.log(`This is the original ${storedProjectsString}`);
  // console.log(`This is parse objects ${storedProjects}`);
  if (storedProjectsString !== null) {
    projects = storedProjects;
    // console.log(`This is projects ${projects}`);
    // projects[0].tasks.forEach((task) => {
    //   createCard(
    //     new Task(
    //       task.description,
    //       task.dueDate,
    //       task.priority,
    //       task.check,
    //       task.project
    //     ),
    //     projects[0]
    //   );
    // });
  }
  createList(1);
  addProject();
  projects.forEach((project) => {
    if (project.id !== 1) {
      createProject(project.id);
    }
  });
})();

// Event listener for Add Task button
// const addTask = document.querySelector(".add-task");
// addTask.addEventListener("click", () => newCard(new Task()));

// Click title to debug
// const title = document.querySelector(".title");
// title.addEventListener("click", () => console.log(tasks));
