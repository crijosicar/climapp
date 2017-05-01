import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { IPage } from '../interfaces/page.interface';
import { LoginComponent } from '../pages/login/login.component';
import { Nav, Platform } from 'ionic-angular';
import { RegisterComponent } from '../pages/register/register.component';
import { Splashscreen, StatusBar } from 'ionic-native';

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
            { title: 'Inicio', component: HomeComponent }
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