import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {By} from "@angular/platform-browser";

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests with DOM', () => {
    it('(DOM) - Should show title when render componente', () => {
      component.title = 'Teste';
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[data-cy="title"]')).nativeElement;
      expect(title).toBeTruthy();
      expect(title.innerText).toEqual(component.title)
    });

    it('(DOM) - Should show input when render componente', () => {
      const input = fixture.debugElement.query(By.css('[data-cy="input"]')).nativeElement;
      expect(input).toBeTruthy();
    });
  });
});
