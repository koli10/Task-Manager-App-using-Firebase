// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyCbxN6XdWI-tpLXTELdpkvfAoy8Icjd3w4",
    authDomain: "plp-apps-3805b.firebaseapp.com",
    projectId: "plp-apps-3805b",
    storageBucket: "plp-apps-3805b.appspot.com",
    messagingSenderId: "1085111386817",
    appId: "1:1085111386817:web:e37b2b994c231f55deca40"

});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    // check for empty value 
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

// Function to render tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
}