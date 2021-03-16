const todoList = document.querySelector('#todos-list')


// create todo element and add it to list
function renderTodo(doc) {
    let li = document.createElement('li')
    let label = document.createElement('label')
    
    let checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    
    let p = document.createElement("p")
    let text = document.createTextNode(doc.data().text)
    p.appendChild(text)
    
    let span = document.createElement("span")
    
    label.appendChild(checkbox)
    label.appendChild(p)
    label.appendChild(span)

    li.appendChild(label)
    li.setAttribute('data-id', doc.id)

    todoList.appendChild(li)
}

// get list of todos
db.collection('todos').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        renderTodo(doc)
    })
})

