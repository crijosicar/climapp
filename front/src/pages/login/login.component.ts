import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Nav, LoadingController, ToastController, NavController  } from 'ionic-angular';
import { Network } from 'ionic-native';
import { RegisterComponent } from '../register/register.component'; 
import { HomeComponent } from '../home/home.component'; 
import { IResponseUtil } from '../../interfaces/responseUtil.interface';
import { LoginService } from './login.service';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    
    @ViewChild(Nav) nav: Nav;
    loginForm: FormGroup;
    registerComponent: any = RegisterComponent;
    loginUserResponse: IResponseUtil;
    loader: any;
    errorMessage: string;
    homeComponent: any = HomeComponent;
    
    constructor(private toastCtrl: ToastController,
        private loginService: LoginService,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController) {
        this.verifyInternetConnection();
        this.loginForm = new FormGroup({
            usuario: new FormControl(null,[Validators.required]),
            contrasenia: new FormControl(null, Validators.required)
        });
    } 
   
    verifyInternetConnection() {
        if (Network.type === 'none') {
            this.makeToast("No tienes conexión a internet","bottom");
        }
    }
    
    presentLoading() {
        this.loader = this.loadingCtrl.create({
          content: "Espere.."
        });
        this.loader.present();
    }
    
    showToastMessage(message: any) {
        this.loader.dismiss();
        this.makeToast(message.message,"bottom");
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
        if (Network.type === 'none') {
            this.makeToast("No tienes conexión a internet","bottom");  
        } else {
            this.presentLoading();
            let formData = this.loginForm.value;
            let dataForm = {
                "id": null,
                "idPerson": null,
                "idUserAccess": null,
                "password": formData.contrasenia,
                "userName": formData.usuario
            };
            this.loginService.loginUser(dataForm).subscribe(
                loginUserResponse => {
                    this.loginUserResponse = loginUserResponse;
                    this.navCtrl.setRoot(this.homeComponent);
                    this.loader.dismiss();
                },
                error => { 
                    this.showToastMessage("Ops! Algo salio mal.","bottom");
                    this.errorMessage = <any>error
                }
            );
        }
    }
}
