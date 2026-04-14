import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactoService } from '../../../../core/services/contacto.service';
import { Contacto } from '../../../../core/models/contacto.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-contacto-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent, LoadingSpinnerComponent],
  templateUrl: './contacto-lista.component.html'
})
export class ContactoListaComponent implements OnInit {

  contactos: Contacto[] = [];
  cargando = true;
  dialogVisible = false;
  contactoAEliminar: Contacto | null = null;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.contactoService.listar().subscribe({
      next: contactos => {
        this.contactos = contactos;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  confirmarEliminar(contacto: Contacto): void {
    this.contactoAEliminar = contacto;
    this.dialogVisible = true;
  }

  eliminar(): void {
    if (!this.contactoAEliminar?.id) return;
    this.contactoService.eliminar(this.contactoAEliminar.id).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.contactoAEliminar = null;
        this.cargar();
      }
    });
  }

  cancelar(): void {
    this.dialogVisible = false;
    this.contactoAEliminar = null;
  }

  etiquetaTipo(tipo: string): string {
    const etiquetas: Record<string, string> = {
      TELEFONO: 'Teléfono',
      EMAIL: 'Email',
      DIRECCION: 'Dirección',
      RED_SOCIAL: 'Red social'
    };
    return etiquetas[tipo] || tipo;
  }
}