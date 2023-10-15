import { Task } from "./defaultClasses";
import { projects } from ".";
import createCard from "./createCard";

export default function createList(projectID) {
  const project = projects.find((e) => e.id === projectID);
  const board = document.querySelector(".board");

  const newEl = (e) => {
    return document.createElement(`${e}`);
  };

  const list = newEl("div");
  list.classList.add("list");

  const projectHeader = newEl("div");
  projectHeader.classList.add("project-header");

  const title = newEl("h2");
  title.classList.add("title");
  title.contentEditable = "false";
  title.innerHTML = project.name;
  title.addEventListener("change", () => {});
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      title.blur();
    }
  });
  title.addEventListener("blur", () => (title.contentEditable = "false"));

  const editBtn = newEl("button");
  editBtn.classList.add("edit-title");
  editBtn.addEventListener("click", () => {
    title.contentEditable = "true";
    title.focus();
  });

  const editIcon = newEl("span");
  editIcon.classList.add("material-symbols-outlined");
  editIcon.innerHTML = "edit_square ";

  const cards = newEl("div");
  cards.classList.add("cards");

  const cardsContainer = newEl("div");
  cardsContainer.classList.add("cards-container");

  const addBtn = newEl("button");
  addBtn.classList.add("add-task");
  addBtn.addEventListener("click", () => createCard(new Task(), project, true));

  const addIcon = newEl("span");
  addIcon.classList.add("material-symbols-outlined");
  addIcon.innerHTML = "add";

  const addText = newEl("span");
  addText.innerHTML = "Add task";

  editBtn.appendChild(editIcon);
  projectHeader.append(title, editBtn);
  addBtn.append(addIcon, addText);
  cards.append(cardsContainer, addBtn);
  list.append(projectHeader, cards);
  board.appendChild(list);

  console.log(`THE LENGHT ${project.tasks.length}`);

  // if (project.tasks.length !== 0) {
  //   project.tasks.forEach((task) => {
  //     createCard(
  //       new Task(
  //         task.description,
  //         task.dueDate,
  //         task.priority,
  //         task.check,
  //         task.project
  //       ),
  //       project
  //     );
  //   });
  // }
  if (project.tasks.length !== 0) {
    project.tasks.forEach((task) => {
      createCard(task, project);
    });
  }
}
