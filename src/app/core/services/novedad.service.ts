import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedad.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NovedadService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Novedad[]> {
    return this.http.get<Novedad[]>(`${environment.apiUrl}/public/novedades`);
  }

  obtener(id: number): Observable<Novedad> {
    return this.http.get<Novedad>(`${environment.apiUrl}/public/novedades/${id}`);
  }

  crear(novedad: Novedad): Observable<Novedad> {
    return this.http.post<Novedad>(`${environment.apiUrl}/admin/novedades`, novedad);
  }

  actualizar(id: number, novedad: Novedad): Observable<Novedad> {
    return this.http.put<Novedad>(`${environment.apiUrl}/admin/novedades/${id}`, novedad);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/novedades/${id}`);
  }
}