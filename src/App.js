import WorkoutCard from "./WorkoutCard";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div className="workoutCardArea">
        <WorkoutCard></WorkoutCard>
        <WorkoutCard></WorkoutCard>
        <WorkoutCard></WorkoutCard>
        <WorkoutCard></WorkoutCard>
      </div>
    </div>
  );
}

export default App;
