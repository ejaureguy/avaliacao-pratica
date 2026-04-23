// Interface para Pessoa
export interface Pessoa {
  cpf: string;
  nome: string;
  data_nasc: string;
  mae: string;
  pai: string;
  email: string;
  rg: string;
  sexo: string;
  idade: string;
  signo: string;
  tipo_sanguineo: string;
  altura: string;
  peso: string;
  celular: string;
  telefone_fixo?: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  cor: string;
  senha?: string | null;
}

// Interface para a resposta paginada da API
export interface PessoaResponse {
  items: Pessoa[];
  hasMore: boolean;
  limit: number;
  offset: number;
  count: number;
  links: ApiLink[];
}

export interface ApiLink {
  rel: string;
  href: string;
}