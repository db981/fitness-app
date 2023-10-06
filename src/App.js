import WorkoutCard from "./WorkoutCard";
import NewWorkoutCard from "./NewWorkoutCard";
import Workout from "./Workout";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function App() {
  const[workouts, setWorkouts] = useState([]);

  const workoutNameExists = (workoutName) => {
    for(const workout of workouts){
      if(workout.name === workoutName){
        return true;
      }
    }
    return false;
  }

  const addNewWorkout = (workoutName, initialDatapoint) => {
    let newWorkout = new Workout(workoutName, initialDatapoint);
    setWorkouts((prev) => [...prev, newWorkout]);
  }

  const addNewDatapoint = (workoutName, newDatapoint) => {
    setWorkouts((prev) => {
      for(let i = 0; i < prev.length; i++){
        if(prev[i].name == workoutName){
          prev[i].addDatapoint(newDatapoint);
        }
      }
      return prev;
    })
  }

  const renderWorkouts = () => {
    console.log("render");
    let sorted = workouts.sort((a, b) => {
      if(b.datapoints.length == 0){
        return 1;
      }
      else if(b.datapoints.length == 0){
        return -1;
      }
      else{
        return a.datapoints[a.datapoints.length - 1][0] - b.datapoints[b.datapoints.length - 1][0];
      }
    });
    let cards = [];
    for(const workout of sorted){
      cards.push(<WorkoutCard workout={workout} addNewDatapoint={addNewDatapoint} key={uuidv4()}></WorkoutCard>);
    }
    return cards;
  }

  return (
    <div className="app">
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div className="workoutCardArea">
        {renderWorkouts()}
        <NewWorkoutCard addNewWorkout={addNewWorkout} workoutNameExists={workoutNameExists}></NewWorkoutCard>
      </div>
    </div>
  );
}

export default App;
