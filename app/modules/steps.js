import document from "document";
import { today, goals } from "user-activity";
import { me as appbit } from "appbit";
import * as util from "../../common/utils";

export default class Steps {

  constructor() {
    this.mySteps = document.getElementById("mySteps");
    this.stepHolder = document.getElementById("stepDiv");
    this.analogSteps = document.getElementById("analogSteps");
    this.myDistance = document.getElementById("myDistance");
    this.myFloors = document.getElementById("myFloors");
    this.root = document.getElementById('root');
    this.goalTypes = [ "steps", "distance", "elevationGain", "calories", "activeMinutes" ];
    this.myDay = {};
    this.interval = null;
    this.stepHolder.onclick = this.showGoalSteps.bind(this);
  }

  update() {
    const steps = today.adjusted.steps.toString();
    const goalCompletionNormal = today.adjusted.steps / goals.steps;
    const gaugeSweepAngle = util.mapNumber(goalCompletionNormal, 0, 1, 0, 360);
    this.mySteps.text = util.formatNumber(steps);
    this.analogSteps.text = util.formatNumber(steps);
    this.myDistance.text = util.formatMiles(today.adjusted.distance);
    this.myFloors.text = today.adjusted.elevationGain;
  }

  hide() {
    this.mySteps.style.opacity = 0;
  }

  show() {
    this.mySteps.style.opacity = 1;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
    this.show();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.hide();
  }

  showGoalSteps() {
    if (appbit.permissions.granted("access_activity")) {
        console.log(`${goals.steps} Step Goal`);
    }
  }

  todayStuff() {
    this.myDay.steps = util.formatNumber(today.adjusted.steps);
    this.myDay.distance = util.formatMiles(today.adjusted.distance);
    this.myDay.calories = util.formatNumber(today.adjusted.calories);
    this.myDay.floors = today.adjusted.elevationGain;
    this.myDay.active = today.adjusted.activeMinutes;
  
    for (let i=0; i < this.goalTypes.length; i++) {
      let goalType = goals[this.goalTypes[i]];
      console.log(goalType);
    }
  }
  
}
