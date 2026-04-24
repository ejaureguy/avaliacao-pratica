import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PessoaForm } from './pages/pessoa-form/pessoa-form';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'pessoas/criar',
    component: PessoaForm
  },
  {
    path: 'pessoas/:cpf',
    component: PessoaForm
  }
];
