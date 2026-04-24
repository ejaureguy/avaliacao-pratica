import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

type InputTypes = 'text' | 'email' | 'password'

@Component({
  selector: 'app-form-input',
  imports: [NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  label = input.required<string>()
  inputId = input.required<string>()
  inputType = input.required<InputTypes>()
  inputPlaceholder = input.required<string>()
  control = input.required<FormControl>()
  onBlur = output<void>()
  mask = input('')
}
