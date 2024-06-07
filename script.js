let currentList = "all";
let tasks = [];

function doubleClickChange(taskDiv, task) {
  taskDiv.addEventListener("dblclick", (event) => {
    try {
      const currentTask = taskDiv.innerText;
      const inputElement = document.createElement("input");
      inputElement.classList.toggle("edit-task");
      inputElement.type = "text";
      inputElement.value = currentTask;
      taskDiv.innerText = "";
      taskDiv.appendChild(inputElement);
      inputElement.focus();

      inputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          const editedValue = inputElement.value;
          task.task = editedValue;
          render(tasks);
        }
      });
    } catch (error) {
      alert(error);
    }
  });
}

function render(tasks) {
  try {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    let data = tasks;

    data = tasks.filter((task) => {
      if (currentList === "all") {
        return true;
      } else if (currentList === "active") {
        return task.state == "incompleted";
      } else if (currentList === "completed") {
        return task.state == "completed";
      }
    });

    data.forEach((task) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("onChange", `changeState(${task.id})`);
      checkbox.checked = task.state == "completed";
      checkbox.classList.add("checkbox");

      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      doubleClickChange(taskDiv, task);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can");
      deleteIcon.setAttribute("onclick", `deleteTask(${task.id})`);

      taskDiv.innerText = task.task;

      cardDiv.appendChild(checkbox);
      cardDiv.appendChild(taskDiv);
      cardDiv.appendChild(deleteIcon);
      cardContainer.appendChild(cardDiv);
    });

    updateCount();
  } catch (error) {
    alert(error);
  }
}

function deleteTask(id) {
  try {
    tasks = tasks.filter((task) => task.id !== id);
    render(tasks);
  } catch (error) {
    alert(error);
  }
}

function deleteAllCompleted() {
  try {
    tasks = tasks.filter((task) => task.state !== "completed");
    render(tasks);
  } catch (error) {
    alert(error);
  }
}

function changeState(id) {
  try {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.state = task.state === "incompleted" ? "completed" : "incompleted";
      }
    });
    render(tasks);
  } catch (error) {
    alert(error);
  }
}

function updateCount() {
  try {
    const count = tasks.filter((task) => task.state === "incompleted").length;
    document.getElementById("count-item").innerText = `${count} items left`;
  } catch (error) {
    alert(error);
  }
}

function updateList(element, list) {
  try {
    currentList = list;
    document.getElementById('all-buttons').classList.remove('active');
    document.getElementById('active-button').classList.remove('active');
    document.getElementById('completed-button').classList.remove('active');

    element.classList.add('active');


    render(tasks);
  } catch (error) {
    alert(error);
  }
}

function toggleAllButtons() {
  try {
    const allButtons = tasks.every((task) => {
      if (currentList === "all") {
        return task.state == "completed";
      } else if (currentList === "active") {
        return task.state == "incompleted";
      } else if (currentList === "completed") {
        return task.state == "completed";
      }
    });

    tasks = tasks.map((task) => {
      if (currentList === "all") {
        task.state = allButtons ? "incompleted" : "completed";
      } else if (currentList === "active" && task.state === "incompleted") {
        task.state = "completed";
      } else if (currentList === "completed" && task.state === "completed") {
        task.state = "incompleted";
      }
      return task;
    });

    render(tasks);
  } catch (error) {
    alert(error);
  }
}

const input = document.getElementById("input-box");

input.addEventListener("keydown", (event) => {
  try {
    if (event.key === "Enter") {
      const inputText = input.value;
      if (inputText.trim() !== "") {
        let obj = {
          id: Date.now(),
          task: inputText,
          state: "incompleted",
        };
        tasks.push(obj);
        render(tasks);
        input.value = "";
      }
    }
  } catch (error) {
    alert(error);
  }
});
