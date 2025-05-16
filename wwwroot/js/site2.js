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

  // event: when enter is pressed
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      saveTask(input);
    }
  });

  // event: when input loses focus 
  input.addEventListener("blur", function() {
    saveTask(input);
  });

  // Show task buttons when focusing on this task
  newTask.addEventListener("click", function() {
    // First hide all task buttons
    const allTaskBttns = document.querySelectorAll(".task-bttns");
    allTaskBttns.forEach(bttnGroup => {
      bttnGroup.style.display = "none";
    });
    
    // Then show buttons for this task
    const thisTaskBttns = this.querySelector(".task-bttns");
    if (thisTaskBttns) {
      thisTaskBttns.style.display = "flex"; // Using flex for better button layout
    }
  });

  // Add delete button functionality
  const deleteButton = newTask.querySelector("#del-bttn");
  deleteButton.removeAttribute("id"); // Remove id to avoid duplicates
  deleteButton.addEventListener("click", function() {
    newTask.remove();
  });

  // Append and focus
  document.getElementById("task-container").appendChild(newTask);
  input.focus();
}

function saveTask(inputElement) {
  const taskName = inputElement.value.trim();
  const taskSection = inputElement.closest(".section");
  const parent = inputElement.parentElement;

  if (taskName !== "") {
    // Replace input with a static task name
    const textDiv = document.createElement("div");
    textDiv.className = "task-content";
    textDiv.textContent = taskName;
    
    // Make the task editable on double-click
    textDiv.addEventListener("dblclick", function() {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "task-input";
      newInput.value = this.textContent;
      
      parent.replaceChild(newInput, this);
      newInput.focus();
      
      newInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          saveTask(newInput);
        }
      });
      
      newInput.addEventListener("blur", function() {
        saveTask(newInput);
      });
    });

    parent.replaceChild(textDiv, inputElement);
    
    // Keep buttons visible for current task
    const taskBttns = taskSection.querySelector(".task-bttns");
    if (taskBttns) {
      taskBttns.style.display = "flex";
    }
  } else {
    // If empty, remove the entire task item
    taskSection.remove();
  }
}

// Add a global click handler to hide buttons when clicking outside tasks
document.addEventListener("click", function(event) {
  // If click is outside any task section
  if (!event.target.closest(".section")) {
    const allTaskBttns = document.querySelectorAll(".task-bttns");
    allTaskBttns.forEach(bttnGroup => {
      bttnGroup.style.display = "none";
    });
  }
});

// Initialize by hiding all task buttons initially
document.addEventListener("DOMContentLoaded", function() {
  const taskBttns = document.querySelectorAll(".task-bttns");
  taskBttns.forEach(bttnGroup => {
    bttnGroup.style.display = "none";
  });
});