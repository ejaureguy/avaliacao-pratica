import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

interface EnderecoResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private http = inject(HttpClient)

  cepApi = environment.cepApiUrl

  buscarCep(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '')
    return this.http.get<EnderecoResponse>(`${this.cepApi}/${cepLimpo}/json/`)
  }
}
