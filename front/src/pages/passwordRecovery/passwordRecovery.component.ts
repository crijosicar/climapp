import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Nav, LoadingController, ToastController, NavController  } from 'ionic-angular';
import { Network } from 'ionic-native';
import { LoginComponent } from '../login/login.component'; 
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { IPasswordRecovery } from '../../interfaces/passwordRecovery.interface';
import { PasswordRecoveryService } from './passwordRecovery.service';
import { PATTERN_EMAIL } from '../../common/const-util';

@Component({
    selector: 'passwordRecovery',
    templateUrl: 'passwordRecovery.component.html'
})
export class PasswordRecoveryComponent {
    @ViewChild(Nav) nav: Nav;
    passwordRecoveryForm: FormGroup;
    loginComponent: any = LoginComponent;
    loader: any;
    errorMessage: string;
    dataForm: IPasswordRecovery = {
        email: null
    };
    updatePasswordResponse: IResponseUtil;
    
    constructor(private toastCtrl: ToastController,
        private passwordRecoveryService: PasswordRecoveryService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController) {
        this.passwordRecoveryForm = new FormGroup({
            email: new FormControl(null, Validators.compose([
                Validators.pattern(PATTERN_EMAIL),
                Validators.required
            ]))
        });
    } 

    presentLoading() {
        this.loader = this.loadingCtrl.create({
          content: "Espere..."
        });
        this.loader.present();
    }

    makeToast(message: string, position: string){
         let toast = this.toastCtrl.create({
            message: message,
            duration: 6000,
            position: position,
            showCloseButton: true,
            closeButtonText: "Cerrar",
            dismissOnPageChange: false
        });
        toast.present();
    }
    
    sendForm() { 
        this.presentLoading();
        if (Network.type === 'none') {
            this.loader.dismiss();
            this.makeToast("No tienes conexión a internet","top");
        } else {
            this.dataForm.email = this.passwordRecoveryForm.value.email;
            this.passwordRecoveryService.updatePasswordByMail(this.dataForm).subscribe(
                updatePasswordResponse => {
                    this.loader.dismiss();
                    this.updatePasswordResponse = updatePasswordResponse;
                    if(this.updatePasswordResponse.tipo !== 200){
                        this.makeToast(this.updatePasswordResponse.message,"top");
                    }else{
                        this.makeToast(this.updatePasswordResponse.message,"top");
                    }
                },
                error => {
                    this.loader.dismiss(); 
                    this.errorMessage = <any>error
                    this.makeToast("Ops! Algo salio mal.","top");
                }
            );
        }
    }
}
