import { AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export class EmailValidator {
    static validateEmail(authService: AuthService) {
        return (control: AbstractControl) => {
            return authService.checkEmailNotTaken(control.value).pipe(
              map( (res: boolean) => res ? null : { emailTaken: true } )
            );
        };
    }
}
