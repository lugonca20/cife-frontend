import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../../core/services/contacto.service';
import { ConsultaService } from '../../../core/services/consulta.service';
import { Contacto } from '../../../core/models/contacto.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit {

  contactos: Contacto[] = [];
  cargando = true;
  enviando = false;
  enviado = false;
  errorEnvio = false;

  form: FormGroup;

  constructor(
    private contactoService: ContactoService,
    private consultaService: ConsultaService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactoService.listar().subscribe({
      next: contactos => {
        this.contactos = contactos;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.consultaService.enviar(this.form.value).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset();
      },
      error: () => {
        this.errorEnvio = true;
        this.enviando = false;
      }
    });
  }

  tieneError(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  iconoPorTipo(tipo: string): string {
    const iconos: Record<string, string> = {
      TELEFONO: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 12 19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
      EMAIL: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
      DIRECCION: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0',
      RED_SOCIAL: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
    };
    return iconos[tipo] || iconos['EMAIL'];
  }
}