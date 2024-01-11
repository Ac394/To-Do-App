import List from "./listFunctions";
import Storage from "./storageFunctions";
import { todoList } from ".";
import { Task } from "./taskFunctions";
import { format, parseISO } from "date-fns";

export default class UI {
  static createProjectBtn(project) {
    const ul = document.querySelector(".projects-content");
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("project");
    btn.addEventListener("click", () => {
      UI.clearList();
      UI.createProjectList(project, btn);
      UI.setActiveSidebar(btn);
    });

    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded");
    span.innerHTML = "chevron_right";
    const spanTitle = document.createElement("span");
    spanTitle.classList.add("sidebar-project");
    spanTitle.innerText = project.getName();
    btn.append(span);
    btn.append(spanTitle);
    li.appendChild(btn);
    ul.appendChild(li);
  }

  static clearList() {
    const lists = document.querySelectorAll(".list");
    lists.forEach((list) => list.remove());
  }

  static createProjectList(project, listTitle) {
    UI.createList(project.getID(), listTitle);
    project.getTasks().forEach((task) => UI.createTask(task, project));
  }

  static createList(projectID) {
    const project = todoList.getProject(projectID);
    const board = document.querySelector(".board");

    const newEl = (e) => {
      return document.createElement(`${e}`);
    };

    const list = newEl("div");
    list.classList.add("list");
    list.setAttribute("id", projectID);
    if (!projectID) list.classList.add("home-card");

    const projectHeader = newEl("div");
    projectHeader.classList.add("project-header");

    const title = newEl("h2");
    title.classList.add("title");
    title.contentEditable = "false";
    title.innerHTML = project.getName();
    title.addEventListener("input", () => {
      project.setName(title.innerHTML);
      document.querySelectorAll(".sidebar-project")[projectID - 1].innerText =
        title.innerHTML;
      Storage.saveList();
    });
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        title.blur();
      }
    });
    title.addEventListener("blur", () => (title.contentEditable = "false"));

    const editBtn = newEl("button");
    editBtn.classList.add("edit-title");
    if (project.getID() === 0) {
      editBtn.style.display = "none";
    }
    editBtn.addEventListener("click", () => {
      title.contentEditable = "true";
      title.focus();
    });

    const editIcon = newEl("span");
    editIcon.classList.add("material-symbols-outlined");
    editIcon.innerHTML = "edit_square ";

    const delBtn = newEl("button");
    delBtn.classList.add("delete-project");
    delBtn.addEventListener("click", () => UI.deleteProjectContainer(project));

    const delIcon = document.createElement("span");
    delIcon.classList.add("material-symbols-outlined");
    delIcon.innerHTML = "delete_forever";

    const cards = newEl("div");
    cards.classList.add("cards");

    const cardsContainer = newEl("div");
    cardsContainer.classList.add("cards-container");

    const addBtn = newEl("button");
    addBtn.classList.add("add-task");
    addBtn.addEventListener("click", () => {
      UI.createTask(new Task(), project, true);
      Storage.saveList();
    });

    const addIcon = newEl("span");
    addIcon.classList.add("material-symbols-outlined");
    addIcon.innerHTML = "add";

    const addText = newEl("span");
    addText.innerHTML = "Add task";

    delBtn.appendChild(delIcon);
    editBtn.appendChild(editIcon);
    projectHeader.append(title, delBtn, editBtn);
    addBtn.append(addIcon, addText);
    cards.append(cardsContainer, addBtn);
    list.append(projectHeader, cards);
    board.appendChild(list);
  }

  static createTask(task, project, isNew) {
    const newEl = (e) => {
      return document.createElement(`${e}`);
    };

    const cardsContainer = document
      .getElementById(project.getID())
      .querySelector(".cards-container");

    const cardWrap = newEl("a");
    cardWrap.classList.add("card-wrapper");

    const descrWrap = newEl("div");
    descrWrap.classList.add("description-wrapper");

    const txtArea = newEl("textarea");
    txtArea.classList.add("txta", "txtstuff");
    txtArea.placeholder = "Add a description";

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
      UI.setPriority(task, "low", dropBtn);
      dropContent.classList.remove("show");
    });

    const midBtn = newEl("button");
    midBtn.classList.add("mid-pr");
    midBtn.addEventListener("click", () => {
      UI.setPriority(task, "mid", dropBtn);
      dropContent.classList.remove("show");
    });

    const highBtn = newEl("button");
    highBtn.classList.add("high-pr");
    highBtn.addEventListener("click", () => {
      UI.setPriority(task, "high", dropBtn);
      dropContent.classList.remove("show");
    });

    const dateLabel = newEl("label");
    dateLabel.classList.add("date");
    console.log(`This is the task.value inside cardCreate ${task.getDate()}`);
    dateLabel.setAttribute("for", "datepicker");
    dateLabel.addEventListener("click", () => dateInput.showPicker());

    const dateInput = newEl("input");
    dateInput.classList.add("date-input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "datepicker");
    dateInput.required = true;
    dateInput.addEventListener("change", () =>
      UI.updateDate(task, dateInput.value, dateLabel)
    );

    const checkDiv = newEl("div");
    checkDiv.classList.add("checkDiv");

    const delIcon = newEl("span");
    delIcon.innerHTML = "delete";
    delIcon.classList.add("material-symbols-outlined");
    delIcon.addEventListener("click", () => {
      cardWrap.remove();
      console.log(`Task is ${task}`);
      project.deleteTask(task);
      Storage.saveList();
    });

    const checkbox = newEl("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("id", "checkbox");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    checkbox.addEventListener("change", () => {
      UI.updateCheckbox(task, checkbox.checked, checkbox);
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

    // Generate default task info
    UI.createTextareaWrap(task, txtArea);
    UI.setPriority(task, task.getPriority(), dropBtn);
    UI.updateDate(task, task.getDate(), dateLabel);
    UI.updateCheckbox(task, task.getCheckbox(), checkbox);

    if (isNew) {
      project.addTask(task);
      //   Storage.saveList();
    }
  }

  static setPriority(task, priority, label) {
    switch (priority) {
      case "low":
        task.setPriority("low");
        label.style.backgroundColor = "#3498db";
        break;
      case "mid":
        task.setPriority("mid");
        label.style.backgroundColor = "#faa53d";
        break;
      case "high":
        task.setPriority("high");
        label.style.backgroundColor = "#f87462";
        break;
    }

    Storage.saveList();

    console.log(task.getPriority());
  }

  static createTextareaWrap(task, textarea) {
    // Targets all textareas with class "txta"
    let hiddenDiv = document.createElement("div"),
      content = null;

    // Build the hidden div's attributes

    // The line below is needed if you move the style lines to CSS
    hiddenDiv.classList.add("hiddendiv");

    // Add the "txta" styles, which are common to both textarea and hiddendiv
    // If you want, you can remove those from CSS and add them via JS
    hiddenDiv.classList.add("txta");

    // Add the styles for the hidden div
    // These can be in the CSS, just remove these three lines and uncomment the CSS
    hiddenDiv.style.display = "none";
    hiddenDiv.style.whiteSpace = "pre-wrap";
    hiddenDiv.style.wordWrap = "break-word";

    const txtaDiv = () => {
      // Append hiddendiv to parent of textarea, so the size is correct
      textarea.parentNode.appendChild(hiddenDiv);

      // Remove this if you want the user to be able to resize it in modern browsers
      // textarea.style.resize = 'none';

      // This removes scrollbars
      textarea.style.overflow = "hidden";

      // Every input/change, grab the content
      content = textarea.value;

      // Add the same content to the hidden div

      // This is for old IE
      content = content.replace(/\n/g, "<br>");

      // The <br ..> part is for old IE
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = "hidden";
      hiddenDiv.style.display = "block";
      textarea.style.height = hiddenDiv.offsetHeight + "px";

      // Make the hidden div display:none again
      hiddenDiv.style.visibility = "visible";
      hiddenDiv.style.display = "none";
    };

    // Note: Use 'keyup' instead of 'input'
    // if you want older IE support
    textarea.addEventListener("input", () => {
      task.setDescription(textarea.value);
      console.log(task.getDescription());
      txtaDiv();
      Storage.saveList();
    });

    // Default text
    textarea.value = task.getDescription();
    txtaDiv();
  }

  static updateCheckbox(task, newValue, checkbox) {
    task.setCheckbox(newValue);
    checkbox.checked = newValue;
    Storage.saveList();
    console.log(task.getCheckbox());
  }

  static updateDate(task, date, element) {
    const dateFormat = format(parseISO(date), "dd MMM yyyy");
    element.innerHTML = dateFormat;
    task.setDate(date);
    Storage.saveList();

    console.log(task.getDate());
  }

  static addProjectBtn() {
    const newProject = todoList.addProject();
    UI.createProjectBtn(newProject);
    if (UI.isHomeActive()) UI.createProjectList(newProject);
    Storage.saveList();
  }

  static isHomeActive() {
    const activeEl = document.querySelector(".active");
    if (activeEl) return activeEl.classList.contains("home") ? true : false;
  }

  static createAllTasks() {
    UI.clearList();
    todoList.getProjects().forEach((project) => UI.createProjectList(project));
  }

  static createTodayTasks() {
    UI.clearList();
    todoList.getProjects().forEach((project) => {
      if (project.getTodayTasks().length) {
        UI.createList(project.getID());
      }
      project.getTodayTasks().forEach((task) => UI.createTask(task, project));
    });
  }

  static createWeekTasks() {
    UI.clearList();
    todoList.getProjects().forEach((project) => {
      if (project.getWeekTasks().length) {
        UI.createList(project.getID());
      }
      project.getWeekTasks().forEach((task) => UI.createTask(task, project));
    });
  }

  static initButtons() {
    const addProjectBtn = document.querySelector(".add-project");
    UI.homeBtn();
    UI.todayBtn();
    UI.weekBtn();
    addProjectBtn.addEventListener("click", UI.addProjectBtn);
  }

  static setActiveSidebar(activeBtn) {
    // Remove previous active class from sidebar
    const activePrevious = document.getElementsByClassName("active")[0];
    if (activePrevious) activePrevious.classList.remove("active");
    // Add active class
    activeBtn.classList.add("active");
  }

  static homeBtn() {
    const homeBtn = document.querySelector(".home");
    homeBtn.addEventListener("click", UI.createAllTasks);
    homeBtn.addEventListener("click", () => UI.setActiveSidebar(homeBtn));
  }

  static todayBtn() {
    const todayBtn = document.querySelector(".today");
    todayBtn.addEventListener("click", UI.createTodayTasks);
    todayBtn.addEventListener("click", () => UI.setActiveSidebar(todayBtn));
  }

  static weekBtn() {
    const weekBtn = document.querySelector(".week");
    weekBtn.addEventListener("click", UI.createWeekTasks);
    weekBtn.addEventListener("click", () => UI.setActiveSidebar(weekBtn));
  }

  static deleteProjectContainer(project) {
    const projectID = project.getID();
    const projectContainer = document.getElementById(projectID);
    const projectSidebar = document.querySelectorAll(`ul > li`)[projectID - 1];
    if (document.querySelector(".project.active")) {
      UI.setActiveSidebar(document.querySelector(".home"));
    }
    projectContainer.remove();
    projectSidebar.remove();
    todoList.deleteProject(project);
    todoList.updateProjectsID();
    Storage.saveList();
    UI.redrawUI();
  }

  static initUI() {
    UI.initButtons();

    todoList.getProjects().forEach((project) => {
      if (project.getID()) UI.createProjectBtn(project);
      UI.createProjectList(project);
    });

    Storage.saveList();
  }

  static redrawUI() {
    UI.clearList();
    const projectActive = document.querySelector(".active");
    if (projectActive.classList.contains("home")) {
      UI.createAllTasks();
    } else if (projectActive.classList.contains("today")) {
      UI.createTodayTasks();
    } else if (projectActive.classList.contains("week")) {
      UI.createWeekTasks();
    }
  }
}
