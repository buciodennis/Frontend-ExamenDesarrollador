import { cliente } from "./cliente";

export class usuario{
    idUsuario: number=0;
    nombre: string='';
    email: string='';
    contrasenia : string='';
    eliminado: boolean=false;
    tipo: number=1;
    idCredencial: number=0;
}