var workTimerValue   = [33, 33];
var breakTimerValue  = [33, 33];
var onBreak = false;
var isRunning = false;
var soundOn = true;
var clock;

var states = {
    READY: 0,
    RUNNING: 1,
    PAUSED: 2,
    FINISHED: 3
}

const ALL_STATES = new Set([states.READY, states.RUNNING, states.PAUSED, states.FINISHED]);

function stateToString(state) {
    switch (state) {
        case states.READY:      return "Ready";
        case states.RUNNING:    return "Running";
        case states.PAUSED:     return "Paused";
        case states.FINISHED:   return "Finished";
        default:                return "unknown";
    }
}

class timer{
    interval;
    breakInterval;
    msLeft;
    timeOut = 0;
    secondInterval = 0;
    state = states.READY;
    fromPause = false;

    constructor(interval = ((workTimerValue[0] * 60) + workTimerValue[1]) * 1000,
                breakInterval = ((breakTimerValue[0] * 60) + breakTimerValue[1]) * 1000){
        this.interval = interval;
        this.breakInterval = breakInterval;
    }

    start = function(){
        if(onBreak)
            return false;

        if(!this.fromPause)
            this.msLeft = this.interval;
        else
            this.fromPause = false;

        document.getElementById("timer").innerHTML = "Next Break In:<br>" + millisecondsToMMSS(this.msLeft);

        let onTimeout = () => {
            this.reset();
            onBreak = true;
            document.getElementById("switchTimerButton").hidden = true;
            document.getElementById("resetTimerButton").hidden = true;
            document.getElementById("switchBreakButton").hidden = false;
            document.getElementById("skipBreakButton").hidden = false;
            this.startBreak();
        };

        let onInterval = () => {
            this.msLeft -= 1000;
            document.getElementById("timer").innerHTML = "Next Break In:<br>" + millisecondsToMMSS(this.msLeft);
        };

        this.timeOut = setTimeout(onTimeout, this.msLeft);
        this.secondInterval = setInterval(onInterval, 1000);
        this.state = states.RUNNING;
        isRunning = true;
    }

    startBreak = function(){
        playSound();
        if(!onBreak)
            return false;

        if(!this.fromPause)
            this.msLeft = this.breakInterval;
        else
            this.fromPause = false;

        document.getElementById("timer").innerHTML = "Break Ends In:<br>" + millisecondsToMMSS(this.msLeft);

        let onTimeout = () => {
            this.reset();
            onBreak = false;
            document.getElementById("switchTimerButton").hidden = false;
            document.getElementById("resetTimerButton").hidden = false;
            document.getElementById("switchBreakButton").hidden = true;
            document.getElementById("skipBreakButton").hidden = true;

            this.start();
        };

        let onInterval = () => {
            this.msLeft -= 1000;
            document.getElementById("timer").innerHTML = "Break Ends In:<br>" + millisecondsToMMSS(this.msLeft);
        };

        this.secondInterval = setInterval(onInterval, 1000);
        this.timeOut = setTimeout(onTimeout, this.msLeft);
        this.state = states.RUNNING;
        isRunning = true;
    }

    reset = function(){
        this.stop();
        this.fromPause = false;
        this.state = states.READY;
        document.getElementById("timer").innerHTML = "Next Break In:<br>" + millisecondsToMMSS(this.interval);
        onBreak = false;

    }

    stop = function(){
        clearTimeout(this.timeOut);
        clearInterval(this.secondInterval);

        this.timeOut = 0;
        this.secondInterval = 0;
        this.msLeft = 0;
        this.state = states.FINISHED;
        isRunning = false;
    }

    pause = function(){
        clearTimeout(this.timeOut);
        clearInterval(this.secondInterval);
        this.state = states.PAUSED;
        this.fromPause = true;
        isRunning = false;
    }
}

window.onload = function init(){
    clock = new timer(((workTimerValue[0] * 60) + workTimerValue[1]) * 1000);
    console.log(clock);
    document.getElementById("switchTimerButton").addEventListener("click", clickStart);
    document.getElementById("resetTimerButton").addEventListener("click", clickReset);
    document.getElementById("switchBreakButton").addEventListener("click", clickPause);
    document.getElementById("skipBreakButton").addEventListener("click", clickSkip);
}

function clickStart(){
    var button;
    if(!onBreak){
        button = document.getElementById("switchTimerButton");
        button.innerHTML = "Pause Timer";
    }
    else{
        button = document.getElementById("switchBreakButton");
        button.innerHTML = "Pause Break Timer";
    }
    button.removeEventListener("click", clickStart);
    button.addEventListener("click", clickPause);
    if(!onBreak)
        clock.start();
    else
        clock.startBreak();
}

function clickPause(){
    clock.pause();
    var button;
    if(!onBreak){
        button = document.getElementById("switchTimerButton");
        button.innerHTML = "Start Timer";
    }
    else{
        button = document.getElementById("switchBreakButton");
        button.innerHTML = "Start Break Timer";
    }
    button.removeEventListener("click", clickPause);
    button.addEventListener("click", clickStart);
}

function clickReset(){
    var wasRunning = isRunning;
    clock.reset();
    var button = document.getElementById("switchTimerButton");
    if(wasRunning){
        button.removeEventListener("click", clickPause);
        button.addEventListener("click", clickStart);
        button.innerHTML = "Start Timer";
    } else {
        button.addEventListener("click", clickStart);
    }
    document.getElementById("switchTimerButton").hidden = false;
    document.getElementById("resetTimerButton").hidden = false;
    document.getElementById("switchBreakButton").hidden = true;
    document.getElementById("skipBreakButton").hidden = true;
}

function clickSkip(){
    if(onBreak){
        clock.reset();
        onBreak = false;
        clickStart();
        document.getElementById("switchTimerButton").hidden = false;
        document.getElementById("resetTimerButton").hidden = false;
        document.getElementById("switchBreakButton").hidden = true;
        document.getElementById("skipBreakButton").hidden = true;
        document.getElementById("switchBreakButton").innerHTML = "Pause Break Timer";
        document.getElementById("switchBreakButton").removeEventListener("click", clickStart);
        document.getElementById("switchBreakButton").removeEventListener("click", clickPause);
        document.getElementById("switchBreakButton").addEventListener("click", clickPause);
    }
}

function setTimer(timerDef){
    var timerToChange = document.getElementById(timerDef + "TimerUpdate");
    var min = timerToChange.children[2].children[2];
    var sec = timerToChange.children[3].children[2];
    var fail = false;
    if(Number.isNaN(parseInt(min.value)) || parseInt(min.value) < 0){
        min.style.background = "red";
        fail = true;
    }

    if(Number.isNaN(parseInt(sec.value)) || parseInt(sec.value) > 59 || parseInt(sec.value) < 0){
        sec.style.background = "red";
        fail = true;
    }

    if(!fail){
        if(timerDef == "work"){
            workTimerValue = [parseInt(min.value), parseInt(sec.value)];
            clock.interval = ((workTimerValue[0] * 60) + workTimerValue[1]) * 1000;
            if(!onBreak){
                document.getElementById("timer").innerHTML = "Next Break In:<br>" + MinSectoMMSS(workTimerValue[0], workTimerValue[1]);
                isRunning = false;
                clock.reset();
            }
        } else {
            breakTimerValue = [parseInt(min.value), parseInt(sec.value)];
            clock.breakInterval = ((breakTimerValue[0] * 60) + breakTimerValue[1]) * 1000;
            if(onBreak){
                document.getElementById("timer").innerHTML = "Next Break In:<br>" + MinSectoMMSS(workTimerValue[0], workTimerValue[1]);
                isRunning = false;
                clock.reset();
            }
        }
        console.log(clock);
    }
}

function millisecondsToMMSS(milliseconds) {
    let totalSeconds = Math.round(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds - (minutes * 60));

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return minutes + ':' + seconds;
}

function MinSectoMMSS(minutes, seconds) {
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}

function playSound() {
    if(soundOn) {
        const audio = new Audio("../files/notification.mp3");
        audio.play();
    }
}

function toggleSwitch() {
    soundOn = soundOn ? false : true;
}