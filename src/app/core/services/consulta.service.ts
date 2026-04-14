import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsultaService {

  constructor(private http: HttpClient) {}

  enviar(consulta: Consulta): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/public/consultas`, consulta);
  }

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${environment.apiUrl}/admin/consultas`);
  }

  marcarLeida(id: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/admin/consultas/${id}/leida`, {});
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/consultas/${id}`);
  }

}