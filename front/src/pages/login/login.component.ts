import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { RegisterComponent } from '../register/register.component'; 

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    
    loginForm: FormGroup;
    registerComponent = RegisterComponent;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, 
                                        Validators.minLength(5), 
                                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                                        ]),
            contrasenia: new FormControl('', Validators.required)
        });
    } 
    
    logForm() {
        console.log(this.loginForm.value)
    }
}