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
import { useEffect, useRef, useState } from 'react';
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
    },
  },
};

function WorkoutCard(props) {
  const [chartData, setChartData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [draggingOffset, setDraggingOffset] = useState(null);
  const card = useRef(null);

  useEffect(() => { //generate data object for Line chart component
    if (props.workout?.datapoints.length) {
      let labels = props.workout.datapoints.map((datapoint) => {
        return (`${datapoint[0].getDate()}/${datapoint[0].getMonth() + 1}/${datapoint[0].getFullYear()}`);
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

  const submitForm = (e) => { //create new datapoint
    e.preventDefault();
    let datapointDate = new Date(e.target.querySelector("#datapointDate").value.replaceAll("-", "/"));
    let datapointValue = e.target.querySelector("#datapointValue").value;
    props.addNewDatapoint(props.workout.name, [datapointDate, datapointValue]);
    setShowForm(false);
  }

  const startDraggingCard = (e) => {
    let offsetX = card.current.offsetLeft - e.clientX;
    let offsetY = card.current.offsetTop - e.clientY;
    card.current.style.position = "absolute";
    card.current.style.zIndex = "99";
    card.current.style.left = e.clientX + offsetX + "px";
    card.current.style.top = e.clientY + offsetY + "px";
    setDraggingOffset([offsetX, offsetY]);
  }

  const stopDraggingCard = (e) => {
    card.current.style.position = "relative";
    card.current.style.zIndex = "1";
    card.current.style.left = null;
    card.current.style.top = null;
    setDraggingOffset(null);
  }

  const dragCard = (e) => {
    if (!draggingOffset) {
      return;
    }
    card.current.style.left = e.clientX + draggingOffset[0] + "px";
    card.current.style.top = e.clientY + draggingOffset[1] + "px";
  }

  return (
    <div className="workoutCard">
      <span className="workoutTitle">
        <h2>{props.workout.name}</h2>
        <img src={DeleteIcon} className="workoutDelete" onClick={(e) => props.deleteWorkout(props.workout.name)}></img>
      </span>
      <div className="cardMiddle">
        <form className={showForm ? "datapointForm formVisible" : "datapointForm formInvisible"} onSubmit={submitForm}>
          <span className="formField">
            <label htmlFor="datapointDate">Date</label>
            <input type="date" id="datapointDate" name="datapointDate" required></input>
          </span>
          <span className="formField">
            <label htmlFor="datapointValue">Value</label>
            <input type="number" id="datapointValue" name="datapointValue" required></input>
          </span>
          <button className="formSaveButton" type="submit"><img src={CheckMark}></img></button>
        </form>
        {chartData ? <Line options={options} data={chartData} /> : null}
      </div>
      <button className="workoutBottomButton" onClick={() => setShowForm(!showForm)}>Add Datapoint</button>
    </div>
  )
}

export default WorkoutCard;
