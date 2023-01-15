import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesGuard implements CanActivate {

  tipo: number=0;
  constructor(private servicio: LoginServiceService){
  
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.tipo=this.servicio.getTipo();
     
      console.log(this.tipo);
      if(this.tipo==2 || this.tipo==3){
        return true;
      }
      

    return true;
  }
  
}
