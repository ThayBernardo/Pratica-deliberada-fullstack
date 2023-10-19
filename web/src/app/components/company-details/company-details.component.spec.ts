import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsComponent } from './company-details.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {companyMock} from "../../mocks/company.mock";
import {By} from "@angular/platform-browser";

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailsComponent ],
      imports: [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    component.company = companyMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show component to remove when showToRemoveCompany is true', () => {
      component.showToRemoveCompany = true;
      fixture.detectChanges();

      const appRemove = fixture.debugElement.query(By.css('[data-cy="app-remove"]')).nativeElement;
      expect(appRemove).toBeTruthy();
    })

    it('(DOM) - Should show component to edit when showToEditCompany is true', () => {
      component.showToEditCompany = true;
      fixture.detectChanges();

      const appEdit = fixture.debugElement.query(By.css('[data-cy="app-edit"]')).nativeElement;
      expect(appEdit).toBeTruthy();
    })

    it('(DOM) - Should show btn to back when render component', () => {
      const btnBack = fixture.debugElement.query(By.css('[data-cy="btn-back"]')).nativeElement;
      expect(btnBack).toBeTruthy();
    })

    it('(DOM) - Should show company name when render component', () => {
      component.company.name = 'Teste';
      fixture.detectChanges();

      const name = fixture.debugElement.query(By.css('[data-cy="name"]')).nativeElement;
      expect(name).toBeTruthy();
      expect(name.innerText).toEqual(component.company.name)
    })

    it('(DOM) - Should btn edit when render component', () => {
      const btnEdit = fixture.debugElement.query(By.css('[data-cy="btn-edit"]')).nativeElement;
      expect(btnEdit).toBeTruthy();
    })

    it('(DOM) - Should btn remove when render component', () => {
      const btnRemove = fixture.debugElement.query(By.css('[data-cy="btn-rmv"]')).nativeElement;
      expect(btnRemove).toBeTruthy();
    })
  });
});
