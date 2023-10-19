import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemoveComponent } from './edit-remove.component';
import {By} from "@angular/platform-browser";

describe('EditRemoveComponent', () => {
  let component: EditRemoveComponent;
  let fixture: ComponentFixture<EditRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show message when render component', () => {
      component.message = 'Teste'
      fixture.detectChanges();

      const message = fixture.debugElement.query(By.css('[data-cy="message"]')).nativeElement;
      expect(message).toBeTruthy();
      expect(message.innerText).toEqual(component.message.toUpperCase())
    })

    it('(DOM) - Should show button to remove when is not update', () => {
      component.update = false;
      fixture.detectChanges();

      const btnRmv = fixture.debugElement.query(By.css('[data-cy="btn-rmv"]')).nativeElement;
      expect(btnRmv).toBeTruthy();
    })

    it('(DOM) - Should not show button to remove when is update', () => {
      component.update = true;
      fixture.detectChanges();

      const btnRmv = fixture.debugElement.query(By.css('[data-cy="btn-rmv"]'));
      expect(btnRmv).toBeNull();
    })

    it('(DOM) - Should show container edit when is update', () => {
      component.update = true;
      fixture.detectChanges();

      const containerUpdate = fixture.debugElement.query(By.css('[data-cy="container-update"]')).nativeElement;
      expect(containerUpdate).toBeTruthy();
    })

    it('(DOM) - Should show input date when itemToEdit is document', () => {
      component.update = true;
      fixture.detectChanges();

      const inputDate = fixture.debugElement.query(By.css('[data-cy="date"]')).nativeElement;
      expect(inputDate).toBeTruthy();
    })

    it('(DOM) - Should not show input date when itemToEdit is not document', () => {
      component.update = true;
      component.itemToEdit = 'company'
      fixture.detectChanges();

      const inputDate = fixture.debugElement.query(By.css('[data-cy="date"]'));
      expect(inputDate).toBeNull();
    })

    it('(DOM) - Should show two mat-form-field when itemToEdit is not document', () => {
      component.update = true;
      component.itemToEdit = 'company'
      fixture.detectChanges();

      const matFormFields = fixture.debugElement.queryAll(By.css('mat-form-field'));
      expect(matFormFields.length).toBe(2);
    })

    it('(DOM) - Should show button to confirm update when is update', () => {
      component.update = true;
      fixture.detectChanges();

      const btnUpdate = fixture.debugElement.query(By.css('[data-cy="btn-confirm-update"]')).nativeElement;
      expect(btnUpdate).toBeTruthy();
    })

    it('(DOM) - Should show button to cancel when render component', () => {
      const btnCancel = fixture.debugElement.query(By.css('[data-cy="btn-cancel"]')).nativeElement;
      expect(btnCancel).toBeTruthy();
    })
  })
});
