import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovedadService } from '../../../core/services/novedad.service';
import { Novedad } from '../../../core/models/novedad.model';
import { NovedadCardComponent } from '../../../shared/components/novedad-card/novedad-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, NovedadCardComponent, LoadingSpinnerComponent],
  templateUrl: './novedades.component.html'
})
export class NovedadesComponent implements OnInit {

  novedades: Novedad[] = [];
  cargando = true;

  constructor(private novedadService: NovedadService) {}

  ngOnInit(): void {
    this.novedadService.listar().subscribe({
      next: novedades => {
        this.novedades = novedades;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}