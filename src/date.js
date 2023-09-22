import { compareAsc, format } from "date-fns";

export default function dateOutput(input, label) {
  input.value = new Date().toJSON().slice(0, 10);
  label.innerHTML = input.value;

  const dateUpdate = () => {
    label.innerHTML = input.value;
    console.log(input.value);
  };

  input.addEventListener("change", dateUpdate);
}
