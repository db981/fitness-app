function NewWorkoutCard(props) {
  const submitForm = (e) => {
    e.preventDefault();
    let workoutName = e.target.querySelector("#workoutName").value;
    let datapointDate = new Date(e.target.querySelector("#datapointDate").value.replaceAll("-", "/"));
    let datapointValue = e.target.querySelector("#datapointValue").value;
    props.addNewWorkout(workoutName, [datapointDate, datapointValue]);
    e.target.reset();
  }

  const checkNameValidity = (e) => {
    if (props.workoutNameExists(e.target.value)) {
      e.target.setCustomValidity("Workout already exists");
    }
    else {
      e.target.setCustomValidity("");
    }
    e.target.reportValidity();
  }

  return (
    <div className="workoutCard">
      <span className="workoutCardTitle">
        <h2>New Workout</h2>
      </span>
      <form className="workoutForm" id="workoutForm" onSubmit={submitForm}>
        <span className="formField">
          <label htmlFor="workoutName">Name</label>
          <input type="text" id="workoutName" name="workoutName" maxLength={35} onInput={checkNameValidity} autoComplete="off" required></input>
        </span>
        <span className="formField">
          <label htmlFor="datapointDate">Date</label>
          <input type="date" id="datapointDate" name="datapointDate" required></input>
        </span>
        <span className="formField">
          <label htmlFor="datapointValue">Value</label>
          <input type="number" id="datapointValue" name="datapointValue" required></input>
        </span>
      </form>
      <button className="workoutBottomButton" form="workoutForm" type="submit">Save New Workout</button>
    </div>
  )
}

export default NewWorkoutCard;
