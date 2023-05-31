import React, { useState } from "react";
import "./StopWatch.css";
import Button from "./Button";

var interval = false,
    hours = 0,
    mins = 0,
    sec = 0,
    msec = 0;

function formatedTime(hour, mins, sec, msec) {
    var result = "";
    if (hour < 10) {
        result += "0" + hour;
    } else {
        result += hour;
    }
    result += " : ";
    if (mins < 10) {
        result += "0" + mins;
    } else {
        result += mins;
    }
    result += " : ";
    if (sec < 10) {
        result += "0" + sec;
    } else {
        result += sec;
    }
    result += " : ";
    if (msec < 10) {
        result += "0" + msec;
    } else {
        result += msec;
    }
    return result;
}

function startInterval(setTime) {
    interval = setInterval(() => {
        msec += 1;
        if (msec === 100) {
            sec += 1;
            msec = 0;
            if (sec === 60) {
                mins += 1;
                sec = 0;
                if (mins === 60) {
                    hours += 1;
                    mins = 0;
                }
            }
        }
        setTime(formatedTime(hours, mins, sec, msec));
    }, 10);
}

function stateChanger(isOk, setState) {
    setState(!isOk);
}

function StopWatch() {
    let [time, setTime] = useState("00 : 00 : 00 : 00");
    let [isStart, setStart] = useState(true);
    let [laps, setLap] = useState([]);

    function startTimer() {
        if (!interval) {
            interval = true;
            startInterval(setTime);
            stateChanger(isStart, setStart);
        }
    }
    function stopTimer() {
        stateChanger(isStart, setStart);
        clearInterval(interval);
        interval = false;
    }
    function resetTimer() {
        clearInterval(interval);
        interval = false;
        setTime("00 : 00 : 00 : 00");
        setLap([]);
        hours = mins = sec = msec = 0;
    }

    function addLap() {
        let lastLap = laps.at(0);
        let index = 1;
        if (lastLap){
            let { id } = lastLap;
            index = id+1;
        } 
        setLap((prev) => [
            {
                id: index,
                time: time,
            }, ...prev
        ]);
    }

    return (
        <div className="container">
            <div className="watch">
                <h1>Stopwatch</h1>
                <div id="timer">{time}</div>
                <div id="actions">
                    <Button
                        isVisible={isStart}
                        funcX={startTimer}
                        funcY={stopTimer}
                        names={{ x: "Start", y: "Stop" }}
                    ></Button>
                    <Button
                        isVisible={isStart}
                        funcX={resetTimer}
                        funcY={addLap}
                        names={{ x: "Reset", y: "Lap" }}
                    ></Button>
                </div>
            </div>
            <div id="laps">
                <ul id="lapList">
                    {laps.map((lap) => (
                        <li key={lap.id}><span key={lap.id}>{lap.id}.</span>  {lap.time}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StopWatch;
