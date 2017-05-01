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
import { IPasswordRecovery } from '../../interfaces/passwordRecovery.interface';
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import {
    LoadingController,
    Nav,
    NavController,
    ToastController
} from 'ionic-angular';
import { LoginComponent } from '../login/login.component';
import { Network } from 'ionic-native';
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
            this.dataForm.email = this.passwordRecoveryForm.value.email;
            this.passwordRecoveryService.updatePasswordByMail(this.dataForm).subscribe(
                updatePasswordResponse => {
                    this.loader.dismiss();
                    this.updatePasswordResponse = updatePasswordResponse;
                    if (this.updatePasswordResponse.tipo !== 200) {
                        this.makeToast(this.updatePasswordResponse.message, TOP);
                    } else {
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
