import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { cliente } from 'src/app/models/cliente';
import { usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

@Input () cliente: cliente= new cliente();
@Output() recargarDatos: EventEmitter<any>= new EventEmitter();

  constructor(private router: Router, 
    private servicioCliente: ClientesService ) { }

  ngOnInit(): void {
  }

  onDelete(cliente: cliente){
    this.eliminaCliente(cliente);
  }

  onEdit(cliente:cliente){
    this.servicioCliente.setcliente(cliente);
    this.router.navigate(['/editarCliente/'+cliente.idClientes]);
  }

  eliminaCliente= async (cliente: cliente) => { 
    await axios.put("//localhost:11179/Clientes/eliminarCliente",
      {
        idClientes : cliente.idClientes,
            nombre : cliente.nombre,
            idUbicacion : cliente.idUbicacion,
            eliminado : true
      }
      ).then(response => {
        this.recargarDatos.emit();
        console.log(response.data);
      }).catch(e => {
          console.log(e);
      });

  }

  cambiarVistaContactos(cliente: cliente){
    this.router.navigate(['/contactos/'+cliente.idUbicacion]);
  }

}
