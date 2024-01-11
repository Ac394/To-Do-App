import Storage from "./storageFunctions";
import UI from "./UI";

export const todoList = Storage.getList();
UI.initUI();
