
var reader;

function loadValues(){
    loadTaskList();
    console.log(taskList);
    setupTaskList();
    loadOptions();
}

function saveTaskList(taskListString){
    localStorage.setItem("taskList", taskListString);
}

function loadTaskList(){
    taskList = JSON.parse(localStorage.getItem("taskList"));
    if(taskList == null){
        taskList = [];
    }
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
        console.log(newTask);
        if(taskList[i].completed)
            moveToComplete(newTask);
        else
            moveToUncomplete(newTask);
        taskListSize++;
    }
}

function saveOptions(interval, breakInterval, soundPlay){
    localStorage.setItem("options", JSON.stringify({interval: interval, break: breakInterval, sound:soundPlay}));
    console.log(JSON.parse(localStorage.getItem("options")));
}

function loadOptions(){
    var temp = JSON.parse(localStorage.getItem("options"));
    if(temp != null){
        clock.interval = parseInt(temp.interval);
        document.getElementById("timer").innerHTML = "Next Break In:<br>" + millisecondsToMMSS(clock.interval);
        clock.breakInterval = parseInt(temp.break);
        soundOn = temp.sound;
        document.getElementById("soundToggle").checked = soundOn ? true : false;
    }
    console.log(temp);
}

function saveToJSON(){
    var output = JSON.stringify({interval:clock.interval, breakInterval:clock.breakInterval, sound:soundOn, taskList:taskList, forTimer:true});
    var download = document.createElement("a");
    var text = encodeURIComponent(output);
    download.setAttribute("download", "save.json");
    download.setAttribute("href", "data:application/octet-stream," + text);
    download.click();
}