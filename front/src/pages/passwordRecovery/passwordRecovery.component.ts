import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Nav, LoadingController, ToastController, NavController  } from 'ionic-angular';
import { Network } from 'ionic-native';
import { LoginComponent } from '../login/login.component'; 
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { IPasswordRecovery } from '../../interfaces/passwordRecovery.interface';
import { PasswordRecoveryService } from './passwordRecovery.service';
import { PATTERN_EMAIL } from '../../common/const-util';
import { NONE, NO_NETWORK_CONNECTION, TOP, CLOSE, OPS, WAIT } from '../../common/const-messages';

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
            this.dataForm.email = this.passwordRecoveryForm.value.email;
            this.passwordRecoveryService.updatePasswordByMail(this.dataForm).subscribe(
                updatePasswordResponse => {
                    this.loader.dismiss();
                    this.updatePasswordResponse = updatePasswordResponse;
                    if(this.updatePasswordResponse.tipo !== 200){
                        this.makeToast(this.updatePasswordResponse.message, TOP);
                    }else{
                        this.makeToast(this.updatePasswordResponse.message, TOP);
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
