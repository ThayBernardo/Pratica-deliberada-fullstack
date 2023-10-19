import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import User from "../../interfaces/user.interface";
import * as momentTimezone from 'moment-timezone';
import {CompanyService} from "../../services/company.service";
import Company from "../../interfaces/company.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent {
  email: string;
  user: User;
  showToCreateCompany = false;
  name: string;
  timezones: string[];
  language: string;
  timezone: string;
  companys: any;

  languages = ['Português', 'English', 'Español']

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router,
  ) {
    this.email = window.localStorage.getItem('email') ?? '';
    this.getUserLogged();
    this.timezones = this.getTimezoneOffsets();
  }

  getUserLogged() {
    this.userService.getByEmail(this.email).subscribe(
      data => {
        this.user = data;
        this.getCompanys();
      },
      error => {
        console.error(error);
      }
    );
  }

  openCloseToCreateCompany() {
    this.showToCreateCompany = !this.showToCreateCompany;
  }

  getTimezoneOffsets(): string[] {
    const timezones = momentTimezone.tz.names();
    const offsetsSet = new Set<string>();

    for (const timezone of timezones) {
      const offset = momentTimezone.tz(timezone).format('Z');
      offsetsSet.add(offset);
    }

    return Array.from(offsetsSet);
  }

  createCompany() {
    const company = {
      name: this.name,
      language: this.language,
      timezone: this.timezone,
      created_by: this.user.id
    }

    this.companyService.create(company).subscribe(
      response => {
        console.log('Criado')
        this.getCompanys();
      },
      error => {
        console.error(error);
      }
    );
  }

  getCompanys() {
    this.companyService.getCompanysByUserId(this.user.id).subscribe(
      data => {
        this.companys = data;
      },
      error => {
        console.error(error);
      }
    )
  }

  deleteCompany(company_id: number | undefined) {
    if (company_id) {
      this.companyService.delete(company_id).subscribe(
        response => {
          console.log('Empresa removida com sucesso!');
          this.getCompanys();
        },
        error => {
          console.error(error);
        }
      )
    }
    return;
  }

  redirectTo(route: string, id?: number) {
    if (id) {
      this.router.navigate([`${route}`, id])
    } else {
      this.router.navigate([`${route}`])
    }
  }
}
