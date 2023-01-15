import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() nombre="";
  tipo: number=0;

  menuItems=[
    {
      icon: '',
 
    },
    {
      label: '',
      
    },
    {
      label: '',
      routerLink: '',
    },
    {
      label: '',
      routerLink: '',
    },
    {
      label: '',
      command: () => this.cerrarSesion()
    }
  ]

  constructor(private router: Router, private servicio: LoginServiceService) { }

  ngOnInit(): void {
    console.log(this.nombre)
    this.servicio.recargarHeader.subscribe(
      data => {
        this.nombre=data.data;
         console.log(this.nombre);
         this.tipo=this.servicio.getTipo()

        if(this.servicio.getAutenticado()==1){
          if(this.tipo==1){

            this.menuItems=[
              {
                icon: 'pi pi-user',
                
              },
              {
                label: this.nombre,
              },
              {
                label: 'Cerrar sesion',
                command: () => this.cerrarSesion(),
              }
            ]

          }else if(this.servicio.getTipo()==2){
            
            this.menuItems=[
              {
                icon: 'pi pi-user',
                
              },
              {
                label: this.nombre,
                
              },
              {
                label: 'Clientes',
                routerLink: 'clientes',
              },
              {
                label: 'Cerrar sesion',
                command: () => this.cerrarSesion()
              },
            ]
          }else{

            this.menuItems=[
              {
                icon: 'pi pi-user',
                
              },
              {
                label: "Usuarios",
                routerLink: 'usuarios',
                
              },
              {
                label: 'Clientes',
                routerLink: 'clientes',
              },
              {
                label: 'Cerrar sesion',
                command: () => this.cerrarSesion()
              },
            ]

          }
        }else{
          this.menuItems=[
           
          ]
        }

        
      }
    )
    console.log(this.nombre)
  
  }

  cerrarSesion(){
    this.router.navigate(['/']);
  }

  

}
