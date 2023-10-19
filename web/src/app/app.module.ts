import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DocumentsComponent} from './components/documents/documents.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {LoginComponent} from './components/login/login.component';
import {InputComponent} from './components/input/input.component';
import {ButtonComponent} from './components/button/button.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DocumentComponent} from './components/document/document.component';
import {CreateDocumentComponent} from './components/create-document/create-document.component';
import {MyCompanyComponent} from './components/my-company/my-company.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {EditRemoveComponent} from './components/edit-remove/edit-remove.component';
import {CompanyDetailsComponent} from './components/company-details/company-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    CreateAccountComponent,
    LoginComponent,
    InputComponent,
    ButtonComponent,
    DocumentComponent,
    CreateDocumentComponent,
    MyCompanyComponent,
    EditRemoveComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
