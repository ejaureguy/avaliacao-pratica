import { Component, inject, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RouterLink } from "@angular/router";
import { ModalExcluir } from "../modal-excluir/modal-excluir";
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-table-menu',
  imports: [DialogModule, RouterLink, ModalExcluir],
  templateUrl: './table-menu.html',
  styleUrl: './table-menu.css',
})
export class TableMenu {
  private pessoaService = inject(PessoaService)

  pessoaCpf = input.required<string>()
  aoFechar = output<void>()
  isOpen: boolean = false
  carregarDados = output<void>()

  fecharMenu() {
    this.aoFechar.emit()
  }

  abrirModal() {
    this.isOpen = true
  }

  fecharModal() {
    this.isOpen = false
  }
  confirmarExclusao() {
    this.pessoaService.excluir(this.pessoaCpf()).subscribe({
      next: () => {
        this.fecharModal()
        this.carregarDados.emit()
      }
    })
  }
}
