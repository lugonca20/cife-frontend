import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent {

  @Input() imagenes: string[] = [];
  @Input() alt: string = '';

  indiceActivo = 0;
  private touchStartX = 0;

  anterior(): void {
    this.indiceActivo = this.indiceActivo === 0
      ? this.imagenes.length - 1
      : this.indiceActivo - 1;
  }

  siguiente(): void {
    this.indiceActivo = (this.indiceActivo + 1) % this.imagenes.length;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = this.touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? this.siguiente() : this.anterior();
    }
  }
}
