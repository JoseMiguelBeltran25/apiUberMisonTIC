import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      coord_x: ['', [Validators.required]],
      coord_y: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });
  
  ngOnInit(): void {
  }

  store(){
    let estacion = new EstacionModelo();
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coord_x = this.fgValidacion.controls["coord_x"].value;
    estacion.coord_y = this.fgValidacion.controls["coord_x"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;
 
    this.estacionService.store(estacion).subscribe((data: EstacionModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/estacion/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}