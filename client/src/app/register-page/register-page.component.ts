import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/interfaces';
import { Router } from '@angular/router';
import { EmailValidator } from '../shared/validators/email.validator';
import { MaterializeService } from '../shared/services/materialize.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], [EmailValidator.validateEmail(this.authService)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.sub = this.authService.register(this.form.value).subscribe(
      (user: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      err => {
        MaterializeService.toast(err.error.message);
        this.form.enable();
      }
    );
  }

}
