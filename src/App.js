import WorkoutCard from "./WorkoutCard";
import NewWorkoutCard from "./NewWorkoutCard";
import Workout from "./Workout";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

function App() {
  const[workouts, setWorkouts] = useState([]);

  useEffect(() => {
    let loaded = JSON.parse(localStorage.getItem("workouts"));
    if(loaded?.length){
      for(let i = 0; i < loaded.length; i++){
        loaded[i].datapoints = loaded[i].datapoints.map(((datapoint) => [new Date(datapoint[0]), datapoint[1]]));
        loaded[i] = new Workout(loaded[i].name, loaded[i].datapoints);
      }
      setWorkouts(loaded);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

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
    setWorkouts((prev) => prev.filter((workout) => workout.name != workoutName));
  }

  const renderWorkouts = () => {
    let cards = [];
    for(const workout of workouts){
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
