import { Component, inject, signal } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { TableMenu } from '../table-menu/table-menu';
import { Pessoa } from '../../models/pessoa.model';
import { TablePagination } from "../table-pagination/table-pagination";

@Component({
  selector: 'app-table-pessoas',
  imports: [TableMenu, TablePagination],
  templateUrl: './table-pessoas.html',
  styleUrl: './table-pessoas.css',
})
export class TablePessoas {
  private pessoaService = inject(PessoaService)
  
  pessoas = signal<Pessoa[]>([])
  loading = signal(false)

  paginaAtual = signal(1)
  itensPorPagina = 25
  temMaisPaginas = signal(true)

  ngOnInit() {
    this.carregarDados()
  }

  carregarDados() {
    this.loading.set(true)

    const offset = (this.paginaAtual() - 1) * this.itensPorPagina

    this.pessoaService.listar(offset).subscribe({
      next: (res) => {
        this.pessoas.set(res.items)
        this.temMaisPaginas.set(res.hasMore)
        this.loading.set(false)
      },
      error: () => this.loading.set(false)
    })
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '-'
    const partes = cpf.split('.')
    return `${partes[0]}.***.***\u200B-${cpf.split('-')[1]}`
  }

  menuAberto: string | null = null

  toggleMenu(cpf: string) {
    this.menuAberto = this.menuAberto === cpf ? null : cpf
  }
}
