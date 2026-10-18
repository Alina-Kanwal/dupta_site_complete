const taskInput = document.getElementById("user-input")
const taskList = document.getElementById("tasklist")

function showmessage(message){
   alert(message)
}

function addtask(){
    const tasktext = taskInput.value.trim()
    if (!tasktext){
        showmessage("Please Enter a task")
        return;
    }
}

const li = document.createElement("li")
li.className = "flex justify-between items-center px-3 py-2 rounded-lg bg-gray-50"

const span = document.createElement("span")
span.taskcontent = tasktext
span.className = "flex-1"
li.appendChild(span)



