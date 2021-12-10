import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private serviciosService: ServicioService,
    private rutaService: RutaService,
    private router: Router) { }

    listadoRutas: RutaModelo[] = []

  ngOnInit(): void {
    this.getAllRutas()
  }

  fgValidacion = this.fb.group({
    fecha: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    placa_vehiculo: ['', [Validators.required]],
    nombre_conductor: ['', [Validators.required]],
    dinero_recogido: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  store(){
    let servicio = new ServicioModelo();

    new Date(this.fgValidacion.controls["fecha"].value).toISOString();
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa_vehiculo = this.fgValidacion.controls["placa_vehiculo"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;
 
    this.serviciosService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }
}