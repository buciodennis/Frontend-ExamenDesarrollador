import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Message } from 'primeng/api';
import { usuario } from 'src/app/models/usuario';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
usuario: usuario= new usuario();
msgs: Message[]= [];
  constructor(private router: Router, private servicio: LoginServiceService,
    private servicioUsuarios: UsuariosService) { }

  ngOnInit(): void {
    this.servicio.setTipo(0);
      this.servicio.setAutenticado(0);
      this.usuario= new usuario();
      this.servicio.recargarHeader.emit({data: ""})
  }

  logear(){
   this.autenticar(this.usuario);
  }

  autenticar = async (usuario: usuario) => { 
    await axios.post("//localhost:11179/Login/autenticar",{
      email: usuario.email,
      contrasenia: usuario.contrasenia
    }
    ).then(response => {
      this.servicio.setTipo(response.data.tipo);
      this.servicio.setAutenticado(1);
      if(response.data.tipo==1){
        this.usuario.nombre=response.data.nombre;
        this.usuario.idUsuario=response.data.idUsuario;
        this.usuario.email=response.data.email;
        this.servicioUsuarios.setUsuario(this.usuario);
      }
      this.cambiarVista(response.data.tipo, response.data.email, response.data.id); 
    }).catch(e => {
        this.show();
    });
  }

  show(){
      this.msgs=[{severity:'error', summary:'Los datos son incorrectos', detail:'Intentalo nuevamente'}];
  }

  cambiarVista(tipo: number, email: string, id: number){
    if(tipo==1){

      this.router.navigate(['perfil/'+id]);
      
    }else if(tipo==2){
      this.router.navigate(['clientes']);
    }else if(tipo==3){
      this.router.navigate(['usuarios']);
    }

    this.servicio.recargarHeader.emit({data: email })
    
  }


}
