import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactoService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${environment.apiUrl}/public/contactos`);
  }

  crear(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(`${environment.apiUrl}/admin/contactos`, contacto);
  }

  actualizar(id: number, contacto: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>(`${environment.apiUrl}/admin/contactos/${id}`, contacto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/contactos/${id}`);
  }
}