// For adding task 
function addTask() {
  // get the hidden template 
  const template = document.getElementById("task-template");

  // clone it (template)
  const newTask = template.cloneNode(true);
  newTask.style.display = "block";
  newTask.removeAttribute("id"); // remove id to avoid templates 

  // get input element 
  const input = newTask.querySelector(".task-input");

  // .task-bttns are made visible when new task is added
  const taskBttns = newTask.querySelector('.task-bttns');
  if (taskBttns) {
    taskBttns.style.display = 'flex'; // or 'block' depending on your layout
  }

  // event: when enter is pressed
  input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      saveTask(input);
    }
  });

  // event: when input loses focus 
  input.addEventListener("blur", function () {
    saveTask(input);
  });

  // Append and focus
  document.getElementById("task-container").appendChild(newTask);
  input.focus();
}

// .task-bttns be visible to new task to create 
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // Select all buttons
    const taskBttns = document.querySelectorAll('.task-bttns');
    taskBttns.forEach(button => {
      button.style.display = 'none'; // Hide the button
    });
  }
});

document.addEventListener('blur', function () {
    // Select all buttons
    const taskBttns = document.querySelectorAll('.task-bttns');
    taskBttns.forEach(button => {
      button.style.display = 'none'; // Hide the button
    });
});


function saveTask(inputElement) {
  const taskName = inputElement.value.trim();
  const parent = inputElement.parentElement;

  if (taskName !== "") {
      // Replace input with a static task name
      const textDiv = document.createElement("div");
      textDiv.className = "task-content";
      textDiv.textContent = taskName;

      parent.replaceChild(textDiv, inputElement);
  } else {
      // If empty, remove the entire task item
      parent.parentElement.remove();
  }
}

