import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Geolocation } from 'ionic-native';
import { AlertController, Nav, LoadingController, ToastController } from 'ionic-angular';
import { TermsValidator } from '../../common/validators/termsValidator';
import { ICity } from '../../interfaces/city.interface';
import { IGender } from '../../interfaces/gender.interface';
import { IUser } from '../../interfaces/user.interface';
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { RegisterService } from './register.service';
import { MONTHS_SHORT_NAMES, PATTERN_EMAIL, PHONE_NUMBER, PATTERN_PASSWORD } from '../../common/const-util';
import * as moment from 'moment';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    termsAgree: boolean;
    errorMessage: string;
    monthNames = MONTHS_SHORT_NAMES;
    userDTO: IUser = {
        id: null,
        idPerson: null,
        idUserAccess: null,
        password: null,
        userName: null
    };
    saveNewResponse: IResponseUtil;
    listCities: Array<ICity>;
    listCitiesBorn: Array<ICity>;
    listGeneros: Array<IGender>;
    registerForm: FormGroup;
    loader: any;
    @ViewChild(Nav) nav: Nav;

    constructor(private registerService: RegisterService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {
        this.getAllCities();
        this.getAllGenders();
        this.termsAgree = false;
        this.registerForm = new FormGroup({
            id: new FormControl(null),
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
            idBornCity: new FormControl(null, Validators.required),
            idState: new FormControl(40),
            idGender: new FormControl(null, Validators.required),
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
                this.listCitiesBorn = listCities;
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

    showAlert(message: any) {
        let alert = this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['Aceptar']
        });
        alert.present();
    }

    sendForm() {
        this.presentLoading();
        let formData = this.registerForm.value;        
        this.userDTO.id = null;
        this.userDTO.idPerson = null;
        this.userDTO.idUserAccess = null;
        this.userDTO.password = formData.password;
        this.userDTO.userName = formData.email;      
        let year = formData.birthDate.substring(0, 4);
        let month = formData.birthDate.substring(5, 7);
        let day = formData.birthDate.substring(9, 10); 
        formData.birthDate =  moment(`${year}-${month}-${day}`).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        let dataForm = 
        {
            "birthDate": formData.birthDate,
            "email": formData.email,
            "id": formData.id,
            "idBornCity": Number(formData.idBornCity),
            "idGender": Number(formData.idGender),
            "idState": formData.idState,
            "lastname": formData.lastname,
            "listFrecuentCity": [
              Number(formData.actualCity)
            ],
            "name": formData.name,
            "phone": formData.phone,
            "userDTO": this.userDTO
        };
        
        this.registerService.registerNewUser(dataForm).subscribe(
            saveNewResponse => {
                this.saveNewResponse = saveNewResponse;
                let message ={
                 title: "",
                 message: this.saveNewResponse[0].message,
                 position: "bottom"
                }
                this.showToastMessage(message);
            },
            error =>{ 
                this.loader.dismiss();
                this.errorMessage = <any>error
                let message ={
                 title: "",
                 message: "Ops! Algo salio mal.",
                 position: "top"
                }
                this.showToastMessage(message);
            }
        );
    }
    
    presentLoading() {
        this.loader = this.loadingCtrl.create({
          content: "Espere.."
        });
        this.loader.present();
    }
    
    showToastMessage(message: any) {
        this.loader.dismiss();
        let toast = this.toastCtrl.create({
            message: message.message,
            duration: 6000,
            position: message.position,
            showCloseButton: true,
            closeButtonText: "Cerrar",
            dismissOnPageChange: false
        });
        toast.present();
    }
}