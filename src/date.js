import { compareAsc, format, parseISO, parse } from "date-fns";

export default function dateOutput(task, input, label) {
  input.value = new Date().toJSON().slice(0, 10);

  const dateUpdate = () => {
    const dateFormat = format(parseISO(input.value), "dd MMM yyyy");
    label.innerHTML = dateFormat;
    task.dueDate = dateFormat;
    console.log(task.dueDate);
  };

  dateUpdate();
  input.addEventListener("change", dateUpdate);
}
