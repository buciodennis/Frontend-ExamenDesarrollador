import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router'
import axios from 'axios';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuario: usuario= new usuario;
  idUsuario: number=0;
  idCred: number=0;

  constructor(private activatedRoute : ActivatedRoute, private router: Router,
    private service: LoginServiceService, private servicioUsuarios: UsuariosService) {

    activatedRoute.params.subscribe( prm => {
       this.idUsuario=prm['id'];
    })
    
   }


  ngOnInit(): void {
    this.usuario=this.servicioUsuarios.getUsuario();
    this.obtenerUsuario();
  }

  onSubmit(){
    this.editarUsuario(this.usuario);
  }


  obtenerUsuario = async () => { 
    await axios.get("//localhost:11179/Usuarios/obtenerUsuario"+this.idUsuario
    ).then(response => {
      this.idCredencial(response.data.idCredencial);
      console.log("idCred: "+ this.idCredencial)
    }).catch(e => {
        console.log(e);
    });
  }

  idCredencial= async (usuario: usuario) => { 
    await axios.get("//localhost:11179/Credenciales/obtenerIdCredencial"+this.idUsuario).then(response => {
        this.idCred=response.data[0].idCredencial;
        console.log(this.idCred);
      }).catch(e => {
          console.log(e);
      });
  }

  editarUsuario = async (usuario: usuario) => { 
     
    await axios.put("//localhost:11179/Usuarios/modificarUsuario",
      {
        idUsuario: this.idUsuario,
        nombre: usuario.nombre
      }
      ).then(response => {
       this.modificarCredencial(this.usuario);
      }).catch(e => {
          console.log(e);
      });

  }

  modificarCredencial = async (usuario: usuario) => { 
      await axios.put("//localhost:11179/Credenciales/modificarCredencial",
      {
        idCredencial: this.idCred,
        email: usuario.email,
        contrasenia : usuario.contrasenia,
        eliminado: usuario.eliminado,
        tipo: usuario.tipo,
        idUsuario: this.idUsuario,
        idCliente: 0
      }
      ).then(response => {
        this.servicioUsuarios.recargarUsuarios.emit();
        this.router.navigate(['/usuarios']);
      }).catch(e => {
          console.log(e);
      });
  }

}
