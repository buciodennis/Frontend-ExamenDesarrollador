import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { actividades } from 'src/app/models/actividades';
import { usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
usuario: usuario= new usuario();
nombre: string="dennis";
actividad: actividades= new actividades();
actividades: actividades[]=[];
idUsuario: number=0;


  constructor(private activatedRoute : ActivatedRoute, private router: Router,
    private usuariosServicio: UsuariosService) { 
    activatedRoute.params.subscribe( prm => {
      this.idUsuario=prm['id'];
   })
  }

  ngOnInit(): void {
    this.usuario=this.usuariosServicio.getUsuario();
    console.log(this.usuario);
    this.obtenerActividades();
  }


  obtenerUsuario = async () => { 
    await axios.get("//localhost:11179/Usuarios/obtenerUsuario"+this.idUsuario
    ).then(response => {
      this.usuario=response.data;
      console.log(this.usuario);
    }).catch(e => {
        console.log(e);
    });
  }

  onSubmit(){

  }

  agregar(){
    this.agregarActividad(this.actividad);
  }

  obtenerActividades = async () => { 
    await axios.get("//localhost:11179/Actividades/obtenerActividades"+this.idUsuario).then(response => {
      this.actividades=response.data;
      console.log(response.data);
    }).catch(e => {
        console.log(e);
    });
  }

  agregarActividad = async (actividad: actividades) => { 
     
    await axios.post("//localhost:11179/Actividades/agregarActividades",
      {
        actividad: actividad.actividad,
        descripcion: actividad.descripcion,
        eliminado: actividad.eliminado,
        idUsuario: this.idUsuario
      }
      ).then(response => {
        this.obtenerActividades();
        actividad.actividad='';
        actividad.descripcion='';
      }).catch(e => {
          console.log(e);
      });

  }

}
