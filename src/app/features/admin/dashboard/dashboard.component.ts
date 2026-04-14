import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CursoService } from '../../../core/services/curso.service';
import { NovedadService } from '../../../core/services/novedad.service';
import { ConsultaService } from '../../../core/services/consulta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  totalCursos = 0;
  totalNovedades = 0;
  totalConsultas = 0;
  consultasSinLeer = 0;
  cargando = true;

  constructor(
    private authService: AuthService,
    private cursoService: CursoService,
    private novedadService: NovedadService,
    private consultaService: ConsultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoService.listar().subscribe(cursos => {
      this.totalCursos = cursos.length;
    });

    this.novedadService.listar().subscribe(novedades => {
      this.totalNovedades = novedades.length;
    });

    this.consultaService.listar().subscribe(consultas => {
      this.totalConsultas = consultas.length;
      this.consultasSinLeer = consultas.filter(c => !c.leida).length;
      this.cargando = false;
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}