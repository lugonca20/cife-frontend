export interface Consulta {
  id?: number;
  nombre: string;
  email: string;
  mensaje: string;
  fechaEnvio?: string;
  leida?: boolean;
}