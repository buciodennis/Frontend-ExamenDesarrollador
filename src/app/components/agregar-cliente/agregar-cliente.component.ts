import cli from '@angular/cli';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  cliente: cliente= new cliente();
  idUbicacion: number=0;
  @Output() recargarDatos: EventEmitter<any>= new EventEmitter();
  constructor(private router: Router, private servicioClientes: ClientesService) {
   }


  ngOnInit(): void {
    console.log(this.cliente)
  }


  agregarUbicacion = async (cliente: cliente) => { 
     
    await axios.post("//localhost:11179/Ubicacion/agregarUbicacion",
      {
        calle: cliente.calle,
        numero: cliente.numero,
        colonia: cliente.colonia,
        cp: cliente.CP,
        ciudad: cliente.ciudad,
        estado: cliente.estado,
        pais: cliente.pais
      }
      ).then(response => {
        this.cliente.idUbicacion=response.data;
        console.log(response.data);
       this.agregarCliente(this.cliente);
       

      }).catch(e => {
          console.log(e);
      });

  }

  agregarCliente = async (cliente: cliente) => { 
     
    await axios.post("//localhost:11179/Clientes/agregarCliente",
      {
        nombre: cliente.nombre,
        idUbicacion: cliente.idUbicacion,
        eliminado: false
      }
      ).then(response => {
        this.cliente.idClientes=response.data;
        console.log(response.data);
        this.agregarCredencial(this.cliente);
      }).catch(e => {
          console.log(e);
      });

  }

  agregarCredencial = async (cliente: cliente) => { 
      await axios.post("//localhost:11179/Credenciales/agregarCredencial",
      {
        eliminado: cliente.eliminado,
        tipo: cliente.tipo,
        idCliente: cliente.idClientes,
        idUsuario: 0,
        email: cliente.email,
        contrasenia: cliente.contrasenia
      }
      ).then(response => {
        this.servicioClientes.recargarClientes.emit();
        this.router.navigate(['/clientes']);
        this.cliente.email="";
        this.cliente.nombre="";
        this.cliente.contrasenia="";
        this.cliente.pais="";
        this.cliente.estado="";
        this.cliente.ciudad="";
        this.cliente.CP="";
        this.cliente.colonia="";
        this.cliente.numero=0;
        this.cliente.calle="";
      }).catch(e => {
          console.log(e);
      });

      
  }

  onSubmit(){
    this.agregarUbicacion(this.cliente);
   
  }



}
