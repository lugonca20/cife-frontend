import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NovedadService } from '../../../../core/services/novedad.service';
import { Novedad } from '../../../../core/models/novedad.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-novedad-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent, LoadingSpinnerComponent],
  templateUrl: './novedad-lista.component.html'
})
export class NovedadListaComponent implements OnInit {

  novedades: Novedad[] = [];
  cargando = true;
  dialogVisible = false;
  novedadAEliminar: Novedad | null = null;

  constructor(private novedadService: NovedadService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.novedadService.listar().subscribe({
      next: novedades => {
        this.novedades = novedades;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  confirmarEliminar(novedad: Novedad): void {
    this.novedadAEliminar = novedad;
    this.dialogVisible = true;
  }

  eliminar(): void {
    if (!this.novedadAEliminar?.id) return;
    this.novedadService.eliminar(this.novedadAEliminar.id).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.novedadAEliminar = null;
        this.cargar();
      }
    });
  }

  cancelar(): void {
    this.dialogVisible = false;
    this.novedadAEliminar = null;
  }
}