import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImagenService {

  constructor(private http: HttpClient) {}

  subir(archivo: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post<{ url: string }>(
      `${environment.apiUrl}/admin/imagenes`,
      formData
    );
  }

  eliminar(url: string): Observable<void> {
      return this.http.delete<void>(
        `${environment.apiUrl}/admin/imagenes`,
        {
          params: { url },
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
}