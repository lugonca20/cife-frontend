import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curso } from '../../../core/models/curso.model';

@Component({
  selector: 'app-curso-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './curso-card.component.html'
})
export class CursoCardComponent {
  @Input() curso!: Curso;
}