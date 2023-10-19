import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../services/company.service";
import Company from "../../interfaces/company.interface";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyId: number;
  company: any;
  showToEditCompany = false;
  showToRemoveCompany = false;
  newName: string;
  newTimezone: string;
  newLanguage: string;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
    });
    this.getCompany();
  }

  getCompany() {
    this.companyService.getById(this.companyId).subscribe(
      data => {
        this.company = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  delete() {
    this.companyService.delete(this.companyId).subscribe(
      data => {
        console.log('Deletada com sucesso!');
        this.redirectTo('/companys');
      },
      error => {
        console.error(error);
      }
    )
  }

  updateCompany() {
    const newCompany = {
      name: this.newName,
      timezone: this.newTimezone,
      language: this.newLanguage
    }
    this.companyService.update(this.companyId, newCompany).subscribe(
      response => {
        console.log('Atualizado com sucesso');
        this.redirectTo('/companys');

      },
      error => {
        console.error(error);
      }
    );
  }

  openCloseToEditCompany() {
    this.showToEditCompany = !this.showToEditCompany;
  }

  openCloseToRemoveCompany() {
    this.showToRemoveCompany = !this.showToRemoveCompany;
  }

  redirectTo(route: string) {
    this.router.navigate([`${route}`])
  }

  getNewName(name: string) {
    this.newName = name;
  }

  getNewTimezone(timezone: string) {
    this.newTimezone = timezone;
  }

  getNewLanguage(language: string) {
    this.newLanguage = language;
  }
}
