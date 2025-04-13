import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-modal.component.html',
  standalone: true,
  styleUrl: './admin-modal.component.css'
})
export class AdminModalComponent {
  @Input() title = '';
  @Input() form!: FormGroup;
  @Input() formConfig: any[] = [];
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

}
