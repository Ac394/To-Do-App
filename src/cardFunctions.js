import { compareAsc, format, parseISO, parse } from "date-fns";
import { tasks } from ".";

export function updateDate(task, newValue, element) {
  const dateFormat = format(parseISO(newValue), "dd MMM yyyy");
  element.innerHTML = dateFormat;
  task.dueDate = newValue;
  updateStorage();

  console.log(task.dueDate);
}

export function updatePriority(task, newValue, label) {
  switch (newValue) {
    case "low":
      task.priority = "low";
      label.style.backgroundColor = "#3498db";
      break;
    case "mid":
      task.priority = "mid";
      label.style.backgroundColor = "#faa53d";
      break;
    case "high":
      task.priority = "high";
      label.style.backgroundColor = "#f87462";
      break;
  }

  updateStorage();

  console.log(task.priority);
}

export function textareaWrap(task, textarea) {
  // Targets all textareas with class "txta"
  let hiddenDiv = document.createElement("div"),
    content = null;

  // Adds a class to all textareas
  // for (let j of textareas) {
  //   j.classList.add('txtstuff');
  // }

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
    task.description = textarea.value;
    console.log(task.description);
    txtaDiv();
    updateStorage();
  });

  // Default text
  textarea.value = task.description;
  txtaDiv();
}

export function updateCheckbox(task, newValue, checkbox) {
  task.check = newValue;
  checkbox.checked = newValue;
  updateStorage();
  console.log(task.check);
}

export function deleteTask(taskToDelete) {
  const taskIndex = tasks.indexOf(taskToDelete);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  updateStorage();
}

export function addCard(taskToAdd) {
  tasks.push(taskToAdd);
  updateStorage();
}

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(`This is the array from update ${tasks}`);
}
