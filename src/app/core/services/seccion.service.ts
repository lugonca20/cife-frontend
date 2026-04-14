import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeccionContenido } from '../models/seccion.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeccionService {

  constructor(private http: HttpClient) {}

  obtener(clave: string): Observable<SeccionContenido> {
    return this.http.get<SeccionContenido>(`${environment.apiUrl}/public/secciones/${clave}`);
  }

  guardar(seccion: SeccionContenido): Observable<SeccionContenido> {
    return this.http.put<SeccionContenido>(`${environment.apiUrl}/admin/secciones`, seccion);
  }
}