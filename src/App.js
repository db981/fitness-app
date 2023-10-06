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

  const addNewWorkout = (workoutName) => {
    let newWorkout = new Workout(workoutName);
    setWorkouts((prev) => [...prev, newWorkout]);
  }

  const renderWorkouts = () => {
    let sorted = workouts.sort((a, b) => {
      if(b.datapoints.length == 0){
        return 1;
      }
      else if(b.datapoints.length == 0){
        return -1;
      }
      else{
        return a[a.datapoints.length - 1][0] - b[b.datapoints.length - 1][0];
      }
    });
    let cards = [];
    for(const workout of sorted){
      cards.push(<WorkoutCard workout={workout} key={uuidv4()}></WorkoutCard>);
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
