import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController  } from 'ionic-angular';
import { Network } from 'ionic-native';

import { RegisterComponent } from '../register/register.component'; 

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    
    loginForm: FormGroup;
    registerComponent = RegisterComponent;
    
    constructor(private toastCtrl: ToastController) {
        this.verifyInternetConnection();
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, 
                                        Validators.minLength(5), 
                                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                                        ]),
            contrasenia: new FormControl('', Validators.required)
        });
    } 
    
        
    verifyInternetConnection() {
        if (Network.type === 'none') {
            let toast = this.toastCtrl.create({
                message: 'No tienes conexión a internet!',
                duration: 3000,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: "Cerrar",
                dismissOnPageChange: false
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });
            
            toast.present();
        }
    }
    
    logForm() {
        console.log(this.loginForm.value)
    }
}