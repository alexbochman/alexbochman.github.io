
window.onload = function loadValues(){
    loadTaskList();
    console.log(taskList);
    setupTaskList();
}

function saveTaskList(taskListString){
    localStorage.setItem("taskList", taskListString);
}

function loadTaskList(){
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

function setupTaskList(){
    for(var i = 0; i < taskList.length; i++){
        var name = taskList[i].title;
        var desc = taskList[i].desc;
        var subTasks = taskList[i].subTasks;
        var subTasksString = "";
        for(var j = 0; j < subTasks.length; j++){
            subTasksString +=
                "<div>" +
                    "<p class='col-xs-4'>" + subTasks[j].name +"</p>" +
                    "<p class='col-xs-8'>" + subTasks[j].desc + "</p>" +
                "</div> <br><br>";
        }
        var newTask = createTask(name, desc, subTasksString);
        if(taskList[i].completed)
            moveToComplete(newTask);
        else
            moveToUncomplete(newTask);
        taskListSize++;
    }
}