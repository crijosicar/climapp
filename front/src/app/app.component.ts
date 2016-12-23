import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { Page2 } from '../pages/page2/page2';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginComponent;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform) {
        this.initializeApp();

        this.pages = [
            { title: 'Login', component: LoginComponent },
            { title: 'Page One', component: HomeComponent },
            { title: 'Page Two', component: Page2 }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleLightContent();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}



