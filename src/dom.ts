import { Item } from "./types";
import { deleteItem } from "./api";

// Select the UL element
const itemList = document.getElementById("itemList") as HTMLUListElement;

// Render all items
export function renderItems(items: Item[]): void {
  itemList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      ${item.name}
      <button class="btn btn-danger btn-sm">Delete</button>
    `;

    const button = li.querySelector("button")!;
    button.addEventListener("click", async () => {
      await deleteItem(item.id);
      (window as any).loadItems(); // refresh after deletion
    });

    itemList.appendChild(li);
  });
}
