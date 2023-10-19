import {Component, OnInit} from '@angular/core';
import Document from "../../interfaces/document.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentService} from "../../services/document.service";
import User from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documentId: number;
  doc: any;
  showToRemoveDoc = false;
  showToEditDoc = false;
  newName: string;
  newDate: string;
  email: string;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.documentId = params['id'];
    });
    this.email = window.localStorage.getItem('email') ?? '';
    this.getDocument();
  }

  getDocument() {
    this.documentService.getById(this.documentId).subscribe(
      data => {
        this.doc = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  updateDocument() {
    const newDoc = {
      name: this.newName,
      limit_date: this.newDate
    }
    this.documentService.update(this.doc.id, newDoc).subscribe(
      response => {
        console.log('Atualizado com sucesso');
        this.redirectTo('/documents');

      },
      error => {
        console.error(error);
      }
    );
  }

  delete() {
    this.documentService.delete(this.doc.id).subscribe(
      data => {
        console.log('Documento excluído com sucesso');
        this.redirectTo('/documents');
      },
      error => {
        console.error(error);
      }
    );
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`])
  }

  getName(name: string) {
    this.newName = name;
  }

  getDate(date: string) {
    this.newDate = date;
  }

  openCloseShowToRemoveDocument() {
    this.showToRemoveDoc = !this.showToRemoveDoc;
  }

  openCloseToEditDocument() {
    this.showToEditDoc = !this.showToEditDoc;
  }
}
