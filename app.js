// Get list container
const todo = document.getElementById("todos-list");

// Get form container
const form = document.getElementById("add-todo-form");

// Get all todos
db.collection("todos")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });
