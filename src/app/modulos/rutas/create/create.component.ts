import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private estacionesService: EstacionService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      tiempo_estimado: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
    });

    listadoEstaciones: EstacionModelo[] = []

  ngOnInit(): void {
    this.getAllEstaciones()
  }

  store(){
    let ruta = new RutaModelo();
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;
 
    this.rutaService.store(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllEstaciones(){
    this.estacionesService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listadoEstaciones = data
      console.log(data)
    })
  }
}