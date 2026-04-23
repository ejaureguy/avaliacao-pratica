import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-table-menu',
  imports: [],
  templateUrl: './table-menu.html',
  styleUrl: './table-menu.css',
})
export class TableMenu {
  pessoaCpf = input<string>()
  aoFechar = output<void>()

  fecharMenu() {
    this.aoFechar.emit()
  }

  verDetalhes(pessoa: any) {
    this.fecharMenu()
  }

  excluir(pessoa: any) {
    
    this.fecharMenu()
  }
}
