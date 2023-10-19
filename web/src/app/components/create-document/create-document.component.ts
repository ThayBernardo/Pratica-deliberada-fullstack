import {Component} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {UserService} from "../../services/user.service";
import User from "../../interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent {
  name: string;
  date: string;
  showErrorNameMessage = false;
  showErrorDateMessage = false;
  document: any;
  me: User;
  email: string;

  constructor(
    private documentService: DocumentService,
    private userService: UserService,
    private router: Router
    ) {
    this.email = window.localStorage.getItem('email') ?? '';
    this.getMe();
  }

  getMe() {
    this.userService.getByEmail(this.email).subscribe(
      data => {
        this.me = data;
      },
      error => {
        console.error(error);
      })
  }

  createDocument() {
    this.document = {
      name: this.name,
      limit_date: this.date,
      company: 1,
      created_by: this.me.id,
    };

    if (!this.name) {
      this.showErrorNameMessage = true;
    } else if (!this.date) {
      this.showErrorDateMessage = true;
    } else {
      this.documentService.create(this.document).subscribe(
        response => {
          console.log('Criado')

        },
        error => {
          console.error(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/documents']);
  }
}
