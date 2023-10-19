import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

// ng test --include=**/login.component.spec.ts

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests DOM', () => {
    it('Should show inputs when render component', () => {
      const inputEmail = fixture.debugElement.query(By.css('[data-cy="input-email"]')).nativeElement;
      const inputPassword = fixture.debugElement.query(By.css('[data-cy="input-password"]')).nativeElement;

      expect(inputEmail).toBeTruthy();
      expect(inputPassword).toBeTruthy();
    })

    it('Should show button to login when render component', () => {
      const btnLogin = fixture.debugElement.query(By.css('[data-cy="btn-login"]')).nativeElement;
      expect(btnLogin).toBeTruthy();
    })

    it('Should show button to create account when render component', () => {
      const btnCreateAccount = fixture.debugElement.query(By.css('[data-cy="btn-create-account"]')).nativeElement;
      expect(btnCreateAccount).toBeTruthy();
    })

    it('Should show invalid email message when invalid email', () => {
      component.showInvalidEmail = true;
      fixture.detectChanges();

      const message = 'E-mail não encontrado, clique em cadastrar-se caso não possua uma conta.'

      const messageInvalidEmail = fixture.debugElement.query(By.css('[data-cy="invalid-email"]')).nativeElement;
      expect(messageInvalidEmail).toBeTruthy()
      expect(messageInvalidEmail.innerText).toEqual(message)
    })

    it('Should show invalid password message when invalid password', () => {
      component.showInvalidPassword = true;
      fixture.detectChanges();

      const message = 'Senha incorreta, por favor tente novamente.'

      const messageInvalidEmail = fixture.debugElement.query(By.css('[data-cy="invalid-password"]')).nativeElement;
      expect(messageInvalidEmail).toBeTruthy()
      expect(messageInvalidEmail.innerText).toEqual(message)
    })
  });
});
