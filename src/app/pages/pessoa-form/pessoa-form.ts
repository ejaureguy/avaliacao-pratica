import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormInput } from "../../components/form-input/form-input";
import { SelectForm } from "../../components/select-form/select-form";
import { CepService } from '../../services/cep.service';
import { confirmarSenhaValidator } from '../../validators/confirmar-senha.validator';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HomeIcon } from "../../components/icons/home-icon";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-pessoa-form',
  imports: [ReactiveFormsModule, FormInput, SelectForm, RouterLink, HomeIcon],
  templateUrl: './pessoa-form.html',
  styleUrl: './pessoa-form.css',
})
export class PessoaForm implements OnInit {
  private fb = inject(FormBuilder)
  private cepService = inject(CepService)
  private pessoaService = inject(PessoaService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  private toastService = inject(ToastService)
  
  modoEdicao = signal(false)
  cpfAtual = signal<string | null>(null)

  get isNovo() { return !this.cpfAtual() }
  get podeEditar() { return !this.isNovo && !this.modoEdicao() }
  
  // Controla o passo atual
  passoAtual = signal(1)
  
  form: FormGroup = this.fb.group({
    dadosPessoais: this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', [Validators.required, Validators.minLength(3)]],
      data_nasc: ['', [Validators.required]],
      mae: ['', [Validators.required]],
      pai: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    }),

    caracteristicas: this.fb.group({
      idade: ['', [Validators.required]],
      signo: ['', [Validators.required]],
      tipo_sanguineo: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      cor: ['', [Validators.required]],
    }),

    contato: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      telefone_fixo: [''],
    }),

    endereco: this.fb.group({
      cep: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    }),

    seguranca: this.fb.group({
      senha: ['', [Validators.required]],
      confirmaSenha: ['', [Validators.required]]
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
      return
    }

    this.isLoading.set(true)

    const { dadosPessoais, caracteristicas, contato, endereco, seguranca } = this.form.value
    const { confirmaSenha, ...segurancaSemConfirma } = seguranca ?? {}

    const payload: Pessoa = {
      ...dadosPessoais,
      cpf: this.cpfAtual() ?? dadosPessoais.cpf,
      ...caracteristicas,
      ...contato,
      ...endereco,
      ...segurancaSemConfirma,
    }

    const request$ = this.isNovo
      ? this.pessoaService.criar(payload)
      : this.pessoaService.atualizar(this.cpfAtual()!, payload)

    request$.subscribe({
      next: () => {
        this.isLoading.set(false)
        this.modoEdicao.set(false)
        this.form.disable()
        this.toastService.mostrar(`${this.isNovo ? 'Cadastro criado!' : 'Cadastro atualizado!'}`, 'sucesso')
        if (this.isNovo) this.router.navigate(['/'])
      },
      error: () => {
        this.isLoading.set(false)
        this.toastService.mostrar('Ocorreu um erro ao salvar.', 'erro')
      }
    })
  }

  ngOnInit() {
    const cpf = this.route.snapshot.paramMap.get('cpf')

    if (cpf) {
      this.cpfAtual.set(cpf)
      this.carregarPessoa(cpf)
    }
  }

  carregarPessoa(cpf: string) {
    this.isLoading.set(true)
    this.pessoaService.buscarPorCpf(cpf).subscribe({
      next: (pessoa) => {
        this.form.patchValue({
          dadosPessoais: {
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            rg: pessoa.rg,
            data_nasc: pessoa.data_nasc,
            mae: pessoa.mae,
            pai: pessoa.pai,
            sexo: pessoa.sexo,
          },
          caracteristicas: {
            idade: pessoa.idade,
            signo: pessoa.signo,
            tipo_sanguineo: pessoa.tipo_sanguineo,
            altura: pessoa.altura,
            peso: pessoa.peso,
            cor: pessoa.cor,
          },
          contato: {
            email: pessoa.email,
            celular: pessoa.celular,
            telefone_fixo: pessoa.telefone_fixo,
          },
          endereco: {
            cep: pessoa.cep,
            endereco: pessoa.endereco,
            numero: pessoa.numero,
            bairro: pessoa.bairro,
            cidade: pessoa.cidade,
            estado: pessoa.estado,
          }
        })
        this.form.disable()
        this.isLoading.set(false)
      },
      error: () => {
        this.isLoading.set(false)
        this.toastService.mostrar('Pessoa não encontrada.', 'erro')
        this.router.navigate(['/'])
      }
    })
  }

  ativarEdicao() {
    this.modoEdicao.set(true)
    this.form.enable()
    this.form.get('dadosPessoais.cpf')?.disable()
    this.form.get('seguranca.senha')?.disable()
    this.form.get('seguranca.confirmaSenha')?.disable()
  }

  cancelarEdicao() {
    this.modoEdicao.set(false)
    this.form.disable()
    this.carregarPessoa(this.cpfAtual()!)
  }
}
