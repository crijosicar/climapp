import {
    CLOSE,
    NO_NETWORK_CONNECTION,
    NONE,
    OPS,
    TOP,
    WAIT
} from '../../common/const-messages';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { ILogin } from '../../interfaces/login.interface';
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import {
    LoadingController,
    Nav,
    NavController,
    ToastController
} from 'ionic-angular';
import { LoginService } from './login.service';
import { Network } from 'ionic-native';
import { PasswordRecoveryComponent } from '../passwordRecovery/passwordRecovery.component';
import { PATTERN_EMAIL } from '../../common/const-util';
import { RegisterComponent } from '../register/register.component';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    @ViewChild(Nav) nav: Nav;
    loginForm: FormGroup;
    registerComponent: any = RegisterComponent;
    passwordRecoveryComponent: any = PasswordRecoveryComponent;
    loginUserResponse: IResponseUtil;
    loader: any;
    errorMessage: string;
    homeComponent: any = HomeComponent;
    dataForm: ILogin = {
        id: null,
        idPerson: null,
        idUserAccess: null,
        password: null,
        user_name: null
    };

    constructor(private toastCtrl: ToastController,
        private loginService: LoginService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController) {
        if (Network.type === NONE) {
            this.makeToast(NO_NETWORK_CONNECTION, TOP);
        }
        this.loginForm = new FormGroup({
            usuario: new FormControl(null, Validators.compose([
                Validators.pattern(PATTERN_EMAIL),
                Validators.required
            ])),
            contrasenia: new FormControl(null, Validators.required)
        });
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

    sendForm() {
        this.presentLoading();
        if (Network.type === NONE) {
            this.loader.dismiss();
            this.makeToast(NO_NETWORK_CONNECTION, TOP);
        } else {
            this.dataForm.password = this.loginForm.value.contrasenia;
            this.dataForm.user_name = this.loginForm.value.usuario;
            this.loginService.loginUser(this.dataForm).subscribe(
                loginUserResponse => {
                    this.loader.dismiss();
                    this.loginUserResponse = loginUserResponse;
                    if (this.loginUserResponse.tipo !== 200) {
                        this.makeToast(this.loginUserResponse.message, TOP);
                    } else {
                        this.navCtrl.setRoot(this.homeComponent);
                    }
                },
                error => {
                    this.loader.dismiss();
                    this.errorMessage = <any>error
                    this.makeToast(OPS, TOP);
                }
            );
        }
    }
}