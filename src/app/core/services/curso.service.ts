import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CursoService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${environment.apiUrl}/public/cursos`);
  }

  obtener(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${environment.apiUrl}/public/cursos/${id}`);
  }

  crear(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${environment.apiUrl}/admin/cursos`, curso);
  }

  actualizar(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${environment.apiUrl}/admin/cursos/${id}`, curso);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/cursos/${id}`);
  }
}