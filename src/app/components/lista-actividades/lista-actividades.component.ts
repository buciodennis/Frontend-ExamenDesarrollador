import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { actividades } from 'src/app/models/actividades';

@Component({
  selector: 'app-lista-actividades',
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit {
@Input() actividad: actividades= new actividades();
@Output() recargarDatos: EventEmitter<any>= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(actividad: actividades){
    this.eliminarActividad(actividad);
  }

  eliminarActividad = async (actividad: actividades) => { 
    await axios.put("//localhost:11179/Actividades/eliminarActividad",
      {
        idActividad: actividad.idActividad,
        actividad: actividad.actividad,
        descripcion: actividad.descripcion,
        eliminado: actividad.eliminado,
        idUsuario: actividad.idUsuario
      }
      ).then(response => {
        this.recargarDatos.emit();
        console.log(response.data);
      }).catch(e => {
          console.log(e);
      });

  }

}
