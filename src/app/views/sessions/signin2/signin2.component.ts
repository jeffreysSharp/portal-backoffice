import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ISigninForm } from 'app/shared/interfaces/isigin.interface';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { SessionName } from '../../../shared/enums/session.name.enum';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: password,
        agreed: [false, Validators.required]
      }
    );
  }


  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
      // this.router.navigateByUrl('/cruds/ngx-table');

      const signinData = this.signupForm.value as ISigninForm;

      signinData.email = `${signinData.email.split('@')[0]}@ativainvestimentos.com.br`;

      this.authService.signin({ usuario: signinData.email, senha: signinData.password }).subscribe(
        accessData => {
          localStorage.setItem(SessionName.name, JSON.stringify(accessData));
          this.router.navigate(['/cruds/ngx-table']);
        },
        (err: HttpErrorResponse) => {
          localStorage.removeItem(SessionName.name);

          if (err.status === 401) {
            this.snackBar.open('usuário e/ou senha inválidos', 'Ok');
          } else {
            this.snackBar.open('não foi possível efetuar o login', 'Ok');
            console.warn(`err: ${err.message}`);
          }
        }
      );
    }

  }
}
