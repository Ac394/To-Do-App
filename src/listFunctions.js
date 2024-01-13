import Project from "./projectFunctions";

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
