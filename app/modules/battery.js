import document from "document";
import { battery } from "power";
import { charger } from "power";

export default class Battery {
  constructor() {
    this.batteryLabel = document.getElementById("battery-label");
    this.batteryHolder = document.getElementById("battery-holder");
    this.batteryPercentage = '...';
    this.isCharging = this.isCharging.bind(this);
  }

  drawBat() {
    this.isCharging();
  
    this.batteryPercentage = Math.floor(battery.chargeLevel);
    this.batteryLabel.text = `${this.batteryPercentage}%`;
  }

  isCharging() {
    this.batteryHolder.style.visibility = (charger.connected) ? "hidden" : "visible";
  }
}
