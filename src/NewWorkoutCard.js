import { useEffect, useState } from "react";
import BackArrow from "./images/back-arrow.svg";

function NewWorkoutCard(props) {
  const [formVisible, setFormVisible] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    let workoutName = e.target.querySelector("#workoutName").value;
    let datapointDate = new Date(e.target.querySelector("#datapointDate").value.replaceAll("-", "/"));
    let datapointValue = e.target.querySelector("#datapointValue").value;
    props.addNewWorkout(workoutName, [datapointDate, datapointValue]);
    setFormVisible(false);
  }

  const checkNameValidity = (e) => {
    if(props.workoutNameExists(e.target.value)){
      e.target.setCustomValidity("Workout already exists");
    }
    else{
      e.target.setCustomValidity("");
    }
    e.target.reportValidity();
  }

  return (
    <div className="newWorkoutCard">
      {formVisible ?
        <form className="newWorkoutForm" onSubmit={submitForm}>
          <span className="workoutCardTitle">
            <button onClick={() => setFormVisible(false)}>
              <img src={BackArrow} alt="Cancel add new workout"></img>
            </button>
            <h2>New Workout</h2>
          </span>
          <span className="formField">
            <label htmlFor="workoutName">Workout Name</label>
            <input type="text" id="workoutName" name="workoutName" maxLength={23} onInput={checkNameValidity} autoComplete="off" required></input>
          </span>
          <span className="formField">
            <label htmlFor="datapointDate">Datapoint Date</label>
            <input type="date" id="datapointDate" name="datapointDate" required></input>
          </span>
          <span className="formField">
            <label htmlFor="datapointValue">Datapoint Value</label>
            <input type="number" id="datapointValue" name="datapointValue" required></input>
          </span>
          <input type="submit" className="addDatapointButton" value="Save Workout"></input>
        </form>
        : <button className="newWorkoutButton" onClick={() => setFormVisible(true)}>+</button>
      }
    </div>
  )
}

export default NewWorkoutCard;
