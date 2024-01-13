import { format, isThisWeek } from "date-fns";

export default class Project {
  constructor(id, name, tasks) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(task) {
    return this.tasks.find((task) => task === task);
  }

  getTodayTasks() {
    return this.tasks.filter(
      (task) => task.getDate() === format(new Date(), "yyyy-MM-dd")
    );
  }

  getWeekTasks() {
    return this.tasks.filter((task) => isThisWeek(new Date(task.getDate())));
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(taskToDelete) {
    this.tasks = this.tasks.filter((task) => task !== taskToDelete);
  }
}
