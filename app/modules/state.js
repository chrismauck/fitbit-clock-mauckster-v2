import document from "document";
import { display } from "display";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { today, goals } from "user-activity";
import * as util from "../../common/utils";

export default class State {
    constructor() {
        this.myHeart = document.getElementById("myHeart");
        this.myCals = document.getElementById("myCals");
        this.hrm = new HeartRateSensor();
        this.interval = null;
    }

    startHR() {
        if (HeartRateSensor) {
            this.hrm.addEventListener("reading", () => {
                this.myHeart.text = this.hrm.heartRate;
            });
            this.hrm.start();
        }
    }

    stopHR() {
        this.hrm.stop();
    }

    hideCals() {
        this.myCals.style.opacity = 0;
    }

    showCals() {
        this.myCals.style.opacity = 1;
    }

    startCals() {
        this.updateCals();
        this.interval = setInterval(() => this.updateCals(), 1000);
        this.showCals();
    }

    stopCals() {
        clearInterval(this.interval);
        this.interval = null;
        this.hideCals();
    }

    updateCals() {
        if (appbit.permissions.granted("access_activity")) {
            this.myCals.text = `${util.formatNumber(today.adjusted.calories)}`;
        }
    }

    applyState() {
        if (display.on) {
            this.hrm.start();
        } else {
            this.hrm.stop();
        }
    }

    init() {
        this.startHR();
        this.startCals();
    }
}