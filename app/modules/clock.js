import document from "document";
import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../../common/utils";

export default class Clock {
  constructor() {
    // this.myTime = document.getElementById("myTime");
    this.myDate = document.getElementById("myDate");
    
    this.digitalHours = document.getElementById("digitalHours");
    this.digitalMinutes = document.getElementById("digitalMinutes");
    
    // this.digitalWeekDay = document.getElementById("digitalWeekDay");
    // this.digitalDayNumber = document.getElementById("digitalDayNumber");

    this.hourhand = document.getElementById("hourhand");
    this.minutehand = document.getElementById("minutehand");
    this.secondhand = document.getElementById("secondhand");
    this.outercenterdot = document.getElementById("outercenterdot");
    this.innercenterdot = document.getElementById("innercenterdot");
    
    this.digitalFace = document.getElementById("digitalFace");
    this.clockFace = document.getElementById("clockFace");
    
    this.digitalFace.onclick = this.goAnalog.bind(this);
    this.clockFace.onclick = this.goDitial.bind(this);
  }

  init() {
    clock.granularity = "seconds";

    clock.ontick = (evt) => {
      let tod = evt.date;
      let hours = tod.getHours();
      if (preferences.clockDisplay === "12h") {
        hours = hours % 12 || 12; // 12h format
      }
      hours = util.zeroPad(hours);
      
      let mins = util.zeroPad(tod.getMinutes());
      // this.myTime.text = `${hours}:${mins}`;
      this.myDate.text = `${util.getWeekday()} ${util.getDay()}`;
      this.digitalHours.text = hours;
      this.digitalMinutes.text = mins;
      // this.digitalWeekDay.text = util.getWeekday();
      // this.digitalDayNumber.text = util.getDay();
      
      this.hourhand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evt.date.getMinutes());
      this.minutehand.groupTransform.rotate.angle = (6 * evt.date.getMinutes()) + (0.1 * evt.date.getSeconds());
      this.secondhand.groupTransform.rotate.angle = (6 * evt.date.getSeconds());
    }
  }
  
  goDitial() {
    this.clockFace.style.display = "none";
    this.digitalFace.style.display = "inline";
  }
  
  goAnalog() {
    this.digitalFace.style.display = "none";
    this.clockFace.style.display = "inline";
  }

  start() {
    this.init();
  }
}