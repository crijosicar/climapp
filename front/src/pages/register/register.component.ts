import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Geolocation } from 'ionic-native';
import { AlertController, Nav } from 'ionic-angular';

import { TermsValidator } from '../../common/validators/termsValidator';
import { ICity } from '../../interfaces/city.interface';
import { IGender } from '../../interfaces/gender.interface';
import { RegisterService } from './register.service';
import { MONTHS_SHORT_NAMES, PATTERN_EMAIL, PHONE_NUMBER, PATTERN_PASSWORD } from '../../common/const-util';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    termsAgree: boolean;
    errorMessage: string;
    monthNames = MONTHS_SHORT_NAMES;

    listCities: Array<ICity>;
    listGeneros: Array<IGender>;
    registerForm: FormGroup;
    
    @ViewChild(Nav) nav: Nav;

    constructor(private registerService: RegisterService,
        private alertCtrl: AlertController) {
        this.getAllCities();
        this.getAllGenders();
        this.termsAgree = false;
        this.registerForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.compose([
                Validators.pattern(PATTERN_EMAIL),
                Validators.required
            ])),
            phone: new FormControl(null, Validators.compose([
                Validators.pattern(PHONE_NUMBER),
                Validators.required
            ])),
            birthDate: new FormControl(null, Validators.required),
            actualCity: new FormControl(null, Validators.required),
            bornCity: new FormControl(null, Validators.required),
            state: new FormControl('A', Validators.required),
            gender: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.compose([
                Validators.minLength(6),
                Validators.pattern(PATTERN_PASSWORD),
                Validators.required
            ])),
            confirmPassword: new FormControl(null, Validators.required),
            termsAgree: new FormControl(false, Validators.compose([
                Validators.required,
                TermsValidator.isValid
            ]))
        });
    }

    getAllCities() {
        this.registerService.getAllCities()
            .subscribe(
            listCities => {
                this.listCities = listCities;
            },
            error => this.errorMessage = <any>error
            );
    }

    getAllGenders() {
        this.registerService.getAllGenders()
            .subscribe(
            listGeneros => {
                this.listGeneros = listGeneros;
            },
            error => this.errorMessage = <any>error
            );
    }

    getGeolocalization() {
        Geolocation.getCurrentPosition().then((resp) => {
            this.showAlert(`Lat: ${resp.coords.latitude} - Lng: ${resp.coords.longitude}`);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    onDateChange(date: any) {
        console.log(date.substring(0, 4));
        date = new Date(date.substring(0, 4), date.substring(5, 6), date.substring(8, 9));
        //console.log(date);
    }

    showAlert(message: any) {
        let alert = this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['Aceptar']
        });
        alert.present();
    }

    logForm() {
        console.log(this.registerForm.value)
    }
}