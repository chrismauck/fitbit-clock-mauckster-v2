// © 2020 Chris Mauck
// Mauckster Clock

import document from "document";
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

const theme = true;
const primary = "#2F77D4";
const secondary = "#c7c7c7";

const themeIcons = document.getElementsByClassName("theme");
const digitalHours = document.getElementById("digitalHours");
const digitalMinutes = document.getElementById("digitalMinutes");


if (theme) {
  themeIcons.forEach(el => {
    el.style.fill = secondary;
  });
  digitalHours.style.fill = primary;
  digitalMinutes.style.fill = primary;
}

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
