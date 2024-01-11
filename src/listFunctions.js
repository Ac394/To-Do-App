import Project from "./projectFunctions";
import { format, isThisWeek } from "date-fns";
import createList from "./createList";
import createCard from "./createCard";
import { todoList } from ".";

export default class List {
  constructor() {
    this.projects = [];
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  addProject(id = this.projects.length, name = "New Project", tasks = []) {
    const newProject = new Project(id, name, tasks);
    this.projects.push(newProject);
    return newProject;
  }

  getProject(projectID) {
    return this.projects.find((project) => project.id === projectID);
  }

  deleteProject(projectToDelete) {
    this.projects = this.projects.filter(
      (project) => project !== projectToDelete
    );
  }

  updateProjectsID() {
    this.projects.forEach((project, index) => {
      project.setID(index);
      console.log(index);
    });
  }
}

export function clearList() {
  const lists = document.querySelectorAll(".list");
  lists.forEach((list) => list.remove());
}

// export function allList(project, listTitle) {
//   createList(project.id, listTitle);
//   project.tasks.forEach((task) => createCard(task, project));
// }

export function todayList(project) {
  createList(project.id);
  project.tasks.forEach((task) => {
    if (task.dueDate === format(new Date(), "yyyy-MM-dd")) {
      createCard(task, project);
    }
  });
}

export function weekList(project) {
  createList(project.id);
  project.tasks.forEach((task) => {
    if (isThisWeek(new Date(task.dueDate))) {
      createCard(task, project);
    }
  });
}
