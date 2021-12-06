import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstacionModelo } from '../modelos/estacion.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class Estacionservice {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }
  url = "http://localhost:3000"
  token: string = ''

  store(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estaciones`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coord_x: estacion.coord_x,
      coord_y: estacion.coord_y,
      tipo: estacion.tipo
    });
  }

  getAll(): Observable<EstacionModelo[]>{
    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.patch<EstacionModelo>(`${this.url}/estaciones/${estacion.id}`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coord_x: estacion.coord_x,
      coord_y: estacion.coord_y,
      tipo: estacion.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EstacionModelo[]>{
    return this.http.delete<EstacionModelo[]>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EstacionModelo>{
    return this.http.get<EstacionModelo>(`${this.url}/estaciones/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}