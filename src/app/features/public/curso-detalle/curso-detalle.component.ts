import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursoService } from '../../../core/services/curso.service';
import { Curso } from '../../../core/models/curso.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, CarouselComponent],
  templateUrl: './curso-detalle.component.html'
})
export class CursoDetalleComponent implements OnInit {

  curso: Curso | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cursoService.obtener(id).subscribe({
      next: curso => {
        this.curso = curso;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}
