import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() inputControl: string;
  @Input() typeInput: string;
  @Input() value: string;

  @Output() inputControlChange = new EventEmitter<string>();

  onInputChange(newValue: any) {
    this.inputControl = (newValue as HTMLTextAreaElement).value;
    this.inputControlChange.emit(this.inputControl);
  }
}
