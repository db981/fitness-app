import CheckMark from "./images/check.svg";
import DeleteIcon from "./images/delete.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y:
      {
        ticks: {
          stepSize: 5
        }
      }
  },
};

function WorkoutCard(props) {
  const [chartData, setChartData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (props.workout?.datapoints.length) {
      let labels = props.workout.datapoints.map((datapoint) => {
        return (`${datapoint[0].getDate()}/${datapoint[0].getMonth()}/${datapoint[0].getFullYear()}`);
      });
      let data = {
        labels,
        datasets: [
          {
            label: "Weights",
            data: props.workout.datapoints.map((datapoint) => datapoint[1]),
            borderColor: 'rgb(84, 84, 236)',
            backgroundColor: 'rgb(84, 84, 236)'
          }
        ]
      }
      setChartData(data);
    }
  }, [props.workout?.datapoints?.length]);

  const submitForm = (e) => {
    e.preventDefault();
    let datapointDate = new Date(e.target.querySelector("#datapointDate").value.replaceAll("-", "/"));
    let datapointValue = e.target.querySelector("#datapointValue").value;
    props.addNewDatapoint(props.workout.name, [datapointDate, datapointValue]);
    setShowForm(false);
  }

  return (
    <div className="workoutCard">
      <span className="workoutCardTitle">
        <h2>{props.workout.name}</h2>
        <img src={DeleteIcon} className="workoutDeleteButton" onClick={(e) => props.deleteWorkout(props.workout.name)}></img>
      </span>
      <form className={showForm ? "datapointForm formVisible" : "datapointForm formInvisible"} onSubmit={submitForm}>
        <span className="formField">
            <label htmlFor="datapointDate">Datapoint Date</label>
            <input type="date" id="datapointDate" name="datapointDate" required></input>
          </span>
        <span className="formField">
          <label htmlFor="datapointValue">Datapoint Value</label>
          <input type="number" id="datapointValue" name="datapointValue" required></input>
        </span>
        <button type="submit"><img src={CheckMark}></img></button>
      </form>
      {chartData ? <Line options={options} data={chartData} /> : null}
      <button className="addDatapointButton" onClick={() => setShowForm(!showForm)}>Add Datapoint</button>
    </div>
  )
}

export default WorkoutCard;
