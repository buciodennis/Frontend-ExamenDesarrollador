import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password'
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {TableModule} from 'primeng/table';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { FormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import {ImageModule} from 'primeng/image';
import { ContactosComponent } from './components/contactos/contactos.component';
import { ListaContactosComponent } from './components/lista-contactos/lista-contactos.component';
import { HeaderComponent } from './components/header/header.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaUsuariosComponent,
    UsuariosComponent,
    AgregarUsuarioComponent,
    ClientesComponent,
    ListaClientesComponent,
    EditarUsuarioComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
    PerfilComponent,
    ContactosComponent,
    ListaContactosComponent,
    HeaderComponent,
    ListaActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    ImageModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
