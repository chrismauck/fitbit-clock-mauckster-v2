// © 2020 Chris Mauck
// Mauckster Clock

import { battery as powerBattery } from "power";
import { charger as powerCharger } from "power";
import { me as appbit } from "appbit";
import { display } from "display";
import Battery from "./modules/battery.js";
import Steps from "./modules/steps.js";
import State from "./modules/state.js";
import Clock from "./modules/clock.js";

const step = new Steps();
const battery = new Battery();
const state = new State();
const clock = new Clock();

powerBattery.onchange = (evt) => {
  battery.drawBat();
}

powerCharger.onchange = (evt) => {
  battery.isCharging();
}

/** @function
 *  @name appbit.onunload 
 *  When user closes app stop heart rate sensor
 */
appbit.onunload = () => {
  state.stopHR();
  console.log("App Stopped");
}

display.onchange = (evt) => {
  state.applyState();
}

clock.start();
state.init();
step.start();
// step.todayStuff();
