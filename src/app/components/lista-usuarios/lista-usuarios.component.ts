import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import {Router} from '@angular/router'; 
import axios from 'axios';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

 @Input() usuario: usuario= new usuario();
 @Output() recargarDatos: EventEmitter<any>= new EventEmitter();

  constructor(private router: Router, private servicio: LoginServiceService, private servicioUsuarios: UsuariosService) { }

  ngOnInit(): void {
    
  } 

  onDelete(usuario:usuario){
    console.log(this.usuario.idUsuario);
    this.eliminarUsuario(this.usuario);
  }

  eliminarUsuario = async (usuario: usuario) => { 
    await axios.put("//localhost:11179/Usuarios/eliminarUsuario",
      {
        idUsuario: usuario.idUsuario,
        nombre:usuario.nombre,
        eliminado: true
      }
      ).then(response => {
        this.recargarDatos.emit();
        console.log(response.data);
      }).catch(e => {
          console.log(e);
      });

  }

  onEdit(usuario: usuario){
    this.servicioUsuarios.setUsuario(usuario);
    this.router.navigate(['/editarUsuario/'+usuario.idUsuario]);
  }

  cambiarPerfil(usuario: usuario){
    this.servicioUsuarios.setUsuario(usuario);
    this.router.navigate(['perfil/'+usuario.idUsuario]);
  }

}
