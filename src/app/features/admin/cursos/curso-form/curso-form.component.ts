import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CursoService } from '../../../../core/services/curso.service';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ImageUploaderComponent],  templateUrl: './curso-form.component.html'
})
export class CursoFormComponent implements OnInit {

  form: FormGroup;
  esEdicion = false;
  cursoId: number | null = null;
  guardando = false;
  error = false;
  imagenes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      objetivo: [''],
      requisitos: [''],
      fechaInicio: [''],
      horario: [''],
      frecuencia: [''],
      duracion: [''],
      modalidad: ['PRESENCIAL', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.cursoId = Number(id);
      this.cursoService.obtener(this.cursoId).subscribe(curso => {
        this.form.patchValue({
          ...curso,
          fechaInicio: curso.fechaInicio
            ? new Date(curso.fechaInicio).toISOString().split('T')[0]
            : ''
        });
        this.imagenes = curso.imagenes || [];
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
    const data = { ...this.form.value, imagenes: this.imagenes };    
    const operacion = this.esEdicion && this.cursoId
      ? this.cursoService.actualizar(this.cursoId, data)
      : this.cursoService.crear(data);

    operacion.subscribe({
      next: () => this.router.navigate(['/admin/cursos']),
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