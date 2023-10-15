import { projects } from ".";

export class Task {
  constructor(
    description = "",
    dueDate = new Date().toJSON().slice(0, 10),
    priority = "low",
    check = false,
    project = null
  ) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = check;
    this.project = project;
  }
}

export class Project {
  constructor(id = projects.length + 1, name = "New Project", tasks = []) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }
}
