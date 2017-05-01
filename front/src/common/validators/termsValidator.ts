<<<<<<< HEAD
import { FormControl } from '@angular/forms';

export class TermsValidator {
    static isValid(control: FormControl): any {

        if (control.value !== true) {
            return {
                "Debe aceptar los terminos y condiciones": true
            };
        }

        return null;
    }
=======
import { FormControl } from '@angular/forms';
 
export class TermsValidator {
    static isValid(control: FormControl): any {
        if(control.value !== true){
            return {
                "Debe aceptar los terminos y condiciones": true
            };
        }
        return null;
    }
>>>>>>> d405f5f0deef5a662efd8fbc0822751364744c34
}