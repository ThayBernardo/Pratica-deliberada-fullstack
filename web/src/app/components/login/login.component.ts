import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  showInvalidEmail = false;
  showInvalidPassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    if(window.localStorage.getItem('email')) {
      this.router.navigate(['/documents']);
    }
  }

  getByEmail() {
    this.userService.getByEmail(this.email).subscribe(
      response => {
        console.log('E-mail encontrado')
        this.showInvalidEmail = false;
      },
      error => {
        console.error(error);
        this.showInvalidEmail = true;
      })
  }

  verifyPassword() {
    this.userService.verifyUserPassword(this.email, this.password).subscribe(
      response => {
        console.log('Senha válida');
        this.showInvalidPassword = false;
      },
      error => {
        console.error(error);
        this.showInvalidPassword = true;
      })
  }

  verifyValidAccount() {
    try {
      this.getByEmail();
      this.verifyPassword();
      window.localStorage.setItem('email', this.email);
      this.router.navigate(['/documents']);
    } catch (e) {
      console.log(e);
    }
  }

  redirectToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
