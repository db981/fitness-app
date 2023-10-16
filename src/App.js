import WorkoutCard from "./WorkoutCard";
import NewWorkoutCard from "./NewWorkoutCard";
import Workout from "./Workout";
import DownloadIcon from "./images/download-icon.svg";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";

function App() {
  const[workouts, setWorkouts] = useState([]);
  const downloadRef = useRef(null);
  const uploadRef = useRef(null);

  useEffect(() => {
    let loaded = JSON.parse(localStorage.getItem("workouts"));
    if(loaded?.length){
      loadWorkouts(loaded);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const loadWorkouts = (loaded) => {
    for(let i = 0; i < loaded.length; i++){
      loaded[i].datapoints = loaded[i].datapoints.map(((datapoint) => [new Date(datapoint[0]), datapoint[1]]));
      loaded[i] = new Workout(loaded[i].name, loaded[i].datapoints);
    }
    setWorkouts(loaded);
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
    })
  }

  const deleteWorkout = (workoutName) => {
    if(window.confirm(`Are you sure you want to delete ${workoutName} data?`)){
      setWorkouts((prev) => {
        return prev.filter((workout) => workout.name != workoutName);
      })
    }
  }

  const downloadWorkouts = () => {
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

  const renderWorkouts = () => {
    let cards = [];
    for(const workout of workouts){
      cards.push(<WorkoutCard workout={workout} addNewDatapoint={addNewDatapoint} deleteWorkout={deleteWorkout} key={uuidv4()}></WorkoutCard>);
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
        {renderWorkouts()}
        <NewWorkoutCard addNewWorkout={addNewWorkout} workoutNameExists={workoutNameExists}></NewWorkoutCard>
      </div>
    </div>
  );
}

export default App;
