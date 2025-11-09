const API_URL = "http://localhost:3000/items";

const itemForm = document.getElementById("itemForm") as HTMLFormElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const itemList = document.getElementById("itemList") as HTMLUListElement;

// Fetch and display all items
async function getItems() {
  const response = await fetch(API_URL);
  const items = await response.json();

  itemList.innerHTML = ""; // clear the list
  items.forEach((item: { id: string; name: string }) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      ${item.name}
      <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Delete</button>
    `;
    itemList.appendChild(li);
  });
}

// Create (POST) a new item
async function addItem(name: string) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  getItems();
}

// Delete an item
async function deleteItem(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  getItems();
}
(window as any).deleteItem = deleteItem;

// Handle form submission
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = itemInput.value.trim();
  if (name) {
    addItem(name);
    itemInput.value = "";
  }
});

// Load items on startup
getItems();
