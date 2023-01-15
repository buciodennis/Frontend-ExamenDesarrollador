import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { HeaderComponent } from './components/header/header.component';
import { usuario } from './models/usuario';
import { UsuariosGuard } from './guards/usuarios.guard';
import { ClientesGuard } from './guards/clientes.guard';
import { AutenticadoGuard } from './guards/autenticado.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'usuarios', canActivate:[UsuariosGuard, AutenticadoGuard], 
    component: UsuariosComponent
  },
  {
    path: 'agregarUsuario', canActivate:[UsuariosGuard, AutenticadoGuard], 
    component: AgregarUsuarioComponent
  },
  {
    path: 'clientes', canActivate:[ClientesGuard, AutenticadoGuard], 
    component: ClientesComponent
  },
  {
    path: 'editarUsuario/:id', canActivate:[UsuariosGuard, AutenticadoGuard], 
    component: EditarUsuarioComponent
  },
  {
    path: 'agregarCliente', canActivate:[ClientesGuard, AutenticadoGuard], 
    component: AgregarClienteComponent
  },
  {
    path: 'editarCliente/:id', canActivate:[ClientesGuard, AutenticadoGuard], 
    component: EditarClienteComponent
  },
  {
    path: 'perfil/:id', canActivate:[UsuariosGuard, AutenticadoGuard], 
    component: PerfilComponent
  },
  {
    path: 'contactos/:id', canActivate:[ClientesGuard, AutenticadoGuard], 
    component: ContactosComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
