import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: cliente[]= [];

  constructor(private router: Router, private servicioClientes: ClientesService) { }

  ngOnInit(): void {
    this.obtenerClientes();

    this.servicioClientes.recargarClientes.subscribe(data=>{
      this.obtenerClientes();
    }
  )

  }

  cambiarVista(){
    this.router.navigate(['/agregarCliente']);
  }

  obtenerClientes = async () => { 
    await axios.get("//localhost:11179/Clientes/obtenerClientes").then(response => {
      this.clientes=response.data;
        console.log(response.data);
    }).catch(e => {
        console.log(e);
    });
  }

}
