import WorkoutCard from "./WorkoutCard";
import NewWorkoutCard from "./NewWorkoutCard";
import Workout from "./Workout";
import DownloadIcon from "./images/download-icon.svg";
import { useEffect, useState, useRef } from "react";

function App() {
  const[workouts, setWorkouts] = useState([]);
  const[workoutDates, setWorkoutDates] = useState({});
  const[selectedDate, setSelectedDate] = useState(null);
  const downloadRef = useRef(null);
  const uploadRef = useRef(null);

  useEffect(() => { //load workouts from localstorage on startup
    let loaded = JSON.parse(localStorage.getItem("workouts"));
    if(loaded?.length){
      loadWorkouts(loaded);
    }
  }, []);

  useEffect(() => { //save to localstorage whenever workouts are modified, update date list
    localStorage.setItem("workouts", JSON.stringify(workouts));
    loadWorkoutDates();
  }, [workouts]);

  const loadWorkouts = (loaded) => { //revive workout json as new workout objects to restore class functionality
    for(let i = 0; i < loaded.length; i++){
      loaded[i].datapoints = loaded[i].datapoints.map(((datapoint) => [new Date(datapoint[0]), datapoint[1]]));
      loaded[i] = new Workout(loaded[i].name, loaded[i].datapoints);
    }
    setWorkouts(loaded);
  }

  const loadWorkoutDates = () => { //generate object containing unique workout dates
    const dates = {};
    for(let i = 0; i < workouts.length; i++){
      for(const datapoint of workouts[i].datapoints){
        if(!dates[datapoint[0]]){
          dates[datapoint[0]] = [];
        }
        dates[datapoint[0]].push(workouts[i].name);
      }
    }
    setWorkoutDates(dates);
  }

  const workoutNameExists = (workoutName) => {
    for(const workout of workouts){
      if(workout.name === workoutName){
        return true;
      }
    }
    return false;
  }

  const addNewWorkout = (workoutName, initialDatapoint) => {
    let newWorkout = new Workout(workoutName, [initialDatapoint]);
    setWorkouts((prev) => [...prev, newWorkout]);
  }

  const addNewDatapoint = (workoutName, newDatapoint) => {
    setWorkouts((prev) => {
      return prev.map((workout) => {
        if(workout.name == workoutName){
          workout.addDatapoint(newDatapoint);
        }
        return workout;
      });
    });
  }

  const deleteWorkout = (workoutName) => {
    if(window.confirm(`Are you sure you want to delete ${workoutName} data?`)){
      setWorkouts((prev) => {
        return prev.filter((workout) => workout.name != workoutName);
      });
      if(workoutDates[selectedDate].includes(workoutName) && workoutDates[selectedDate].length == 1){ //if only workout on date, return to all workouts view
        changeWorkouts({target: {value: 'all'}});
      }
    }
  }

  const downloadWorkouts = () => { //download as local file
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workouts));
    downloadRef.current.setAttribute("href", dataStr);
    downloadRef.current.setAttribute("download", `fitness-app-save${new Date().toISOString().split('T')[0]}`);
    downloadRef.current.click();
  }

  const promptUpload = () => {
    uploadRef.current.click();
  }

  const handleUpload = () => {
    if(uploadRef.current.files.length){
      let file = uploadRef.current.files[0];
      if(!file.name.includes("fitness-app-save")){
        return;
      }
      let fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8');
      fileReader.onload = (e) => {
        let loaded = JSON.parse(e.target.result);
        if(loaded?.length){
          loadWorkouts(loaded);
        }
      }
    }
  }

  const changeWorkouts = (e) => { //change selected date to show workouts from
    if(e.target.value === 'all'){
      setSelectedDate(null);
    }
    else{
      setSelectedDate(e.target.value);
    }
  }

  const renderWorkoutDates = () => { //options for date select dropdown
    let dates = [];
    for(const date of Object.keys(workoutDates).sort((a, b) => new Date(b) - new Date(a))){
      dates.push(<option key={date} value={date}>{new Date(date).toISOString().slice(0, 10)}</option>)
    }
    return dates;
  }

  const renderWorkouts = () => {
    let cards = [];
    for(const workout of workouts){
      if(selectedDate == null || workoutDates[selectedDate]?.includes(workout.name)){
        cards.push(<WorkoutCard workout={workout} addNewDatapoint={addNewDatapoint} deleteWorkout={deleteWorkout} key={workout.key}></WorkoutCard>);
      }
    }
    return cards;
  }

  return (
    <div className="app">
      <header>
        <h1>Fitness Tracker</h1>
        <img src={DownloadIcon} className="downloadIcon" onClick={downloadWorkouts}></img>
        <img src={DownloadIcon} className="uploadIcon" onClick={promptUpload}></img>
        <a id="downloadAnchor" style={{display: "none"}} ref={downloadRef}></a>
        <input type="file" style={{display: "none"}} onChange={handleUpload} ref={uploadRef}></input>
      </header>
      <div className="workoutCardArea">
        <select className="workoutSelect" onChange={changeWorkouts}>
          <option value="all" defaultChecked>All Workouts</option>
          {renderWorkoutDates()}
        </select>
        {renderWorkouts()}
        <NewWorkoutCard addNewWorkout={addNewWorkout} workoutNameExists={workoutNameExists}></NewWorkoutCard>
      </div>
    </div>
  );
}

export default App;
