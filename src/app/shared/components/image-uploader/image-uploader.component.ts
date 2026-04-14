import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../core/services/imagen.service';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html'
})
export class ImageUploaderComponent {

  @Input() imagenes: string[] = [];
  @Output() imagenesChange = new EventEmitter<string[]>();

  subiendo = false;
  error = '';

  constructor(private imagenService: ImagenService) {}

  seleccionar(event: Event): void {
    event.stopPropagation();
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const archivo = input.files[0];
    this.subiendo = true;
    this.error = '';

    this.imagenService.subir(archivo).subscribe({
      next: res => {
        const nuevas = [...this.imagenes, res.url];
        this.imagenesChange.emit(nuevas);
        this.subiendo = false;
        input.value = '';
      },
      error: () => {
        this.error = 'Error al subir la imagen. Verificá el formato y tamaño.';
        this.subiendo = false;
      }
    });
  }

  eliminar(event: Event, url: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.imagenService.eliminar(url).subscribe({
      next: () => {
        const nuevas = this.imagenes.filter(i => i !== url);
        this.imagenesChange.emit(nuevas);
      },
      error: () => {
        this.error = 'No se pudo eliminar la imagen.';
      }
    });
  }
}