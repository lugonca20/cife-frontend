import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./features/public/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./features/public/cursos/cursos.component')
        .then(m => m.CursosComponent)
  },
  {
    path: 'cursos/:id',
    loadComponent: () =>
      import('./features/public/curso-detalle/curso-detalle.component')
        .then(m => m.CursoDetalleComponent)
  },
  {
    path: 'novedades',
    loadComponent: () =>
      import('./features/public/novedades/novedades.component')
        .then(m => m.NovedadesComponent)
  },
  {
    path: 'novedades/:id',
    loadComponent: () =>
      import('./features/public/novedad-detalle/novedad-detalle.component')
        .then(m => m.NovedadDetalleComponent)
  },
  {
    path: 'quienes-somos',
    loadComponent: () =>
      import('./features/public/quienes-somos/quienes-somos.component')
        .then(m => m.QuienesSomosComponent)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/public/contacto/contacto.component')
        .then(m => m.ContactoComponent)
  },

  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'cursos',
        loadComponent: () =>
          import('./features/admin/cursos/curso-lista/curso-lista.component')
            .then(m => m.CursoListaComponent)
      },
      {
        path: 'cursos/nuevo',
        loadComponent: () =>
          import('./features/admin/cursos/curso-form/curso-form.component')
            .then(m => m.CursoFormComponent)
      },
      {
        path: 'cursos/:id/editar',
        loadComponent: () =>
          import('./features/admin/cursos/curso-form/curso-form.component')
            .then(m => m.CursoFormComponent)
      },
      {
        path: 'novedades',
        loadComponent: () =>
          import('./features/admin/novedades/novedad-lista/novedad-lista.component')
            .then(m => m.NovedadListaComponent)
      },
      {
        path: 'novedades/nueva',
        loadComponent: () =>
          import('./features/admin/novedades/novedad-form/novedad-form.component')
            .then(m => m.NovedadFormComponent)
      },
      {
        path: 'novedades/:id/editar',
        loadComponent: () =>
          import('./features/admin/novedades/novedad-form/novedad-form.component')
            .then(m => m.NovedadFormComponent)
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./features/admin/contacto/contacto-lista/contacto-lista.component')
            .then(m => m.ContactoListaComponent)
      },
      {
        path: 'secciones',
        loadComponent: () =>
          import('./features/admin/secciones/seccion-form/seccion-form.component')
            .then(m => m.SeccionFormComponent)
      },
      {
        path: 'consultas',
        loadComponent: () =>
          import('./features/admin/consultas/consulta-lista/consulta-lista.component')
            .then(m => m.ConsultaListaComponent)
      },
      {
        path: 'contacto/nuevo',
        loadComponent: () =>
          import('./features/admin/contacto/contacto-form/contacto-form.component')
            .then(m => m.ContactoFormComponent)
      },
      {
        path: 'contacto/:id/editar',
        loadComponent: () =>
          import('./features/admin/contacto/contacto-form/contacto-form.component')
            .then(m => m.ContactoFormComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'inicio' }
];