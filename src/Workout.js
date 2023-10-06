export default class Workout{
  constructor(name, datapoints){
    this.name = name;
    this.datapoints = datapoints;
  }

  addDatapoint(datapoint){
    this.datapoints.push(datapoint); //datapoint = [date, number/weight];
    this.datapoints = this.datapoints.sort((a, b) => a[0] - b[0]);
  }
}