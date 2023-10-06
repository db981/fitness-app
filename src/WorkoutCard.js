import CheckMark from "./images/check.svg";
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
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
/*
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
*/

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
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          }
        ]
      }
      setChartData(data);
    }
  }, [props.workout?.datapoints.length]);

  const submitForm = (e) => {
    e.preventDefault();
    let datapointDate = new Date(e.target.querySelector("#datapointDate").value);
    let datapointValue = e.target.querySelector("#datapointValue").value;
    props.addNewDatapoint(props.workout.name, [datapointDate, datapointValue]);
    setShowForm(false);
  }

  return (
    <div className="workoutCard">
      <span className="workoutCardTitle">
        <h2>{props.workout.name}</h2>
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
      <div className="workoutCardGraph">
        {chartData ? <Line data={chartData} /> : null}
      </div>
      <button className="addDatapointButton" onClick={() => setShowForm(!showForm)}>Add Datapoint</button>
    </div>
  )
}

export default WorkoutCard;
