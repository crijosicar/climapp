import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { IPage } from '../interfaces/page.interface'; 

import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { Page2 } from '../pages/page2/page2';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginComponent;

    pages: Array<IPage>;

    constructor(public platform: Platform) {
        this.initializeApp();

        this.pages = [
            { title: 'Login', component: LoginComponent },
            { title: 'Register', component: RegisterComponent },
            { title: 'Home', component: HomeComponent },
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



