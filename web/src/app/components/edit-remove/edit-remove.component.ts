import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as momentTimezone from "moment-timezone";

@Component({
  selector: 'app-edit-remove',
  templateUrl: './edit-remove.component.html',
  styleUrls: ['./edit-remove.component.scss']
})
export class EditRemoveComponent {
  @Output() confirmClick = new EventEmitter<void>();
  @Output() cancelRemove = new EventEmitter<void>();
  @Output() nameChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();
  @Output() timezoneChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();
  @Input() message: string;
  @Input() update: boolean;
  @Input() labelPrincipalBtn: string;
  @Input() itemToEdit: string = 'document';
  name: string;
  date: string;
  timezone: string;
  language: string;
  languages = ['Português', 'English', 'Español']
  timezones: string[];

  constructor() {
    this.timezones = this.getTimezoneOffsets();
  }

  onConfirmToClick() {
    this.nameChange.emit(this.name);
    this.dateChange.emit(this.date);
    this.languageChange.emit(this.language);
    this.timezoneChange.emit(this.timezone);
    this.confirmClick.emit();
  }

  onCancelRemove() {
    this.cancelRemove.emit();
  }

  getTimezoneOffsets(): string[] {
    const timezones = momentTimezone.tz.names();
    const offsetsSet = new Set<string>();

    for (const timezone of timezones) {
      const offset = momentTimezone.tz(timezone).format('Z');
      offsetsSet.add(offset);
    }

    return Array.from(offsetsSet);
  }
}
