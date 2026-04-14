import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../../core/services/curso.service';
import { Curso } from '../../../core/models/curso.model';
import { CursoCardComponent } from '../../../shared/components/curso-card/curso-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, CursoCardComponent, LoadingSpinnerComponent],
  templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];
  cargando = true;
  filtro: 'TODOS' | 'PRESENCIAL' | 'SEMI_PRESENCIAL' | 'VIRTUAL' = 'TODOS';

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listar().subscribe({
      next: cursos => {
        this.cursos = cursos;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  get cursosFiltrados(): Curso[] {
    if (this.filtro === 'TODOS') return this.cursos;
    return this.cursos.filter(c => c.modalidad === this.filtro);
  }
}