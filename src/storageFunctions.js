import { projects } from ".";

export default function updateStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(`This is the array from update ${projects}`);
}
