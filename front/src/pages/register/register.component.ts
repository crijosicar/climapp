import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {Geolocation} from 'ionic-native';
import { AlertController } from 'ionic-angular';



import { TermsValidator } from '../../common/validators/termsValidator';
import { ICity } from '../../interfaces/city.interface';
import { IGender } from '../../interfaces/gender.interface';
import { RegisterService } from './register.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    termsAgree: boolean;
    errorMessage: string;
    myDate: String = new Date().toISOString();
    
    listCities: Array<ICity>;
    listGeneros: Array<IGender>;
    registerForm: FormGroup;

    constructor(private registerService: RegisterService, private alertCtrl: AlertController) {
        this.getAllCities();
        this.getAllGenders();
        this.termsAgree = false;
        this.registerForm = new FormGroup({
		name: new FormControl(null, Validators.required),
		lastname: new FormControl(null, Validators.required),
		email: new FormControl(null, Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])),
		phone: new FormControl(null, Validators.compose([
			Validators.pattern('^\\d+$'),
			Validators.required
		])),
                birthDate: new FormControl(this.myDate, Validators.required),
                actualCity:  new FormControl(null, Validators.required),
                bornCity:  new FormControl(null, Validators.required),
                state: new FormControl('A', Validators.required),
		gender: new FormControl('M', Validators.required),
		password: new FormControl(null, Validators.compose([
			Validators.minLength(6),
			Validators.required,
			Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
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
                console.log(listCities);
            },
            error => this.errorMessage = <any>error
            );
    }
    
    getAllGenders() {
        this.registerService.getAllGenders()
            .subscribe(
            listGeneros => {
                this.listGeneros = listGeneros;
                console.log(listGeneros);
            },
            error => this.errorMessage = <any>error
            );
    }
    
    getGeolocalization(){
        Geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            console.log(resp);
            this.showAlert(resp);
        }).catch((error) => {
            console.log('Error getting location', error);
        });

        let watch = Geolocation.watchPosition();
        watch.subscribe((data) => {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            this.showAlert(data);
            console.log(data);
        });
    }
    
    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Localizacion del dispositivo....',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    
    logForm() {
        console.log(this.registerForm.value)
    }
}