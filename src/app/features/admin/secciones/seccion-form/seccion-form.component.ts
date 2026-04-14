import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeccionService } from '../../../../core/services/seccion.service';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';

@Component({
  selector: 'app-seccion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ImageUploaderComponent],
  templateUrl: './seccion-form.component.html'
})
export class SeccionFormComponent implements OnInit {

  seccionActiva: 'quienes-somos' | 'por-que-cife' = 'quienes-somos';
  guardando = false;
  guardado = false;
  error = false;

  imagenesQuienesSomos: string[] = [];
  imagenesPorQueCife: string[] = [];

  formQuienesSomos: FormGroup;
  formPorQueCife: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seccionService: SeccionService
  ) {
    this.formQuienesSomos = this.fb.group({
      clave: ['quienes-somos'],
      titulo: [''],
      contenido: ['', Validators.required],
      imagenUrl: [''],
      imagenes: [[]]
    });

    this.formPorQueCife = this.fb.group({
      clave: ['por-que-cife'],
      titulo: [''],
      contenido: ['', Validators.required],
      imagenUrl: [''],
      imagenes: [[]]
    });
  }

  ngOnInit(): void {
    this.seccionService.obtener('quienes-somos').subscribe({
      next: s => {
        this.formQuienesSomos.patchValue(s);
        if (s.imagenes && s.imagenes.length > 0) {
          this.imagenesQuienesSomos = s.imagenes;
        } else if (s.imagenUrl) {
          this.imagenesQuienesSomos = [s.imagenUrl];
        }
      },
      error: () => {}
    });

    this.seccionService.obtener('por-que-cife').subscribe({
      next: s => {
        this.formPorQueCife.patchValue(s);
        if (s.imagenes && s.imagenes.length > 0) {
          this.imagenesPorQueCife = s.imagenes;
        } else if (s.imagenUrl) {
          this.imagenesPorQueCife = [s.imagenUrl];
        }
      },
      error: () => {}
    });
  }

  get formActivo(): FormGroup {
    return this.seccionActiva === 'quienes-somos'
      ? this.formQuienesSomos
      : this.formPorQueCife;
  }

  get imagenesActivas(): string[] {
    return this.seccionActiva === 'quienes-somos'
      ? this.imagenesQuienesSomos
      : this.imagenesPorQueCife;
  }

  onImagenesChange(urls: string[]): void {
    const url = urls.length > 0 ? urls[0] : '';
    if (this.seccionActiva === 'quienes-somos') {
      this.imagenesQuienesSomos = urls;
    } else {
      this.imagenesPorQueCife = urls;
    }
    this.formActivo.patchValue({ imagenUrl: url, imagenes: urls });
  }

  guardar(): void {
    if (this.formActivo.invalid) {
      this.formActivo.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.guardado = false;
    this.error = false;

    this.seccionService.guardar(this.formActivo.value).subscribe({
      next: () => {
        this.guardando = false;
        this.guardado = true;
        setTimeout(() => this.guardado = false, 3000);
      },
      error: () => {
        this.error = true;
        this.guardando = false;
      }
    });
  }

  cambiarSeccion(clave: 'quienes-somos' | 'por-que-cife'): void {
    this.seccionActiva = clave;
    this.guardado = false;
    this.error = false;
  }

  tieneError(campo: string): boolean {
    const control = this.formActivo.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}