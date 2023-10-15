import createList from "./createList";
import { projects } from ".";
import { Project } from "./defaultClasses";

export function createProject(projectID) {
  const project = projects.find((e) => e.id === projectID);
  createProjectBtn(project);
}

function updateStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(`This is the array from update ${projects}`);
}

const createProjectBtn = (project) => {
  const ul = document.querySelector(".projects-content");
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.innerText = project.name;
  btn.addEventListener("click", () => {
    clearList();
    createList(project.id);
  });
  const span = document.createElement("span");
  span.classList.add("material-symbols-rounded");
  span.innerHTML = "chevron_right";
  btn.prepend(span);
  li.appendChild(btn);
  ul.appendChild(li);
};

export function addProject() {
  const addProjectBtn = document.querySelector(".add-project");
  addProjectBtn.addEventListener("click", () => {
    const newProject = new Project();
    createProjectBtn(newProject);
    projects.push(newProject);
    updateStorage();
  });
}

function clearList() {
  const list = document.querySelector(".list");
  list.remove();
}
