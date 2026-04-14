export interface Novedad {
  id?: number;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  fechaPublicacion?: string;
  activo?: boolean;
  imagenes?: string[];
}