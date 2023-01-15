import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { cliente } from 'src/app/models/cliente';
import { contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactos: contacto[]= [];
  contacto: contacto= new contacto();
  idUbicacion: number=0;

  constructor(private activatedRoute : ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe( prm => {
      this.idUbicacion=prm['id'];
   })
   }

  ngOnInit(): void {
    this.obtenerContactos()
  }


  obtenerContactos = async () => { 
    await axios.get("//localhost:11179/Contacto/obtenerUContactos"+this.idUbicacion).then(response => {
      this.contactos=response.data;
        console.log(response.data);
    }).catch(e => {
        console.log(e);
    });
  }

  agregarUsuario = async (contacto: contacto) => { 
     
    await axios.post("//localhost:11179/Contacto/agregarContacto",
      {
        email: contacto.email,
        telefono: contacto.telefono,
        sitio: contacto.sitio,
        idUbicacion: this.idUbicacion
      }
      ).then(response => {
        this.obtenerContactos();
        contacto.email="";
        contacto.telefono="";
        contacto.sitio="";
      }).catch(e => {
          console.log(e);
      });

  }

  onSubmit(){
    console.log(this.idUbicacion);
    this.agregarUsuario(this.contacto);
  }

}
