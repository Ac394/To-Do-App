import textareaWrap from "/src/textarea.js";

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
  // task.description = txtArea.value;

  const cardInf = newEl("div");
  cardInf.classList.add("card-info");

  const infoWrap = newEl("div");
  infoWrap.classList.add("info-wrapper");

  const dropdown = newEl("div");
  dropdown.classList.add("dropdown");

  const dropBtn = newEl("button");
  dropBtn.classList.add("dropbtn");
  dropBtn.addEventListener("click", () => {
    dropContent.classList.toggle("show");
  });

  const dropContent = newEl("div");
  dropContent.classList.add("dropdown-content");
  dropContent.setAttribute("id", "myDropdown");

  const lowBtn = newEl("button");
  lowBtn.classList.add("low-pr");

  const midBtn = newEl("button");
  midBtn.classList.add("mid-pr");

  const highBtn = newEl("button");
  highBtn.classList.add("high-pr");

  const dateInput = newEl("input");
  dateInput.classList.add("date-input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "datepicker");

  const dateLabel = newEl("label");
  dateLabel.classList.add("date");
  dateLabel.innerHTML = "Apr 23";
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
  });

  const checkbox = newEl("input");
  checkbox.classList.add("checkbox");
  checkbox.setAttribute("id", "checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "checkbox");

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
