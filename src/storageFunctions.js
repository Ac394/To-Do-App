// import { projects } from ".";
import List from "./listFunctions";
import Project from "./projectFunctions";
import { Task } from "./taskFunctions";
import { todoList } from ".";

export default class Storage {
  static saveList() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  static getList() {
    // const storedList = localStorage.getItem("todoList");
    const storedList = JSON.parse(localStorage.getItem("todoList"));
    const todoList = new List();

    if (storedList) {
      todoList.setProjects(storedList.projects);

      // Reconstruct Project objects
      todoList.setProjects(
        todoList
          .getProjects()
          .map((project) => Object.assign(new Project(), project))
      );

      // Reconstruct Task objects
      todoList
        .getProjects()
        .forEach((project) =>
          project.setTasks(
            project.getTasks().map((task) => Object.assign(new Task(), task))
          )
        );
    } else {
      todoList.addProject(0, "Home");
    }

    return todoList;
  }
}
