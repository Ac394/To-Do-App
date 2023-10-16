import { format, isThisWeek } from "date-fns";
import { projects } from ".";
import createList from "./createList";
import createCard from "./createCard";

export function clearList() {
  const lists = document.querySelectorAll(".list");
  lists.forEach((list) => list.remove());
}

export function allList(project, listTitle) {
  createList(project.id, listTitle);
  project.tasks.forEach((task) => createCard(task, project));
}

export function todayList(project) {
  createList(project.id);
  if (task.date === format(new Date(), "dd MMM yyyy")) {
    createCard(task, project);
  }
}

export function weekList(project) {
  createList(project.id);
  const thisWeek = isThisWeek(task.date);
  if (thisWeek) {
    createCard(task, project);
  }
}
