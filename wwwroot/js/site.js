

    //     // For adding task (similar to your original JS)
    //     function addTask() {
    //         // get the hidden template
    //         const template = document.getElementById("task-template");

    //         // clone it (template)
    //         const newTask = template.cloneNode(true);
    //         newTask.style.display = "block";
    //         newTask.removeAttribute("id"); // remove id to avoid templates

    //         // get input element
    //         const input = newTask.querySelector(".task-input");
    //         const prioritySelect = newTask.querySelector(".priority-select");
    //         const categorySelect = newTask.querySelector(".category-select");
    //         const hideBtn = newTask.querySelector("#hide-bttn");

    //         // Add event listener for hide button
    //         hideBtn.addEventListener("click", function() {
    //             // We need to ensure task is saved first
    //             if (input.value.trim() !== "") {
    //                 saveTaskToDatabase(input, prioritySelect, categorySelect);
    //             }
    //         });

    //         // .task-bttns are made visible when new task is added
    //         const taskBttns = newTask.querySelector('.task-bttns');
    //         if (taskBttns) {
    //             taskBttns.style.display = 'flex';
    //         }

    //         // event: when enter is pressed
    //         input.addEventListener("keydown", function (event) {
    //             if (event.key == "Enter") {
    //                 saveTaskToDatabase(input, prioritySelect, categorySelect);
    //             }
    //         });

    //         // event: when input loses focus
    //         input.addEventListener("blur", function () {
    //             if (input.value.trim() !== "") {
    //                 saveTaskToDatabase(input, prioritySelect, categorySelect);
    //             }
    //         });

    //         // Add event listeners for selects
    //         prioritySelect.addEventListener("change", function() {
    //             if (input.value.trim() !== "") {
    //                 saveTaskToDatabase(input, prioritySelect, categorySelect);
    //             }
    //         });

    //         categorySelect.addEventListener("change", function() {
    //             if (input.value.trim() !== "") {
    //                 saveTaskToDatabase(input, prioritySelect, categorySelect);
    //             }
    //         });

    //         // Append and focus
    //         document.getElementById("task-container").appendChild(newTask);
    //         input.focus();
    //     }

    //     // Function to save task to database via AJAX
    //     function saveTaskToDatabase(inputElement, prioritySelect, categorySelect) {
    //         const taskName = inputElement.value.trim();

    //         if (taskName !== "") {
    //             // Get values from selects
    //             const priority = prioritySelect.value;
    //             const category = categorySelect.value;

    //             // Create form data
    //             const formData = new FormData();
    //             formData.append("TaskName", taskName);
    //             formData.append("Priority", priority);
    //             formData.append("Category", category);

    //             // Send AJAX request
    //             fetch('@Url.Action("CreateAjax")', {
    //                 method: 'POST',
    //                 body: formData,
    //                 headers: {
    //                     'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
    //                 }
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success) {
    //                     // Replace input with static task name
    //                     const parent = inputElement.parentElement;
    //                     const textDiv = document.createElement("div");
    //                     textDiv.className = "task-content";
    //                     textDiv.textContent = taskName;
    //                     parent.replaceChild(textDiv, inputElement);

    //                     // Set task ID as data attribute on the container
    //                     const taskItem = parent.closest('.section');
    //                     taskItem.setAttribute('data-task-id', data.taskId);

    //                     // Update buttons and delete form
    //                     const hideBtn = taskItem.querySelector('#hide-bttn');
    //                     if (hideBtn) {
    //                         hideBtn.onclick = function() { hideTask(data.taskId); };
    //                         hideBtn.textContent = 'Hide';
    //                     }

    //                     // Update the delete button to be a form submit
    //                     const deleteBtn = taskItem.querySelector('#del-bttn');
    //                     if (deleteBtn) {
    //                         // Create form element
    //                         const form = document.createElement('form');
    //                         form.method = 'post';
    //                         form.action = '@Url.Action("Delete")/' + data.taskId;
    //                         form.style.display = 'inline';

    //                         // Add anti-forgery token
    //                         const token = document.querySelector('input[name="__RequestVerificationToken"]').cloneNode(true);
    //                         form.appendChild(token);

    //                         // Move the delete button inside the form
    //                         deleteBtn.parentNode.replaceChild(form, deleteBtn);
    //                         form.appendChild(deleteBtn);
    //                     }

    //                     // Update the complete button
    //                     const completeBtn = taskItem.querySelector('.icon');
    //                     if (completeBtn) {
    //                         completeBtn.onclick = function() { markAsComplete(data.taskId); };
    //                     }
    //                 } 

    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 alert("Error saving task. Please try again.");
    //             });
    //         } else {
    //             // If empty, remove the entire task item
    //             inputElement.closest('.section').remove();
    //         }
    //     }

    //     // function to change hidden and completed task div color
    //     const hideTaskDiv = document.getElementById("hideTask");
    //     const completedTaskDiv = document.getElementById("completedTask");

    //     function showHiddenTasks() {
    //         // Hide completed tasks container
    //         document.getElementById("completedTasksContainer").style.display = "none";

    //         // Set hideTask to blue
    //         hideTaskDiv.style.backgroundColor = "#364BE9";
    //         hideTaskDiv.style.color = "#ffffff";

    //         // Reset completedTask to gray
    //         completedTaskDiv.style.backgroundColor = "#BDBCBD";
    //         completedTaskDiv.style.color = "#3E3E3E";

    //         // Load and display hidden tasks
    //         fetch('@Url.Action("GetHiddenTasks")')
    //             .then(response => response.text())
    //             .then(html => {
    //                 document.getElementById("hidden-tasks").innerHTML = html;
    //                 document.getElementById("hiddenTasksContainer").style.display = "block";
    //             });
    //     }

    //     function showCompletedTasks() {
    //         // Hide hidden tasks container
    //         document.getElementById("hiddenTasksContainer").style.display = "none";

    //         // Set completedTask to red
    //         completedTaskDiv.style.backgroundColor = "#586871";
    //         completedTaskDiv.style.color = "#ffffff";

    //         // Reset hideTask to gray
    //         hideTaskDiv.style.backgroundColor = "#BDBCBD";
    //         hideTaskDiv.style.color = "#3E3E3E";

    //         // Load and display completed tasks
    //         fetch('@Url.Action("GetCompletedTasks")')
    //             .then(response => response.text())
    //             .then(html => {
    //                 document.getElementById("completed-tasks").innerHTML = html;
    //                 document.getElementById("completedTasksContainer").style.display = "block";
    //             });
    //     }

    //     function markAsComplete(taskId) {
    //         // Create the data object to send
    //         const data = { id: taskId };

    //         // Get the token
    //         const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

    //         fetch('@Url.Action("MarkAsComplete")', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'RequestVerificationToken': token,
    //                 'X-CSRF-TOKEN': token
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data.success) {
    //                 // Remove the task from the UI
    //                 const taskElement = document.querySelector(`.section[data-task-id="${taskId}"]`);
    //                 if (taskElement) {
    //                     taskElement.remove();
    //                 }

    //                 // Show notification
    //                 alert('Task marked as complete!');
    //             } else {
    //                 console.error('Error completing task:', data.message);
    //                 alert('Error completing task. Please check console for details.');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error completing task:', error);
    //             alert('Error completing task. Please check console for details.');
    //         });
    //     }

    //     function hideTask(taskId) {
    //         // Create the data object to send
    //         const data = { id: taskId };

    //         // Get the token
    //         const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

    //         fetch('@Url.Action("HideTask")', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'RequestVerificationToken': token,
    //                 'X-CSRF-TOKEN': token
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data.success) {
    //                 // Remove the task from the UI
    //                 const taskElement = document.querySelector(`.section[data-task-id="${taskId}"]`);
    //                 if (taskElement) {
    //                     taskElement.remove();
    //                 }

    //                 // Show notification
    //                 alert('Task hidden successfully!');
    //             } else {
    //                 console.error('Error hiding task:', data.message);
    //                 alert('Error hiding task. Please check console for details.');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error hiding task:', error);
    //             alert('Error hiding task. Please check console for details.');
    //         });
    //     }
        


    //     function showFilter() {
    //         const filterDropdown = document.querySelector("#sortFilterPanel"); 
    //         filterDropdown.style.display = filterDropdown.style.display === "block" ? "none" : "block";
    //     }




    //     // @* SELECT COLLECTED FILTERS *@

    //     // Function to initialize the filter functionality
    //     function initializeFilter() {
    //         // Get the apply button element
    //         const applyButton = document.querySelector('.apply-button');
            
    //         if (applyButton) {
    //             // Add click event listener to the Apply button
    //             applyButton.addEventListener('click', function() {
    //                 applyFilters();
    //             });
    //         }
    //     }

    //     // Function to apply filters
    //     function applyFilters() {

    //         // Get all checked priority checkboxes
    //         const priorityCheckboxes = document.querySelectorAll('.filter-group:nth-child(1) input[type="checkbox"]:checked');
            
    //         // Get all checked category checkboxes
    //         const categoryCheckboxes = document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]:checked');
            
    //         // Create arrays to store selected values
    //         const selectedPriorities = [];
    //         const selectedCategories = [];
            
    //         // Extract values from priority checkboxes
    //         priorityCheckboxes.forEach(checkbox => {
    //             selectedPriorities.push(checkbox.value);
    //         });
            
    //         // Extract values from category checkboxes
    //         categoryCheckboxes.forEach(checkbox => {
    //             selectedCategories.push(checkbox.value);
    //         });
        
    //         // Create filter data object
    //         const filterData = {
    //             Priorities: selectedPriorities,
    //             Categories: selectedCategories
    //         };
            
    //         console.log("Filter data:", filterData);
            
    //         // Get the token for CSRF protection
    //         const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
            
    //         // Send AJAX request to filter tasks
    //         fetch('@Url.Action("FilterTasks")', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'RequestVerificationToken': token
    //             },
    //             body: JSON.stringify(filterData)
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok: ' + response.status);
    //             }
    //             return response.text();
    //         })
    //     .then(html => {
    //         console.log("Received HTML response");
            
    //         // Update the task container with filtered tasks
    //         const taskContainer = document.getElementById('task-container');
    //         if (taskContainer) {
    //             taskContainer.innerHTML = html;
    //         } else {
    //             console.error("Task container element not found");
    //         }
            
    //         // Hide the filter panel after applying
    //         const filterPanel = document.getElementById('sortFilterPanel');
    //         if (filterPanel) {
    //             filterPanel.style.display = 'none';
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error filtering tasks:', error);
    //     });
    // }

    //     // Add a function to clear all filters
    //     function clearFilters() {
    //         // Uncheck all checkboxes
    //         const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    //         checkboxes.forEach(checkbox => {
    //             checkbox.checked = false;
    //         });
            
    //         // Load all tasks
    //         const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
            
    //         fetch('@Url.Action("FilterTasks")', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'RequestVerificationToken': token
    //             },
    //             body: JSON.stringify({ Priorities: [], Categories: [] })
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.text();
    //         })
    //         .then(html => {
    //             // Update the task container with all tasks
    //             document.getElementById('task-container').innerHTML = html;
                
    //             // Hide the filter panel
    //             document.getElementById('sortFilterPanel').style.display = 'none';
    //         })
    //         .catch(error => {
    //             console.error('Error clearing filters:', error);
    //         });
    //     }

    //     // Initialize the filter functionality when the page loads
    //     document.addEventListener('DOMContentLoaded', function() {
    //         initializeFilter();
    //     });

