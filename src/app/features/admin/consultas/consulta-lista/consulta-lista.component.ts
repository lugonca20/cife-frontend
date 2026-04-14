import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../../../../core/services/consulta.service';
import { Consulta } from '../../../../core/models/consulta.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-consulta-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, ConfirmDialogComponent],
  templateUrl: './consulta-lista.component.html'
})
export class ConsultaListaComponent implements OnInit {

  consultas: Consulta[] = [];
  cargando = true;
  filtro: 'TODAS' | 'SIN_LEER' | 'LEIDAS' = 'TODAS';
  dialogVisible = false;
  consultaAEliminar: Consulta | null = null;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.consultaService.listar().subscribe({
      next: consultas => {
        this.consultas = consultas.sort((a, b) =>
          new Date(b.fechaEnvio!).getTime() - new Date(a.fechaEnvio!).getTime()
        );
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  get consultasFiltradas(): Consulta[] {
    if (this.filtro === 'SIN_LEER') return this.consultas.filter(c => !c.leida);
    if (this.filtro === 'LEIDAS') return this.consultas.filter(c => c.leida);
    return this.consultas;
  }

  marcarLeida(consulta: Consulta): void {
    if (consulta.leida || !consulta.id) return;
    this.consultaService.marcarLeida(consulta.id).subscribe({
      next: () => consulta.leida = true
    });
  }

  confirmarEliminar(consulta: Consulta): void {
    this.consultaAEliminar = consulta;
    this.dialogVisible = true;
  }

  eliminar(): void {
    if (!this.consultaAEliminar?.id) return;
    this.consultaService.eliminar(this.consultaAEliminar.id).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.consultaAEliminar = null;
        this.cargar();
      }
    });
  }

  cancelar(): void {
    this.dialogVisible = false;
    this.consultaAEliminar = null;
  }

  get sinLeer(): number {
    return this.consultas.filter(c => !c.leida).length;
  }
}