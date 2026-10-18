const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function showToast(message) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "center",
    style: { background: "linear-gradient(to right, #4f46e5, #3b82f6)" },
  }).showToast();
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    showToast("⚠️ Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "flex-1";
  li.appendChild(span);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔️";
  completeBtn.className = "ml-2 text-green-600";
  completeBtn.onclick = () => {
    span.classList.toggle("line-through");
    showToast("✅ Task completed!");
  };
  li.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "ml-2 text-red-600";
  deleteBtn.onclick = () => {
    li.remove();
    showToast("🗑️ Task deleted");
  };
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  taskInput.value = "";
  showToast("📝 Task added!");
}

// Allow pressing "Enter" to add task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

