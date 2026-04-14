import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionService } from '../../../core/services/seccion.service';
import { SeccionContenido } from '../../../core/models/seccion.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, CarouselComponent],
  templateUrl: './quienes-somos.component.html'
})
export class QuienesSomosComponent implements OnInit {

  seccion: SeccionContenido | null = null;
  cargando = true;
  imagenes: string[] = [];

  constructor(private seccionService: SeccionService) {}

  ngOnInit(): void {
    this.seccionService.obtener('quienes-somos').subscribe({
      next: seccion => {
        this.seccion = seccion;
        if (seccion.imagenes && seccion.imagenes.length > 0) {
          this.imagenes = seccion.imagenes;
        } else if (seccion.imagenUrl) {
          this.imagenes = [seccion.imagenUrl];
        }
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}
