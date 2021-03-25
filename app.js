// Get list container
const todo = document.getElementById("todos-list");

// Get form container
const form = document.getElementById("add-todo-form");

// Create todo element and render on DOM
function renderToDo(doc) {
  let li = document.createElement("li");
  let text = document.createTextNode(doc.data().Description);

  // Build Check Button
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

  // Build Cancel Button
  let cancelButton = document.createElement("a");
  let cancelIcon = document.createElement("i");
  let cancelText = document.createTextNode("close");
  cancelIcon.classList.add("material-icons", "red-text");
  cancelButton.classList.add("secondary-content");
  cancelIcon.appendChild(cancelText);
  cancelButton.appendChild(cancelIcon);
  cancelButton.setAttribute("href", "#!");

  // Add handler to delete document on click
  cancelIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const docId = e.target.parentElement.parentElement.getAttribute("data-id");
    deleteToDo(docId);
  });

  // Build li element
  li.appendChild(text);
  li.appendChild(cancelButton);
  li.appendChild(checkButton);
  li.classList.add("collection-item");
  li.setAttribute("data-id", doc.id);

  // Add li element to DOM
  todo.appendChild(li);
}

// Delete document on Firestore
function deleteToDo(id) {
  db.collection("todos").doc(id).delete();
}

// Delete li element by document id
function deleteToDoElementById(id) {
  let li = todo.querySelector('[data-id="' + id + '"]');
  li.parentElement.removeChild(li);
}

// Triggers everytime collection changes
db.collection("todos").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  console.log(changes);
  changes.forEach((change) => {
    if (change.type == "added") {
      renderToDo(change.doc);
    } else if (change.type == "removed") {
      deleteToDoElementById(change.doc.id);
    }
  });
});

// Add handler for form submission
form.addEventListener("submit", (e) => {
  // Stop form reset
  e.preventDefault();
  // Add document to Firestore
  db.collection("todos").add({
    Description: form.todoText.value,
  });
  form.reset();
});
