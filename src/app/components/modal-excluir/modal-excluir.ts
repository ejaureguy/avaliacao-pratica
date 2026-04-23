import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-excluir',
  imports: [],
  templateUrl: './modal-excluir.html',
  styleUrl: './modal-excluir.css',
})
export class ModalExcluir {
  titulo = input('Confirmar ação')
  mensagem = input('Tem certeza que deseja continuar?')

  confirmar = output<void>()
  cancelar = output<void>()
}
