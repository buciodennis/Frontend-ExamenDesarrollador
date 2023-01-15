import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
usuarioEditar: usuario= new usuario();
usuarios: usuario[]=[];
@Output() recargarUsuarios: EventEmitter<any>= new EventEmitter();

  constructor() { }

setUsuario(usuario: usuario){
  this.usuarioEditar=usuario;
}

getUsuario(){
  return this.usuarioEditar;
}

getUsuarios(){
  return this.usuarios;
}

obtenerUsuarios = async () => { 
  await axios.get("//localhost:11179/Usuarios/obtenerUsuarios").then(response => {
     this.usuarios=response.data;
  }).catch(e => {
      console.log(e);
  });
}


}
