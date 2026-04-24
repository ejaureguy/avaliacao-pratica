import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-form',
  imports: [ReactiveFormsModule],
  templateUrl: './select-form.html',
  styleUrl: './select-form.css',
})
export class SelectForm {
  label = input.required<string>()
  inputId = input.required<string>()
  selectPlaceholder = input.required<string>()
  options = input.required<string[]>()

  control = input.required<FormControl>()
}
