import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentComponent } from './create-document.component';
import {HttpClientModule} from "@angular/common/http";
import {By} from "@angular/platform-browser";

describe('CreateDocumentComponent', () => {
  let component: CreateDocumentComponent;
  let fixture: ComponentFixture<CreateDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDocumentComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show inputs to create when render component', () => {
      const inputName = fixture.debugElement.query(By.css('[data-cy="input-name"]')).nativeElement;
      const inputDate = fixture.debugElement.query(By.css('[data-cy="input-date"]')).nativeElement;

      expect(inputName).toBeTruthy();
      expect(inputDate).toBeTruthy();
    });

    it('(DOM) - Should show btns to create and cancel when render component', () => {
      const btnCreate = fixture.debugElement.query(By.css('[data-cy="btn-create"]')).nativeElement;
      const btnCancel = fixture.debugElement.query(By.css('[data-cy="btn-cancel"]')).nativeElement;

      expect(btnCreate).toBeTruthy();
      expect(btnCancel).toBeTruthy();
    });
  })
});
