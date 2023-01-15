import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import axios from 'axios';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: usuario[]=[];

  constructor(private router: Router, private servicio:LoginServiceService,
    private servicioUsuarios: UsuariosService ) {
    this.obtenerUsuarios();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();

    this.servicioUsuarios.recargarUsuarios.subscribe(data=>{
        console.log("Entro a la emision");
        this.usuarios=this.servicioUsuarios.getUsuarios();
      }
    )
}

  obtenerUsuarios = async () => { 
  await axios.get("//localhost:11179/Usuarios/obtenerUsuarios").then(response => {
    this.usuarios=response.data;
      console.log(response.data);
  }).catch(e => {
      console.log(e);
  });

  
}

cambiarVista(){
  this.router.navigate(['/agregarUsuario']);
}


}
