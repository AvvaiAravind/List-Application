import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "item flex justify-between items-center pt-[1em] gap-[1em]";
      const checkBox = document.createElement("input") as HTMLInputElement;
      checkBox.type = "checkbox";
      checkBox.id = item.id;
      checkBox.className = "text-center min-w-10 min-h-10 cursor-pointer";
      checkBox.tabIndex = 0;
      checkBox.checked = item.checked;
      li.append(checkBox);
      checkBox.addEventListener("change", (e) => {
        e.stopPropagation();
        checkBox.checked = !item.checked;
        item.checked = !item.checked;
        fullList.save();
        this.render(fullList);
      });
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      label.className = item.checked ? "line-through" : "";
      li.append(label);

      const btn = document.createElement("button");
      btn.className =
        "button outline bg-white text-black rounded-[10px] min-w-12 min-h-12 hover:cursor-pointer hover:text-red-600 focus:text-red-600";
      btn.textContent = "X";
      li.append(btn);

      btn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
