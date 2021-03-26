
# dsc-firestore-tut
A short tutorial to using Firestore by creating a simple to-do list.

## Overview

We are using Vanilla JS and [Materialize](https://materializecss.com/) component library.  

We imported Javascript modules directly in the [HTML](https://github.com/dabreadman/dsc-firestore-tut/blob/master/index.html), as this serves as a simple tutorial to Firestore.

We also used [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve locally and provide `Hot-Reloading` (i.e. not needing to refresh after changes).

- We invoke a listener to collection, and renders all the documents on DOM while storing the **id** of the documents using `renderToDo(doc)` function.
- We have listeners on the rendered elements, and on `click` on **CheckButton** (specifically CheckIcon), we apply a strikethrough using CSS.
- On `click` on **CancelButton** (specifically CancelIcon), we delete document by id from collection using `deleteToDo(id)` function.
- Once the document is deleted, collection listener invokes a function, and judging from the `removed` **type**, we remove element from DOM using `deleteToDoElementById(id)` function.
- On `form` submission, we add document to collection. Similar to deletion, we get the `added` **type**, and renders the element to DOM using `renderToDo(doc)` function.
## Serve locally

Either use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer),  

Or open [`index.html`](https://github.com/dabreadman/dsc-firestore-tut/blob/master/index.html) on any browser.

## Setup

### Firestore initilization  

```html
<script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-firestore.js"></script>
```

Read more [here](https://firebase.google.com/docs/web/setup#available-libraries).  
Or refer to the visual guide below.

```javascript
var firebaseConfig = {
    apiKey: "AIzaSyBBbedJiIvULmuHx_NKF_8THwml7prtWLc",
    authDomain: "fir-tutorial-to-do-list.firebaseapp.com",
    projectId: "fir-tutorial-to-do-list",
    storageBucket: "fir-tutorial-to-do-list.appspot.com",
    messagingSenderId: "251747964145",
    appId: "1:251747964145:web:fbe949c1096b8cea4dc550"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create ref to firestore database
const db = firebase.firestore()
 ```

### Adding document

This adds a document to the collection `todos` with the **field** `Description` of `someValue` (both `field` and `value` are case sensitive), **id** would be auto generated.

```javascript
db.collection("todos").add({
    Description: "someValue"
  });
  ```

### Removing document

This removes the document with specified **id** from the collection `todos`.

```javascript
db.collection("todos").doc(id).delete();
```

### Get documents inside a collection  

This gets all the documents inside `todos` collection.

```javascript
db.collection("todos")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      // Do something to document
    });
  });
```

### Listens for collection changes

This monitor changes to collection `todos`, and invoke this statement when a change is detected, which is far more useful than previous approach.  
This also results all the documents in collect on initialization.

```javascript
// Triggers every time collection changes
db.collection("todos").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  // Do something 
});
```

## Firestore Setup Visual Walkthrough (Textual guide [here](https://firebase.google.com/docs/firestore/quickstart))

The only differences to the `todo app` is the naming.  

Lets go to Firebase/Cloud Firestore [webpage](https://firebase.google.com/),   
and click on `Go to console`.
![Frontpage](https://i.imgur.com/duwQgPN.jpg)

Then we can create a new project by clicking `Create a project`.
![Create project](https://i.imgur.com/ehfMjj3.jpg)

Then we can name our project, we named it `Some-Project` here.
![Project name](https://i.imgur.com/KikhuzA.jpg)

We could choose to enable `Google Analytics` (we didn't enable it for this project as this is not outward facing).
![Google Analytics](https://i.imgur.com/vGpOW9d.jpg)

Some options if you chose to enable `Google Analytics`.  
Press `Create project` to finish creation.
![Google Analytics options](https://i.imgur.com/EW6QiYe.jpg)

It would take some time to create your project.  
![Creating Project](https://i.imgur.com/wLvjEs4.jpg)

And now the project creation is done!  
Press `Continue` to continue.  
![Finish Project Creation](https://i.imgur.com/U2gJEz9.jpg)

Now we can choose some application type for our project, in this example we are making a Web Application so we chose `Web`.
![Application type](https://i.imgur.com/rFdpP6M.jpg)

Now we register our application name, we chose `Some-Project` (bad naming, it should be `Some-Application`..  
Regardless, now `Register app`.  
One can also host the application on [`Firebase Hosting`](https://firebase.google.com/docs/hosting).
![Application Name](https://i.imgur.com/Xyk7b7Y.jpg)

We are presented with this page, and we can/need to insert them into our source files, we chose to insert them into the [HTML](https://github.com/dabreadman/dsc-firestore-tut/blob/master/index.html).   
**Reason**? This serves as an introduction, and we are lazy :U
![Firebase SDK](https://i.imgur.com/gCntRpX.jpg)

Now that we have registered our application, we can `Create Database` through `Firestore Database`, one could expand this option from the bottom left.  
![Create database](https://i.imgur.com/43B0hSO.jpg)

We will be creating a database using the rules of  `test mode`, we could change that afterwards when we're done.
![Cloud Firestore rules](https://i.imgur.com/3CIQ8IH.jpg)

As in here (`https://console.firebase.google.com/u/1/project/some-project/firestore/rules`).  
Note that the `URL` might be different from your `project name`.
![Change Cloud Firestore rules](https://i.imgur.com/eCcVnZk.jpg)

Regardless, we keep on moving forward!  
Now we can select the `region` for our database.  
Check your requirements and regulations.  

`Enable` and our `Cloud Firestore` is live!
![Cloud Firestore region](https://i.imgur.com/66r7n6i.jpg) 

Now, we can call it quits here, or we can try to add some **collection**s or **document**s.
![Add collection](https://i.imgur.com/91X6OsE.jpg)  
Here we create a `collection` named `Some-Collection`.
![Add collection](https://i.imgur.com/jU3JKP6.jpg)

Now we add a `document`.  
We can use `Auto-ID` because why not, am I right?  
Well there's a reason we use `password generator` instead of thinking them ourselves, and it'd be bad to have the **id**s reverse engineered.
![Document Auto-ID](https://i.imgur.com/iQUbWgc.jpg)

Now let's declare a **Field** of `Some-Field` with the **type** `string` and **value** of `Some-Value`.  
`Save` and done!
![Add document fields](https://i.imgur.com/WyA7jTq.jpg)

And there goes our collection!
![Collection overview](https://i.imgur.com/cD2iVWs.jpg)

Now we can just do addition/deletion/modification etc!  
The setup is done.
