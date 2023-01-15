import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  nombre: string="";
  tipo: number=0;
  autenticado: number=0;
  @Output() recargarHeader: EventEmitter<any>= new EventEmitter();

  constructor() { }

  getMenu(){
    return   [
      {
        label: this.nombre,
        
      },
      {
        label: 'email'
      },
      {
        label: 'Perfil',
        routerLink: 'usuarios',
      },
      {
        label: 'Cambiar contraseña',
        routerLink: 'clientes',
      },
      {
        label: 'Cerrar sesion',
        //command: () => this.router.navigate(['tab-2']),
      }
    ]
  }

  setNombre( nombre: string){
    this.nombre=nombre;
    this.recargarHeader.emit();
  }

  setTipo(t: number){
    console.log("set");
    this.tipo=t;
  }

  getTipo(){
    return this.tipo;
  }

  setAutenticado(b: number){
    this.autenticado=b;
  }

  getAutenticado(){
    return this.autenticado;
  }
 

}
