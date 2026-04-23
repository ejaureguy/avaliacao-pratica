import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PessoaResponse } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private http = inject(HttpClient)
  private readonly API = environment.apiUrl

  listar(offset: number = 0) {
    return this.http.get<PessoaResponse>(`${this.API}?offset=${offset}`)
  }
}
