import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Novedad } from '../../../core/models/novedad.model';

@Component({
  selector: 'app-novedad-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './novedad-card.component.html'
})
export class NovedadCardComponent {
  @Input() novedad!: Novedad;
}