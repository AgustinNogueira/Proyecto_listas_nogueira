import { Injectable, signal } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';


@Injectable({
  providedIn: 'root'
})

export class ListaService {
    private readonly estadoListas = signal<Lista[]>([]);
    readonly listas = this.estadoListas.asReadonly();

    constructor() {
        this.cargarStorage();
    }

    crearLista(nombreLista: string){
        const objetoLista = new Lista(nombreLista);
        this.estadoListas.update((listas) => [...listas, objetoLista]);
        this.persistirStorage();

    }

    guardarStorage() {
        this.estadoListas.update((listas) => [...listas]);
        this.persistirStorage();
    }

    private persistirStorage() {
        const stringListas = JSON.stringify(this.estadoListas());
        localStorage.setItem('listas', stringListas);
    }

    private cargarStorage() {
        const listaStorage = localStorage.getItem('listas');

        if(listaStorage === null){
            this.estadoListas.set([]);
            return;
        }
        else{
            const objLista: Lista[] = JSON.parse(listaStorage);
            this.estadoListas.set(objLista);
        }
    
    }


    
}




