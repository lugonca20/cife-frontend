import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../core/services/curso.service';
import { NovedadService } from '../../../core/services/novedad.service';
import { SeccionService } from '../../../core/services/seccion.service';
import { ConsultaService } from '../../../core/services/consulta.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Curso } from '../../../core/models/curso.model';
import { Novedad } from '../../../core/models/novedad.model';
import { SeccionContenido } from '../../../core/models/seccion.model';
import { CursoCardComponent } from '../../../shared/components/curso-card/curso-card.component';
import { NovedadCardComponent } from '../../../shared/components/novedad-card/novedad-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    CursoCardComponent,
    NovedadCardComponent,
    LoadingSpinnerComponent,
    CarouselComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cursos: Curso[] = [];
  novedades: Novedad[] = [];
  porQueCife: SeccionContenido | null = null;
  cargandoCursos = true;
  cargandoNovedades = true;
  enviando = false;
  enviado = false;
  errorEnvio = false;
  imagenesPorQueCife: string[] = [];

  form: FormGroup;

  constructor(
    private cursoService: CursoService,
    private novedadService: NovedadService,
    private seccionService: SeccionService,
    private consultaService: ConsultaService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cursoService.listar().subscribe({
      next: cursos => {
        this.cursos = cursos.slice(0, 3);
        this.cargandoCursos = false;
      },
      error: () => this.cargandoCursos = false
    });

    this.novedadService.listar().subscribe({
      next: novedades => {
        this.novedades = novedades.slice(0, 3);
        this.cargandoNovedades = false;
      },
      error: () => this.cargandoNovedades = false
    });

    this.seccionService.obtener('por-que-cife').subscribe({
      next: s => {
        this.porQueCife = s;
        if (s.imagenes && s.imagenes.length > 0) {
          this.imagenesPorQueCife = s.imagenes;
        } else if (s.imagenUrl) {
          this.imagenesPorQueCife = [s.imagenUrl];
        }
      },
      error: () => {}
    });
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.consultaService.enviar(this.form.value).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form.reset();
      },
      error: () => {
        this.errorEnvio = true;
        this.enviando = false;
      }
    });
  }

  tieneError(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}