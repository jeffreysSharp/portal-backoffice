import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton, MatProgressBar, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ISigninForm } from 'app/shared/interfaces/isigin.interface';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { SessionName } from '../../../shared/enums/session.name.enum';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;

  signinForm: FormGroup;
  showLoading = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signinForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.required]],
        password: ['', [Validators.required, Validators.required]]
      }
    );
  }

  // signin() {
  //   const signinData = this.signupForm.value
  //   console.log(signinData);

  //   this.submitButton.disabled = true;
  //   this.progressBar.mode = 'indeterminate';
  // }


  onSubmit() {
    if (!this.signinForm.invalid) {

      this.submitButton.disabled = true;
      this.progressBar.mode = 'indeterminate';
      this.showLoading = false;
      console.log(this.signinForm.value);

      const signinData = this.signinForm.value as ISigninForm;

      signinData.email = `${signinData.email.split('@')[0]}@ativainvestimentos.com.br`;

      this.authService.signin({ usuario: signinData.email, senha: signinData.password }).subscribe(
        accessData => {
          localStorage.setItem(SessionName.name, JSON.stringify(accessData));
          this.router.navigate(['/cruds/ngx-table']);
          console.log('accessData', accessData);
        },
        (err: HttpErrorResponse) => {
          this.showLoading = true;
          this.submitButton.disabled = false;

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
