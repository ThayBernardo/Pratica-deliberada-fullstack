import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompanyComponent } from './my-company.component';
import {companyMock} from "../../mocks/company.mock";
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

describe('MyCompanyComponent', () => {
  let component: MyCompanyComponent;
  let fixture: ComponentFixture<MyCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompanyComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompanyComponent);
    component = fixture.componentInstance;
    component.companys = [companyMock, companyMock]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should should show containers unit company length when has companys', () => {
      const containers = fixture.debugElement.queryAll(By.css('.unit-company'));
      expect(containers.length).toBe(2)
    })

    it('(DOM) - Should show corrected container infos when has companys', () => {
      const id = component.companys[0].id = 1;
      const name = component.companys[0].name = 'Teste nome';
      const language = component.companys[0].language = 'Português'
      const timezone = component.companys[0].timezone = '-03:00'
      fixture.detectChanges();

      const messageId = `ID ${id}`
      const messageName = `Nome: ${name}`
      const messageLanguage = `Linguagem: ${language}`
      const messageTimezone = `Timezone: ${timezone}`

      const idText = fixture.debugElement.query(By.css('[data-cy="id"]')).nativeElement;
      const nameText = fixture.debugElement.query(By.css('[data-cy="name"]')).nativeElement;
      const languageText = fixture.debugElement.query(By.css('[data-cy="language"]')).nativeElement;
      const timezoneText = fixture.debugElement.query(By.css('[data-cy="timezone"]')).nativeElement;

      expect(idText.innerText).toEqual(messageId)
      expect(nameText.innerText).toEqual(messageName)
      expect(languageText.innerText).toEqual(messageLanguage)
      expect(timezoneText.innerText).toEqual(messageTimezone)
    })

    it('Should show to create company when showToCreateCompany is true', () => {
      component.showToCreateCompany = true;
      fixture.detectChanges();

      const containerToCreateCompany = fixture.debugElement.query(By.css('[data-cy="container-create"]')).nativeElement;
      expect(containerToCreateCompany).toBeTruthy()
    })
  })
});
