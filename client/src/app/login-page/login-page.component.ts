import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeService } from '../shared/services/materialize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe(
      (params: Params) => {
        // nasluchujemy queryParams
        if (params.registered) {
          // Now you can enter the system
          MaterializeService.toast('Now you can enter the system with your credentials.');
        } else if (params.accessDenied) {
          // you should be registered
          MaterializeService.toast('You should be register to enter the system.');
        } else if (params.sessionFailed) {
          // you should be registered
          MaterializeService.toast('Your session is ower, login again.');
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    // disable formu
    this.form.disable();

    this.sub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
      },
      (err) => {
        MaterializeService.toast(err.error.message);
        this.form.enable();
      }
    );
  }
}
