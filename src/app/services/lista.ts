import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ListaService {
    private readonly estadoListas = signal<any[]>([]);
    readonly listas = this.estadoListas.asReadonly();

    crearLista(nombreLista: string){
        let objetoLista = {
            id: 0, 
            titulo: nombreLista,
            creadaEn: new Date(),
            terminadaEn: null,
            completada: false,
            actividad: []
        };

        this.estadoListas.update((listas) => [...listas, objetoLista]);
        this.persistirStorage();

        return objetoLista.titulo;
    }

    guardarStorage() {
        this.estadoListas.update((listas) => [...listas]);
        this.persistirStorage();
    }

    private persistirStorage() {
        const stringListas = JSON.stringify(this.estadoListas());
        localStorage.setItem('listas', stringListas);
    }


    
}




