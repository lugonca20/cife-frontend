import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../../core/services/curso.service';
import { Curso } from '../../../../core/models/curso.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-curso-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent, LoadingSpinnerComponent],
  templateUrl: './curso-lista.component.html'
})
export class CursoListaComponent implements OnInit {

  cursos: Curso[] = [];
  cargando = true;
  dialogVisible = false;
  cursoAEliminar: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.cursoService.listar().subscribe({
      next: cursos => {
        this.cursos = cursos;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  confirmarEliminar(curso: Curso): void {
    this.cursoAEliminar = curso;
    this.dialogVisible = true;
  }

  eliminar(): void {
    if (!this.cursoAEliminar?.id) return;
    this.cursoService.eliminar(this.cursoAEliminar.id).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.cursoAEliminar = null;
        this.cargar();
      }
    });
  }

  cancelar(): void {
    this.dialogVisible = false;
    this.cursoAEliminar = null;
  }
}