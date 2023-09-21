import { compareAsc, format } from "date-fns";
import "./style.css";
import textareaWrap from "/src/textarea.js";
import newCard from "/src/create_card.js";

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

console.log(format(dates[0], "yyyy-MM-dd"));

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

let fck = new Task();
newCard(fck);

// let task1 = new Task("Clean up the dishes", "15 Jul 24", "low", false, "Default")

// tasks.push(task1);

const createCard = (
  description = "",
  dueDate = "Apr 23",
  priority = "low",
  check = "false",
  project
) => {
  const task = new Task(description);
};

// Date Label Update
const dateInput = document.getElementById("datepicker");
const dateLabel = document.getElementsByClassName("date");
const dateChange = () => {
  dateLabel[0].innerHTML = dateInput.value;
};

dateInput.addEventListener("change", dateChange);

// Event listener for Add Task button
const addTask = document.querySelector(".add-task");

addTask.addEventListener("click", newCard);

///////////////////////////////////////

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

const myDropdown = document.querySelector("#myDropdown");
function dropdown() {
  myDropdown.classList.toggle("show");
  console.log("fck");
}

const dropbtn = document.querySelector(".dropbtn");
dropbtn.addEventListener("click", dropdown);

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
