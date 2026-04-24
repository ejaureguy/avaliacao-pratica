import { Injectable, signal } from '@angular/core';

export interface Toast {
  mensagem: string;
  tipo: 'sucesso' | 'erro';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast | null>(null)

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
    this.toast.set({ mensagem, tipo })
    setTimeout(() => this.toast.set(null), 3000)
  }
}