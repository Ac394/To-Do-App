import createList from "./createList";
import { clearList, allList, todayList, weekList } from "./listFunctions";
import { createProject, addProject } from "./createProject";

export let projects = [
  {
    id: 1,
    name: "Home",
    tasks: [],
  },
];

// Get tasks from local storage and generate UI
(() => {
  const storedProjectsString = localStorage.getItem("projects");
  const storedProjects = JSON.parse(storedProjectsString);
  // console.log(`This is the original ${storedProjectsString}`);
  // console.log(`This is parse objects ${storedProjects}`);
  if (storedProjectsString !== null) {
    projects = storedProjects;
  }
  projects.forEach((project) => allList(project));
  // createList(1);
  addProject();
  projects.forEach((project) => {
    if (project.id !== 1) {
      createProject(project.id);
    }
  });
})();

// Home button event listener
const homeBtn = document.querySelector(".home");
homeBtn.addEventListener("click", () => {
  clearList();
  projects.forEach((project) => allList(project));
  // allList(projects[0]);
});

// import { isThisWeek } from "date-fns";
// (() => {
//   const thisWeek = isThisWeek(new Date());
//   console.log(`This is the new week ${thisWeek}`);
// })();
