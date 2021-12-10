import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionesService: EstacionService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      coord_x: ['', [Validators.required]],
      coord_y: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
 
    id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.estacionesService.getWithId(id).subscribe((data: EstacionModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["direccion"].setValue(data.direccion)
      this.fgValidacion.controls["coord_x"].setValue(data.coord_x)
      this.fgValidacion.controls["coord_y"].setValue(data.coord_y)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
    })
  }

  edit(){
    let estacion = new EstacionModelo();
    estacion.id = this.fgValidacion.controls["id"].value;
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coord_x = this.fgValidacion.controls["coord_x"].value;
    estacion.coord_y = this.fgValidacion.controls["coord_y"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;
 
    this.estacionesService.update(estacion).subscribe((data: EstacionModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}