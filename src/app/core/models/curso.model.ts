export interface Curso {
  id?: number;
  titulo: string;
  descripcion: string;
  objetivo?: string;
  requisitos?: string;
  fechaInicio?: string;
  horario?: string;
  frecuencia?: string;
  duracion?: string;
  modalidad: 'PRESENCIAL' | 'SEMI_PRESENCIAL' | 'VIRTUAL';
  activo?: boolean;
  imagenes?: string[];
}