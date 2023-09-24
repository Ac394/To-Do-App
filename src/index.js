import { compareAsc, format } from "date-fns";
import "./style.css";
import textareaWrap from "/src/textarea.js";
import newCard from "/src/create_card.js";

const tasks = [];

class Task {
  constructor(description, dueDate, priority, check, project) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = check;
    this.project = project;
  }

  // get description() {
  //   return this.description;
  // }

  // set description(updateDescription) {
  //   this.description = updateDescription;
  // }

  // get dueDate() {
  //   return this.dueDate;
  // }

  // set dueDate(updateDate) {
  //   this.dueDate = updateDate;
  // }

  // get priority() {
  //   return this.priority;
  // }

  // set priority(updatePriority) {
  //   this.priority = updatePriority;
  // }

  // get check() {
  //   return this.check;
  // }

  // set check(updateCheck) {
  //   this.check = updateCheck;
  // }

  // get project() {
  //   return this.project;
  // }

  // set project(updateProject) {
  //   this.project = updateProject;
  // }
}

// Create the first card by default

let createFirstCard = new Task();
newCard(createFirstCard);

// Event listener for Add Task button
const addTask = document.querySelector(".add-task");

addTask.addEventListener("click", newCard);
