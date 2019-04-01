import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { getCurrentLocation } from "nativescript-geolocation";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    gpsCoordsText: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.gpsCoordsText = "N/A";
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getGps() {
        getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        }).then((loc) => {
            if (loc) {
                console.log("Current location is: " + loc);
                this.gpsCoordsText = `${loc.latitude}, ${loc.longitude}`;
            } else {
                this.gpsCoordsText = "Error.";
            }

        }, (e) => {
            console.log("Error: " + e.message);
            this.gpsCoordsText = "Error.";
        });

    }
}
