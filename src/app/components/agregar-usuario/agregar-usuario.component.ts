import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router'
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  usuario: usuario= new usuario();
  @Output() recargarDatos: EventEmitter<any>= new EventEmitter();
  msgs: Message[]= [];

  constructor(private router: Router, private servicioUsuarios: UsuariosService) {
   }

  ngOnInit(): void {
     
  }

  agregarUsuario = async (usuario: usuario) => { 
     
    await axios.post("//localhost:11179/Usuarios/agregarUsuario",
      {
        nombre: usuario.nombre
      }
      ).then(response => {
        this.usuario.idUsuario=response.data;
        console.log(response.data);
        this.agregarCredencial(this.usuario);
        this.usuario.email="";
        this.usuario.nombre="";
        this.usuario.contrasenia="";
      }).catch(e => {
          console.log(e);
      });

  }

  agregarCredencial = async (usuario: usuario) => { 
      await axios.post("//localhost:11179/Credenciales/agregarCredencial",
      {
        email: usuario.email,
        contrasenia : usuario.contrasenia,
        eliminado: usuario.eliminado,
        tipo: usuario.tipo,
        idUsuario: usuario.idUsuario,
        idCliente: 0
      }
      ).then(response => {
        this.servicioUsuarios.recargarUsuarios.emit();
        this.router.navigate(['/usuarios']);
      }).catch(e => {
          console.log(e);
      });
  }

  onSubmit(){
    var re = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
    if(re.test(this.usuario.email)){
      this.obtenerCredenciales();
    }else{
       this.showIncorrecto();
    }
    
  }

 obtenerCredenciales = async () => { 
  var repetido=false
    await axios.get("//localhost:11179/Credenciales/obtenerCredenciales").then(response => {
      response.data.every((item: { email: string; })=> {
        if(item.email==this.usuario.email){
            repetido=true;
            return true;
        }
        return false;
      });

      if(repetido==false){
        this.agregarUsuario(this.usuario);
      }else{
        this.showRepetido();
      }
    }).catch(e => {
        console.log(e);
    });
  }

  showRepetido(){
    this.msgs=[{severity:'error', summary:'El email ya esta registrado', detail:'Ingresa un nuevo email'}];
  }

  showIncorrecto(){
    this.msgs=[{severity:'error', summary:'Formato incorrecto', detail:'Ingresa un email valido'}];
  }


}
