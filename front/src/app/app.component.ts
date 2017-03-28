import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginComponent } from '../pages/login/login.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    constructor(public platform: Platform) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleLightContent();
            Splashscreen.hide();
            this.nav.setRoot(LoginComponent);
        });
    }      
}



