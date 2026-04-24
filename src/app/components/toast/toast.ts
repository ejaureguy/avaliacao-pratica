import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    @if (toastService.toast()) {
      <div class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-md text-white text-sm shadow-lg transition-all"
        [class]="toastService.toast()?.tipo === 'sucesso' ? 'bg-green-500' : 'bg-red-500'">
        {{ toastService.toast()?.mensagem }}
      </div>
    }
  `
})
export class Toast {
  toastService = inject(ToastService)
}