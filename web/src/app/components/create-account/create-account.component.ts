import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserToCreate} from "../../interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  email: string;
  password: string;
  confirmPassword: string;
  showMessageErrorPassword = false;
  user: UserToCreate;

  constructor(private userService: UserService, private router: Router) {
  }

  createUser() {
    this.user = {
      email: this.email,
      password: this.password,
    };

    if (this.password !== this.confirmPassword) {
      this.showMessageErrorPassword = true;
    } else {
      this.showMessageErrorPassword = false;
      this.userService.create(this.user).subscribe(
        response => {
          console.log('Criado');
          this.router.navigate(['/documents']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
