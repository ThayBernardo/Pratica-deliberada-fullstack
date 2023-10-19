import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentComponent } from './document.component';
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {documentMock} from "../../mocks/document.mock";

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentComponent ],
      imports: [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    component.doc = documentMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show document name when render component', () => {
      component.doc.name = 'Doc teste'
      fixture.detectChanges();

      const docNameSpan = fixture.debugElement.query(By.css('[data-cy="name"]')).nativeElement;
      expect(docNameSpan).toBeTruthy();
      expect(docNameSpan.innerText).toEqual(component.doc.name);
    });

    it('(DOM) - Should show four buttons when render component', () => {
      const btns = fixture.debugElement.queryAll(By.css('app-button'));
      expect(btns.length).toBe(4);
    });

    it('(DOM) - Should show modal when showToRemoveDoc is true', () => {
      component.showToRemoveDoc = true;
      fixture.detectChanges();

      const modal = fixture.debugElement.query(By.css('app-edit-remove')).nativeElement;
      expect(modal).toBeDefined();
    });
  });
});
