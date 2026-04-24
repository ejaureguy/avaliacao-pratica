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

  // Retorna o valor atual se ele não estiver na lista de options
  get valorForaDaLista(): string | null {
    const valor = this.control().value
    if (valor && !this.options().includes(valor)) {
      return valor
    }
    return null
  }
}
