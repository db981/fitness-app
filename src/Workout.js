import { data } from "./WorkoutCard";

export default class Workout{
  constructor(name, datapoints = []){
    this.name = name;
    this.datapoints = datapoints;
  }

  addDatapoint(datapoint){
    this.datapoints.push(datapoint); //datapoint = [data, number/weight];
  }
}