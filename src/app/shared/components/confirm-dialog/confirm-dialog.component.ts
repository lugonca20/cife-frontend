import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  @Input() mensaje = '¿Estás seguro de que querés realizar esta acción?';
  @Input() visible = false;
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();
}