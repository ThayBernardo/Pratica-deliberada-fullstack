import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentsComponent } from './documents.component';
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {documentMock} from "../../mocks/document.mock";

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    component.documents = [documentMock, documentMock];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show title when render component', () => {
      const title = fixture.debugElement.query(By.css('[data-cy="title"]')).nativeElement;
      expect(title).toBeTruthy();
      expect(title.innerText).toEqual('Documentos')
    });

    it('(DOM) - Should have the same number of containers when have documents.', () => {
      const containers = fixture.debugElement.queryAll(By.css('[data-cy="container-unit-doc"]'));
      expect(containers.length).toBe(2);
    });

    it('(DOM) - Should show correct ID document when render component', () => {
      component.documents[0].id = 1;
      fixture.detectChanges();

      const id = component.documents[0].id
      const message = `${id} ID`
      const idSpan = fixture.debugElement.query(By.css('[data-cy="id"]')).nativeElement;
      expect(idSpan).toBeTruthy();
      expect(idSpan.innerText).toEqual(message)
    });

    it('(DOM) - Should show correct name document when render component', () => {
      component.documents[0].name = 'Doc name teste';
      fixture.detectChanges();

      const name = component.documents[0].name
      const nameSpan = fixture.debugElement.query(By.css('[data-cy="name"]')).nativeElement;
      expect(nameSpan).toBeTruthy();
      expect(nameSpan.innerText).toEqual(name.toUpperCase())
    });

    it('(DOM) - Should show "Assinado" when status signed document is true', () => {
      component.documents[0].signed = true;
      fixture.detectChanges();

      const statusSpan = fixture.debugElement.query(By.css('[data-cy="signed"]')).nativeElement;
      expect(statusSpan).toBeTruthy();
    });

    it('(DOM) - Should show "Em curso" when status signed document is false', () => {
      component.documents[0].signed = false;
      fixture.detectChanges();

      const statusSpan = fixture.debugElement.query(By.css('[data-cy="ongoing"]')).nativeElement;
      expect(statusSpan).toBeTruthy();
    });
  });
});
