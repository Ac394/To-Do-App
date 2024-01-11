import createList from "./createList";
import { projects } from ".";
// import { Project } from "./taskFunctions";
import Storage from "./storageFunctions";
import List from "./listFunctions";
import { clearList } from "./listFunctions";
import { allList } from "./listFunctions";
import { todoList } from ".";

export function createProject(projectID) {
  const project = projects.find((e) => e.id === projectID);
  createProjectBtn(project);
}

const createProjectBtn = (project) => {
  const ul = document.querySelector(".projects-content");
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.addEventListener("click", () => {
    clearList();
    allList(project, btn);
  });
  const span = document.createElement("span");
  span.classList.add("material-symbols-rounded");
  span.innerHTML = "chevron_right";
  const spanTitle = document.createElement("span");
  spanTitle.classList.add("sidebar-project");
  spanTitle.innerText = project.name;
  btn.append(span);
  btn.append(spanTitle);
  li.appendChild(btn);
  ul.appendChild(li);
};

export function addProject() {
  const addProjectBtn = document.querySelector(".add-project");
  addProjectBtn.addEventListener("click", () => {
    createProjectBtn(todoList.addProject);
    Storage.saveList(todoList);
  });
}
