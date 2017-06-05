import * as moment from 'moment';
import {
    ACCEPT,
    CLOSE,
    NO_NETWORK_CONNECTION,
    NONE,
    OPS,
    TOP,
    WAIT
    } from '../../common/const-messages';
import {
    AlertController,
    LoadingController,
    Nav,
    NavController,
    ToastController
    } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation, Network } from 'ionic-native';
import { HomeComponent } from '../home/home.component';
import { ICity } from '../../interfaces/city.interface';
import { IGender } from '../../interfaces/gender.interface';
import { ILogin } from '../../interfaces/login.interface';
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import {
    MONTHS_SHORT_NAMES,
    PATTERN_EMAIL,
    PATTERN_PASSWORD,
    PHONE_NUMBER
    } from '../../common/const-util';
import { RegisterService } from './register.service';
import { TermsValidator } from '../../common/validators/termsValidator';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    termsAgree: boolean;
    errorMessage: string;
    monthNames = MONTHS_SHORT_NAMES;
    saveNewResponse: IResponseUtil;
    loginUserResponse: IResponseUtil;
    listCities: Array<Object>;
    listCitiesBorn: Array<Object>;
    listGeneros: Array<Object>;
    registerForm: FormGroup;
    loader: any;
    @ViewChild(Nav) nav: Nav;
    dataForm: ILogin = {
        id: null,
        idPerson: null,
        idUserAccess: null,
        password: null,
        user_name: null
    };
    homeComponent: any = HomeComponent;
    loginComponent: any = LoginComponent;

    constructor(private registerService: RegisterService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private loginService: LoginService,
        private navCtrl: NavController) {
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
            listResponse => {
                if(listResponse.tipo === 200){
                    this.listCities = listResponse.responseList;
                    this.listCitiesBorn = listResponse.responseList;
                } else {
                    this.listCities = new Array();
                    this.listCitiesBorn = new Array();
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    getAllGenders() {
        this.registerService.getAllGenders()
            .subscribe(
            listGeneros => {
                if(listGeneros.tipo === 200){
                    this.listGeneros = listGeneros.responseList;
                } else {
                    this.listGeneros = new Array();
                } 
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
            buttons: [ACCEPT]
        });
        alert.present();
    }

    sendForm() {
        this.presentLoading();
        let formData = this.registerForm.value;
        this.dataForm.password = formData.password;
        this.dataForm.user_name = formData.email;
        let year = formData.birthDate.substring(0, 4);
        let month = formData.birthDate.substring(5, 7);
        let day = formData.birthDate.substring(9, 10);
        formData.birthDate = moment(`${year}-${month}-${day}`).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        let formRegister = {
            "birthDate": formData.birthDate,
            "email": formData.email,
            "id": formData.id,
            "idBornCity": Number(formData.idBornCity),
            "idGender": Number(formData.idGender),
            "idState": formData.idState,
            "lastname": formData.lastname,
            "listFrecuentCity": [Number(formData.actualCity)],
            "name": formData.name,
            "phone": formData.phone,
            "userDTO": this.dataForm
        };
        this.registerService.registerNewUser(formRegister).subscribe(
            saveNewResponse => {
                this.loader.dismiss();
                this.saveNewResponse = saveNewResponse;
                if (this.saveNewResponse.tipo !== 200) {
                    this.makeToast(this.saveNewResponse.message, TOP);
                } else {
                    this.loginAfterRegister(formRegister);
                }
            },
            error => {
                this.errorMessage = <any>error
                this.loader.dismiss();
                this.makeToast(OPS, TOP);
            }
        );
    }

    loginAfterRegister(formData) {
        this.presentLoading();
        if (Network.type === NONE) {
            this.loader.dismiss();
            this.makeToast(NO_NETWORK_CONNECTION, TOP);
        } else {
            this.dataForm.password = formData.userDTO.password;
            this.dataForm.user_name = formData.userDTO.userName;
            this.loginService.loginUser(this.dataForm).subscribe(
                loginUserResponse => {
                    this.loginUserResponse = loginUserResponse;
                    this.loader.dismiss();
                    if (this.loginUserResponse.tipo !== 200) {
                        this.makeToast(this.loginUserResponse.message, TOP);
                    } else {
                        this.navCtrl.setRoot(this.homeComponent);
                    }
                },
                error => {
                    this.errorMessage = <any>error
                    this.loader.dismiss();
                    this.makeToast(OPS, TOP);
                }
            );
        }
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: WAIT
        });
        this.loader.present();
    }

    makeToast(message: string, position: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 6000,
            position: position,
            showCloseButton: true,
            closeButtonText: CLOSE,
            dismissOnPageChange: false
        });
        toast.present();
    }
}