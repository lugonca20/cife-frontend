import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NovedadService } from '../../../core/services/novedad.service';
import { Novedad } from '../../../core/models/novedad.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-novedad-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, CarouselComponent],
  templateUrl: './novedad-detalle.component.html'
})
export class NovedadDetalleComponent implements OnInit {

  novedad: Novedad | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private novedadService: NovedadService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.novedadService.obtener(id).subscribe({
      next: novedad => {
        this.novedad = novedad;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}
