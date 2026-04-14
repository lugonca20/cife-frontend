import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NovedadService } from '../../../../core/services/novedad.service';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';

@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ImageUploaderComponent],  templateUrl: './novedad-form.component.html'
})
export class NovedadFormComponent implements OnInit {

  form: FormGroup;
  esEdicion = false;
  novedadId: number | null = null;
  guardando = false;
  error = false;
  imagenes: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private novedadService: NovedadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      subtitulo: [''],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.novedadId = Number(id);
      this.novedadService.obtener(this.novedadId).subscribe(novedad => {
        this.form.patchValue({
          titulo: novedad.titulo,
          subtitulo: novedad.subtitulo,
          descripcion: novedad.descripcion
        });
        this.imagenes = novedad.imagenes || [];
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
    
    const operacion = this.esEdicion && this.novedadId
      ? this.novedadService.actualizar(this.novedadId, data)
      : this.novedadService.crear(data);

    operacion.subscribe({
      next: () => this.router.navigate(['/admin/novedades']),
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