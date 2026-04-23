import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pessoa, PessoaResponse } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  // Injeta o serviço para realizar as requisições
  private http = inject(HttpClient);

  // Recupera do environment a URL da API
  private readonly API = environment.apiUrl;

  // Lista todos as pessoas cadastradas
  listar(offset: number = 0) {
    return this.http.get<PessoaResponse>(`${this.API}?offset=${offset}`);
  }

  // Retorna a pessoa com o CPF passado como parâmetro
  buscarPorCpf(cpf: string) {
    return this.http.get<Pessoa>(`${this.API}${cpf}`);
  }

  // Cria um registro novo
  criar(pessoa: Pessoa) {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  // Atualiza a pessoa com o CPF passado como parâmetro
  atualizar(cpf: string, pessoa: Partial<Pessoa>) {
    return this.http.put<Pessoa>(`${this.API}${cpf}`, pessoa);
  }

  // Exclui a pessoa com o CPF passado como parâmetro
  excluir(cpf: string) {
    return this.http.delete(`${this.API}${cpf}`);
  }
}