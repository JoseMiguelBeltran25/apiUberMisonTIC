export class ServicioModelo{
    id?: String;
    fecha?: Date;
    hora_inicio?: string;
    hora_fin?: string;
    placa_vehiculo?: string;
    nombre_conductor?: string;
    dinero_recogido?: string;
    ruta?: string;
    token?: string;
    isLoggedIn?: boolean = false;
  }