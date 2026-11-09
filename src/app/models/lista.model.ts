import { Actividad } from './actividad.model';

export class Lista{
    id: number;
    titulo: string;
    creadaEn: Date;
    completada: boolean;
    actividad: Actividad[];

    constructor(titulo: string){
        this.id = new Date().getTime();
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.actividad = [];
    }




}

