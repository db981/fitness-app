import { v4 as uuidv4 } from "uuid";
export default class Workout{
  constructor(name, datapoints){
    this.name = name;
    this.datapoints = datapoints;
    this.key = uuidv4();
  }

  addDatapoint(datapoint){
    this.datapoints.push(datapoint); //datapoint = [date, number/weight];
    this.datapoints = this.datapoints.sort((a, b) => a[0] - b[0]);
  }
}