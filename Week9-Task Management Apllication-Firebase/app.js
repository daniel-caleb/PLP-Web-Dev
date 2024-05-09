// Initialize Firebase with your config
firebase.initializeApp({
  apiKey: "AIzaSyDM8bU90XreAST6Ld7nKzV_Cu4dfR2EClI",
  authDomain: "plp-apps-c0c94.firebaseapp.com",
  projectId: "plp-apps-c0c94",
  storageBucket: "plp-apps-c0c94.appspot.com",
  messagingSenderId: "478212254360",
  appId: "1:478212254360:web:d2dfce83e51dd667ee3eed"
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if (task !== "") {
    db.collection("tasks").add({
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    taskInput.value = "";
  }
}

// Function to render tasks
function renderTasks(doc) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
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
}
