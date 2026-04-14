import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactoService } from '../../../../core/services/contacto.service';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contacto-form.component.html'
})
export class ContactoFormComponent implements OnInit {

  form: FormGroup;
  esEdicion = false;
  contactoId: number | null = null;
  guardando = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      tipo: ['EMAIL', Validators.required],
      valor: ['', Validators.required],
      etiqueta: [''],
      orden: [0]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.contactoId = Number(id);
      this.contactoService.listar().subscribe(contactos => {
        const contacto = contactos.find(c => c.id === this.contactoId);
        if (contacto) this.form.patchValue(contacto);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.error = false;
    const data = this.form.value;

    const operacion = this.esEdicion && this.contactoId
      ? this.contactoService.actualizar(this.contactoId, data)
      : this.contactoService.crear(data);

    operacion.subscribe({
      next: () => this.router.navigate(['/admin/contacto']),
      error: () => {
        this.error = true;
        this.guardando = false;
      }
    });
  }

  tieneError(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}