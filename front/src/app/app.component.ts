<<<<<<< HEAD
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



=======
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



>>>>>>> d405f5f0deef5a662efd8fbc0822751364744c34
