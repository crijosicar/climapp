import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Nav, LoadingController, ToastController, NavController  } from 'ionic-angular';
import { Network } from 'ionic-native';
import { RegisterComponent } from '../register/register.component'; 
import { PasswordRecoveryComponent } from '../passwordRecovery/passwordRecovery.component'; 
import { HomeComponent } from '../home/home.component'; 
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { ILogin } from '../../interfaces/login.interface';
import { LoginService } from './login.service';
import { PATTERN_EMAIL } from '../../common/const-util';
import { NONE, NO_NETWORK_CONNECTION, TOP, CLOSE, OPS, WAIT } from '../../common/const-messages';

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
        userName: null
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

    makeToast(message: string, position: string){
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
            this.dataForm.userName = this.loginForm.value.usuario;
            this.loginService.loginUser(this.dataForm).subscribe(
                loginUserResponse => {
                    this.loader.dismiss();
                    this.loginUserResponse = loginUserResponse;
                    if(this.loginUserResponse.tipo !== 200){
                        this.makeToast(this.loginUserResponse.message, TOP);
                    }else{
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
