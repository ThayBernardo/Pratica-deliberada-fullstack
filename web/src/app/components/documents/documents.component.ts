import {Component} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  email: string;
  documents: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
  ) {
    this.email = window.localStorage.getItem('email') ?? '';
    this.getMyDocuments();
  }

  getMyDocuments() {
    this.documentService.getDocumentsByUser(this.email).subscribe(
      data => {
        this.documents = data;
      },
      error => {
        console.error(error);
      })
  }

  redirectTo(route: string, id?: number) {
    if (id) {
      this.router.navigate([`${route}`, id])
    } else {
      this.router.navigate([`${route}`])
    }
  }
}
