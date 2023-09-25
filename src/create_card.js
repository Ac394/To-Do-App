import dateOutput from "/src/date.js";
import textareaWrap from "/src/textarea.js";
import { changePriority, defaultPriority } from "./priority";
import deleteTask from "./deleteTask";

export default function newCard(task) {
  const newEl = (e) => {
    return document.createElement(`${e}`);
  };

  const cardsContainer = document.querySelector(".cards-container");

  const cardWrap = newEl("a");
  cardWrap.classList.add("card-wrapper");

  const descrWrap = newEl("div");
  descrWrap.classList.add("description-wrapper");

  const txtArea = newEl("textarea");
  txtArea.classList.add("txta", "txtstuff");
  txtArea.placeholder = "Add a description";
  textareaWrap(task, txtArea);

  const cardInf = newEl("div");
  cardInf.classList.add("card-info");

  const infoWrap = newEl("div");
  infoWrap.classList.add("info-wrapper");

  const dropdown = newEl("div");
  dropdown.classList.add("dropdown");

  const dropBtn = newEl("button");
  dropBtn.classList.add("dropbtn");
  defaultPriority(task, dropBtn);
  dropBtn.addEventListener("click", () => {
    dropContent.classList.toggle("show");

    document.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown")) return;

      dropContent.classList.remove("show");
    });
  });

  const dropContent = newEl("div");
  dropContent.classList.add("dropdown-content");
  dropContent.setAttribute("id", "myDropdown");

  const lowBtn = newEl("button");
  lowBtn.classList.add("low-pr");
  lowBtn.addEventListener("click", () => {
    changePriority(dropContent, task, dropBtn, "low");
  });

  const midBtn = newEl("button");
  midBtn.classList.add("mid-pr");
  midBtn.addEventListener("click", () => {
    changePriority(dropContent, task, dropBtn, "mid");
  });

  const highBtn = newEl("button");
  highBtn.classList.add("high-pr");
  highBtn.addEventListener("click", () => {
    changePriority(dropContent, task, dropBtn, "high");
  });

  const dateInput = newEl("input");
  dateInput.classList.add("date-input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "datepicker");
  dateInput.required = true;

  const dateLabel = newEl("label");
  dateLabel.classList.add("date");
  dateOutput(task, dateInput, dateLabel);
  dateLabel.setAttribute("for", "datepicker");
  dateLabel.addEventListener("click", () => {
    dateInput.showPicker();
  });

  const checkDiv = newEl("div");
  checkDiv.classList.add("checkDiv");

  const delIcon = newEl("span");
  delIcon.innerHTML = "delete";
  delIcon.classList.add("material-symbols-outlined");
  delIcon.addEventListener("click", () => {
    cardWrap.remove();
    // deleteTask(task);
  });

  const checkbox = newEl("input");
  checkbox.classList.add("checkbox");
  checkbox.setAttribute("id", "checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkbox.addEventListener("change", () => {
    task.check = checkbox.checked;
    console.log(task.check);
    console.log(task);
  });

  descrWrap.appendChild(txtArea);
  dropContent.appendChild(lowBtn, midBtn, highBtn);
  dropContent.appendChild(midBtn);
  dropContent.appendChild(highBtn);
  dropdown.appendChild(dropBtn, dropContent);
  dropdown.appendChild(dropContent);
  infoWrap.appendChild(dropdown);
  infoWrap.appendChild(dateInput);
  infoWrap.appendChild(dateLabel);
  checkDiv.appendChild(delIcon);
  checkDiv.appendChild(checkbox);
  cardInf.appendChild(infoWrap);
  cardInf.appendChild(checkDiv);
  cardWrap.appendChild(descrWrap);
  cardWrap.appendChild(cardInf);
  cardsContainer.appendChild(cardWrap);
}
