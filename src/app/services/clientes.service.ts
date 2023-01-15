import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  clientes: cliente[]=[];
  cliente: cliente= new cliente();
  @Output() recargarClientes: EventEmitter<any>= new EventEmitter();

  constructor() { }

  setcliente(cliente: cliente){
    this.cliente=cliente;
  }
  
  getcliente(){
    return this.cliente;
  }
  
  getclientes(){
    return this.clientes;
  }
  
  
  obtenerClientes = async () => { 
    await axios.get("//localhost:11179/Clientes/obtenerClientes").then(response => {
      this.clientes=response.data;
    }).catch(e => {
        console.log(e);
    });
  }



}
