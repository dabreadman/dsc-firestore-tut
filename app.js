// Get list container
const todo = document.getElementById("todos-list");

// Get form container
const form = document.getElementById("add-todo-form");

// Create todo element and render on DOM
function renderToDo(doc) {
  let li = document.createElement("li");
  let text = document.createTextNode(doc.data().Description);
  let checkButton = document.createElement("a");
  let checkIcon = document.createElement("i");
  let checkText = document.createTextNode("check");
  checkIcon.classList.add("material-icons");
  checkButton.classList.add("secondary-content");
  checkIcon.appendChild(checkText);
  checkButton.appendChild(checkIcon);
  checkButton.setAttribute("href", "#!");

  // Add line through on completed todo
  checkIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    e.target.parentElement.parentElement.classList.add("finished");
  });

  let cancelButton = document.createElement("a");
  let cancelIcon = document.createElement("i");
  let cancelText = document.createTextNode("close");
  cancelIcon.classList.add("material-icons", "red-text");
  cancelButton.classList.add("secondary-content");
  cancelIcon.appendChild(cancelText);
  cancelButton.appendChild(cancelIcon);
  cancelButton.setAttribute("href", "!#");

  li.appendChild(text);
  li.appendChild(cancelButton);
  li.appendChild(checkButton);
  li.classList.add("collection-item");
  li.setAttribute("data-id", doc.Id);

  todo.appendChild(li);
}

// Get all todos
db.collection("todos")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderToDo(doc);
    });
  });

form.addEventListener("submit", (e) => {
  // Stop form reset
  e.preventDefault();
  // Add document to Firestore
  db.collection("todos").add({
    Description: form.todoText.value,
  });
  form.reset();
});
