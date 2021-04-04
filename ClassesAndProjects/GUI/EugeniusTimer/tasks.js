var taskList = [];
var taskListSize = taskList.length;

//total number of subFields created, including deleted ones
var subFieldNum = 0;

function addSubField(id) {
  var test = document.getElementById(id);
  var newEl = document.createElement("div");
  newEl.setAttribute("class", "col-xs-12");

  newEl.innerHTML =
    "<div class='col-xs-5'>" +
      "<label for='subName" + subFieldNum + "'>Sub Task Name</label>" +
      "<input type='text' id='subName" + subFieldNum + "'" + "value='Sub Task Name'>" +
    "</div>" +

    "<div class='col-xs-5'>" +
      "<label for='subDesc" + subFieldNum + "'>Sub Task Description</label>" +
      "<input type='text' id='subDesc" + subFieldNum + "'" +
      "value='Sub Task Description'>" +
    "</div>" +
    "<i class='fas fa-trash-alt fa-3x col-xs-1 text-danger' onclick='removeSubField(this)'></i>";
    //"<button onclick='removeSubField(this)' class='col-xs-12 btn-danger' style='margin-bottom: 10px; margin-top: -20px;'>Remove Sub Task</button>";

  newEl.style.borderBottom = "1px solid #ccc";
  newEl.style.borderRadius = "4px";
  test.append(newEl);
  subFieldNum++;
}

function removeSubField(elementToRemove) {
  var parent = elementToRemove.parentElement;
  parent.remove();
}

function completeTaskCreation(submit) {
  var childElements = submit.children;
  var name = childElements[0].children[2].value;
  var desc = childElements[1].children[2].value;
  var subTaskObjects = [];
  var subTasks = childElements[2].children[2].children;
  var subTasksString = "";
  for (var i = 0; i < subTasks.length; i++) {
    subTaskObjects.push({
      name: subTasks[i].children[0].children[1].value,
      desc: subTasks[i].children[1].children[1].value,
    });

    subTasksString +=
      "<div>" +
        "<p class='col-xs-4'>" + subTaskObjects[i].name +"</p>" +
        "<p class='col-xs-8'>" + subTaskObjects[i].desc + "</p>" +
      "</div> <br><br>";
  }

  var newTask = createTask(name, desc, subTasksString);
  moveToUncomplete(newTask);

  //now that the task is completed and set in the right place we need to empty the form.
  submit.children[0].children[2].value = "New Task Title";
  submit.children[1].children[2].innerHTML =
    "Optionally provide a meaningful description.";
  subFieldNum = 0;
  submit.children[2].children[2].innerHTML = "";

  taskListSize++;
  taskList.push({ title: name, desc: desc, subTasks: subTaskObjects });
  // localStorage.setItem("taskList", JSON.stringify(taskList));
  // localStorage.setItem("taskListSize", taskList.length);
}

//the buttons need to be setup after the fact because the onclick needs to be changed, it's a pain but needs to be done this way
function createTask(name, desc, subTasksString) {
  var newEl = document.createElement("div");
  newEl.setAttribute("tasklistsize", taskListSize);
  newEl.setAttribute("class", "task");
  newEl.innerHTML =
    "<div class='topRow col-xs-12'>" +
      "<button type='button' " +
      "class='btn btn-info' " +
      "data-toggle='collapse' " +
      "data-target='#task" +
      taskListSize +
      "' onClick=rotateChevron('task" +
      taskListSize +
      "Chevron')>" +
      "<h4 class='taskTitle'>" +
      name +
      " &nbsp<span><i class='fas fa-chevron-right' id='task" +
      taskListSize +
      "Chevron'></i></span></h4>" +
      "</button>" +
      "<div class='taskOptions'> </div>" +
    "</div>" +

    "<div id='task" +
      taskListSize +
      "' class='collapse col-xs-12'>" +
      "<p>" +
      desc +
      "</p>" +
      "<ul>" +
      subTasksString +
      "</ul>" +
    "</div>";
  return newEl;
}

function moveToComplete(objectToMove) {
  document.getElementById("completedList").append(objectToMove);
  objectToMove.children[0].children[1].innerHTML =
    "<button type='button' class='btn-success' onclick='moveToUncomplete(this.parentElement.parentElement.parentElement)'>Uncomplete</button>" +
    "<button type='button' class='btn-danger' onclick='deleteTask(this.parentElement.parentElement.parentElement)'>Delete</button>";
}

function moveToUncomplete(objectToMove) {
  document.getElementById("taskList").append(objectToMove);
  objectToMove.children[0].children[1].innerHTML =
    "<button type='button' class='btn-success' onclick='moveToComplete(this.parentElement.parentElement.parentElement)'>Complete</button>" +
    "<button type='button' class='btn-danger' onclick='deleteTask(this.parentElement.parentElement.parentElement)'>Delete</button>";
}

function deleteTask(objectToDelete) {
  var tasks = document.getElementById("taskList");
  var complete = document.getElementById("completedList");
  var newList = [];
  var found = false;
  var index = -1;
  for (i = 0; i < taskList.length || !found; i++) {
    if (tasks.children[i] === objectToDelete || complete.children[i] === objectToDelete) {
      found = true;
      index = parseInt(objectToDelete.getAttribute("tasklistsize"));
      objectToDelete.remove();
    }
  }

  //console.log("newlist.length = " + newList.length);

  if(!found)
    console.log("error: the task you selected wasn't found");
  else
    for(var i = 0; i < taskList.length; i++)
      if(i != index)
        newList.push(taskList[i]);
  taskList = newList;
  console.log(taskList);
}
