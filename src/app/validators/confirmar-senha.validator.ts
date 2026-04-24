import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const confirmarSenhaValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const senha = form.get('senha')?.value
  const confirmaSenha = form.get('confirmaSenha')?.value

  if (senha && confirmaSenha && senha !== confirmaSenha) {
    form.get('confirmaSenha')?.setErrors({ senhasDiferentes: true })
    return { senhasDiferentes: true }
  }

  return null
}