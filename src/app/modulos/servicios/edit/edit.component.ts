import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private serviciosService: ServicioService,
    private rutasService: RutaService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa_vehiculo: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      dinero_recogido: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
    });

    id: string=''

    listadoRutas: RutaModelo[] = []

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllRutas()
  }

  buscarRegistro(id: string){
    this.serviciosService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha)
      this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio)
      this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin)
      this.fgValidacion.controls["placa_vehiculo"].setValue(data.placa_vehiculo)
      this.fgValidacion.controls["nombre_conductor"].setValue(data.nombre_conductor)
      this.fgValidacion.controls["dinero_recogido"].setValue(data.dinero_recogido)
      this.fgValidacion.controls["ruta"].setValue(data.ruta)
    })
  }

  edit(){
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa_vehiculo = this.fgValidacion.controls["placa_vehiculo"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;
 
    this.serviciosService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllRutas(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }
}