export interface Contacto {
  id?: number;
  tipo: 'TELEFONO' | 'EMAIL' | 'DIRECCION' | 'RED_SOCIAL';
  valor: string;
  etiqueta?: string;
  orden?: number;
}