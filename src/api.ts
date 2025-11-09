import { Item } from "./types";

const API_URL = "http://localhost:3000/items";

// Fetch all items
export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(API_URL);
  return response.json();
}

// Add a new item
export async function addItem(name: string): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

// Delete an item
export async function deleteItem(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
