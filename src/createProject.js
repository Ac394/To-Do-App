import createList from "./createList";
import { projects } from ".";
import { Project } from "./defaultClasses";
import updateStorage from "./storageFunctions";
import { clearList } from "./listFunctions";
import { allList } from "./listFunctions";

export function createProject(projectID) {
  const project = projects.find((e) => e.id === projectID);
  createProjectBtn(project);
}

const createProjectBtn = (project) => {
  const ul = document.querySelector(".projects-content");
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.innerText = project.name;
  btn.addEventListener("click", () => {
    clearList();
    allList(project, btn);
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
