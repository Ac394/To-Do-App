// import newCard from "./cardCreate";

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

// export function projectTitle(e) {
//   if (
//     e.key == "ArrowLeft" ||
//     e.key == "ArrowRight" ||
//     e.key == "Delete" ||
//     e.key == "Backspace"
//   )
//     return;
//   if (e.key === "Enter" || e.key === "Escape") {
//     title.blur();
//   }
//   if (title.innerText.length >= 50) {
//     e.preventDefault();
//   }
// }

// export function addTask() {
//   newCard(new Task());
// }
