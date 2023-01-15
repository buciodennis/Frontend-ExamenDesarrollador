import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: cliente= new cliente();
  idCliente: number=0;
  idCred: number=0;
  idUbicacion :number=0;

  constructor(private activatedRoute : ActivatedRoute, private router: Router,
    private servicioClientes: ClientesService) {

    activatedRoute.params.subscribe( prm => {
       this.idCliente=prm['id'];
    })
   }

  ngOnInit(): void {
    this.cliente=this.servicioClientes.getcliente();
    this.obtenerCliente();
  }

  onSubmit(){
    this.modificarCliente(this.cliente);
  }


  obtenerCliente = async () => { 
    await axios.get("//localhost:11179/Clientes/obtenerCliente"+this.idCliente
    ).then(response => {
      this.idUbicacion=response.data.idUbicacion;
      this.obtenerIdCredencial();
    }).catch(e => {
        console.log(e);
    });
  }

  obtenerIdCredencial= async () => { 
    await axios.get("//localhost:11179/Credenciales/obtenerIdClienteCredencial"+this.idCliente).then(response => {
       this.idCred=response.data[0].idCredencial;
       this.obtenerIdUbicacion();
        console.log("Credencial "+this.idCred);
        //console.log(response.data);
      }).catch(e => {
          console.log(e);
      });
  }
  
  obtenerIdUbicacion= async () => { 
    await axios.get("//localhost:11179/Clientes/obtenerUbicacion"+this.idCliente).then(response => {
       this.idUbicacion=response.data[0].idUbicacion;
        //console.log(this.idCred);
        console.log("Ubicacion "+this.idUbicacion);
      }).catch(e => {
          console.log(e);
      });
  }

  modificarCliente = async (cliente: cliente) => { 
     
    await axios.put("//localhost:11179/Clientes/modificarCliente",
      {
        idClientes: this.idCliente,
        nombre: cliente.nombre,
        idUbicacion: this.idUbicacion,
        eliminado: false
      }
      ).then(response => {
        this.cliente.idClientes=response.data;
        console.log(response.data);
        this.modificarCredencial(this.cliente);
      }).catch(e => {
          console.log(e);
      });

  }


  modificarCredencial = async (cliente: cliente) => { 
      await axios.put("//localhost:11179/Credenciales/modificarCredencial",
      {
        idCredencial: this.idCred,
        email: cliente.email,
        contrasenia : cliente.contrasenia,
        eliminado: cliente.eliminado,
        tipo: 2,
        idUsuario: 0,
        idCliente: this.idCliente
      }
      ).then(response => {
      this.modificarUbicacion(cliente);
        console.log(response.data);
      }).catch(e => {
          console.log(e);
      });
  }

  modificarUbicacion = async (cliente: cliente) => { 
     
    await axios.put("//localhost:11179/Ubicacion/modificarUbicacion",
      {
        idUbicacion: this.idUbicacion,
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
        this.servicioClientes.recargarClientes.emit();
        this.router.navigate(['/clientes']);
      }).catch(e => {
          console.log(e);
      });

  }



}
