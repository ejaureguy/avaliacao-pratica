import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormInput } from "../../components/form-input/form-input";
import { SelectForm } from "../../components/select-form/select-form";
import { CepService } from '../../services/cep.service';
import { confirmarSenhaValidator } from '../../validators/confirmar-senha.validator';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';

@Component({
  selector: 'app-pessoa-form',
  imports: [ReactiveFormsModule, FormInput, SelectForm],
  templateUrl: './pessoa-form.html',
  styleUrl: './pessoa-form.css',
})
export class PessoaForm {
  private fb = inject(FormBuilder)
  private cepService = inject(CepService)
  private pessoaService = inject(PessoaService)
  
  // Controla o passo atual
  passoAtual = signal(1);

  
  form: FormGroup = this.fb.group({
    dadosPessoais: this.fb.group({
      nome: ['João da Silva', [Validators.required, Validators.minLength(3)]],
      cpf: ['123.456.789-09', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['1234567', [Validators.required, Validators.minLength(3)]],
      data_nasc: ['01/01/1990', [Validators.required]],
      mae: ['Maria da Silva', [Validators.required]],
      pai: ['José da Silva', [Validators.required]],
      sexo: ['Masculino', [Validators.required]]
    }),

    caracteristicas: this.fb.group({
      idade: ['34', [Validators.required]],
      signo: ['Capricórnio', [Validators.required]],
      tipo_sanguineo: ['O+', [Validators.required]],
      altura: ['1,75', [Validators.required]],
      peso: ['70.00', [Validators.required]],
      cor: ['Branco', [Validators.required]],
    }),

    contato: this.fb.group({
      email: ['joao@email.com', [Validators.required, Validators.email]],
      celular: ['99999999999', [Validators.required]],
      telefone_fixo: [''],
    }),

    endereco: this.fb.group({
      cep: ['01310100', [Validators.required]],
      endereco: ['Avenida Paulista', [Validators.required]],
      numero: ['1000', [Validators.required]],
      bairro: ['Bela Vista', [Validators.required]],
      cidade: ['São Paulo', [Validators.required]],
      estado: ['SP', [Validators.required]],
    }),

    seguranca: this.fb.group({
      senha: ['minhasenha123', [Validators.required]],
      confirmaSenha: ['minhasenha123', [Validators.required]]
    }, { validators: confirmarSenhaValidator })
  })
  
  // Navegação
  nextStep() {
    this.passoAtual.update(s => s + 1);
  }
  
  prevStep() {
    this.passoAtual.update(s => s - 1);
  }
  
  pegarEndereco() {
    const cep = this.form.get('endereco.cep')?.value
    if (!cep) return
    
    this.cepService.buscarCep(cep).subscribe(endereco => {
      if (endereco.erro) {
        return
      }
      this.form.get('endereco')?.patchValue({
        endereco: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf,
      })
    })
  }

  isLoading = signal(false)
  
  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    this.isLoading.set(true)

    const { dadosPessoais, caracteristicas, contato, endereco, seguranca } = this.form.value
    const { confirmaSenha, ...segurancaSemConfirma } = seguranca

    const payload: Pessoa = {
      ...dadosPessoais,
      ...caracteristicas,
      ...contato,
      ...endereco,
      ...segurancaSemConfirma,
    }

    this.pessoaService.criar(payload).subscribe({
      next: (pessoa) => {
        this.isLoading.set(false)
        alert("Cadastro criado: " + pessoa.cpf)
      },
      error: () => {
        this.isLoading.set(false)
        alert("Ocorreu um erro ao cadastrar usuário")
      }
    })
  }
}
