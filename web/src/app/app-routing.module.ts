import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAccountComponent} from "./components/create-account/create-account.component";
import {LoginComponent} from "./components/login/login.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {DocumentComponent} from "./components/document/document.component";
import {CreateDocumentComponent} from "./components/create-document/create-document.component";
import {MyCompanyComponent} from "./components/my-company/my-company.component";
import {CompanyDetailsComponent} from "./components/company-details/company-details.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: `detail-doc/:id`, component: DocumentComponent},
  {path: 'create-document', component: CreateDocumentComponent},
  {path: 'companys', component: MyCompanyComponent},
  {path: 'company-details/:id', component: CompanyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
