import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccountComponent } from './create-account.component';
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

describe(`${CreateAccountComponent.name}`, () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  const createComponent = () => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests DOM', () => {
    it('(DOM) - Should show inputs when render component', () => {
      const inputEmail = fixture.debugElement.query(By.css('[data-cy="input-email"]')).nativeElement;
      const inputPassword = fixture.debugElement.query(By.css('[data-cy="input-password"]')).nativeElement;
      const inputConfirmPassword = fixture.debugElement.query(By.css('[data-cy="input-confirm-password"]')).nativeElement;

      expect(inputEmail).toBeTruthy();
      expect(inputPassword).toBeTruthy();
      expect(inputConfirmPassword).toBeTruthy();
    })

    it('(DOM) - Should show buttons when render component', () => {
      const btnBackToLogin = fixture.debugElement.query(By.css('[data-cy="btn-back"]')).nativeElement;
      const btnCreate = fixture.debugElement.query(By.css('[data-cy="btn-create"]')).nativeElement;

      expect(btnBackToLogin).toBeTruthy();
      expect(btnCreate).toBeTruthy();
    })
  })
});
