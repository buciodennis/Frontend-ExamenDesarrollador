import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css']
})
export class ListaContactosComponent implements OnInit {
@Input ()contacto: contacto = new contacto();
@Output() recargarDatos: EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(contacto: contacto){
    console.log(contacto.idContacto);
    this.eliminarContacto(contacto);
  }


  eliminarContacto = async (contacto: contacto) => { 
    await axios.put("//localhost:11179/Contacto/eliminarContacto",
      {
        idContacto: contacto.idContacto,
        email: contacto.email,
        telefono: contacto.telefono,
        sitio: contacto.sitio,
        idUbicacion: contacto.idUbicacion,
        eliminado: true
      }
      ).then(response => {
        this.recargarDatos.emit();
        console.log(response.data);
      }).catch(e => {
          console.log(e);
      });

  }



}
