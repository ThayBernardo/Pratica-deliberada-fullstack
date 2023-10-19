import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() icon: string;
  @Input() buttonText: string;
  @Input() disabled: boolean;
  @Input() typeButton: string;
}
