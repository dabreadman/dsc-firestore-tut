const todoList = document.querySelector('#todos-list')
const form = document.querySelector('#add-todo-form')

// create todo element and add it to list
function renderTodo(doc) {
    let li = document.createElement('li')
    let text = document.createTextNode(doc.data().text)

    let checkButton = document.createElement('a')
    let check = document.createElement('i')
    let checkIcon = document.createTextNode("check")
    check.classList.add("material-icons")
    checkButton.classList.add("secondary-content")
    check.appendChild(checkIcon)
    checkButton.appendChild(check)
    checkButton.setAttribute("href", "#!")

    let cancelButton = document.createElement('a')
    let cancel = document.createElement('i')
    let cancelIcon = document.createTextNode("close")
    cancel.classList.add("material-icons", "red-text")
    cancelButton.classList.add("secondary-content")
    cancel.appendChild(cancelIcon)

    // add delete functionality
    cancel.addEventListener('click', e => {
        e.stopPropagation()
        console.log(e.target)
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        deleteTodo(id)
    })

    // add line through on completed
    check.addEventListener('click', e => {
        e.stopPropagation()
        console.log(e.target)
        e.target.parentElement.parentElement.classList.add("completed")
    })

    cancelButton.appendChild(cancel)
    cancelButton.setAttribute("href", "#!")

    li.appendChild(text)
    li.appendChild(cancelButton)
    li.appendChild(checkButton)
    li.classList.add("collection-item")
    li.setAttribute('data-id', doc.id)

    todoList.appendChild(li)
}

// get list of todos
// db.collection('todos').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data())
//         renderTodo(doc)
//     })
// })

// real-time listener
db.collection('todos').onSnapshot(snapshot => {
    let changes = snapshot.docChanges()
    console.log(changes)
    changes.forEach(change => {
        if (change.type == 'added') {
            renderTodo(change.doc)
        } else if (change.type == 'removed') {
            let li = todoList.querySelector('[data-id="' + change.doc.id + '"]')
            todoList.removeChild(li)
        }
    })
})

// saving data
form.addEventListener('submit', e => {
    e.preventDefault()
    db.collection('todos').add({
        text: form.todoText.value
    })
    form.reset()
})

// delete data
function deleteTodo(id) {
    db.collection('todos').doc(id).delete()
}