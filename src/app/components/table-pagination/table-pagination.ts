import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  imports: [],
  templateUrl: './table-pagination.html',
  styleUrl: './table-pagination.css',
})
export class TablePagination {
  loading = input(false)

  paginaAtual = model(1)
  itensPorPagina = 25
  temMaisPaginas = model(true)

  carregar = output()

  proximaPagina() {
    if (this.temMaisPaginas()) {
      this.paginaAtual.update(p => p + 1)
      this.carregar.emit()
    }
  }

  paginaAnterior() {
    if (this.paginaAtual() > 1) {
      this.paginaAtual.update(p => p - 1)
      this.carregar.emit();
    }
  }
}
