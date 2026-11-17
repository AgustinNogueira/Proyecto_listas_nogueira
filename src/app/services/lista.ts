import { Injectable, signal } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ListaService {
    private readonly estadoListas = signal<Lista[]>([]);
    readonly listas = this.estadoListas.asReadonly();


    constructor(
        public alertController: AlertController,
        public toastController: ToastController
    ) 
    {
        this.cargarStorage();
    }

    crearLista(nombreLista: string) {
        const objetoLista = new Lista(nombreLista);
        this.estadoListas.update((listas) => [...listas, objetoLista]);
        this.persistirStorage();

    }

    guardarStorage() {
        this.estadoListas.update((listas) => [...listas]);
        this.persistirStorage();
    }
    
    private cargarStorage() {

        const listaStorage = localStorage.getItem('listas');

        if (listaStorage === null) {
            this.estadoListas.set([]);
            return;
        }
        else {
            const objLista: Lista[] = JSON.parse(listaStorage);
            this.estadoListas.set(objLista);
        }

    }
    private persistirStorage() {
        const stringListas = JSON.stringify(this.estadoListas());
        localStorage.setItem('listas', stringListas);
    }

    eliminarLista(listaItem: Lista) {
        this.estadoListas.update((listas) => listas.filter((lista) => lista.id !== listaItem.id));
        this.persistirStorage();
    }

    editarLista(listaItem: Lista) {
        let listaEditar = this.listas().find((lista) => lista.id === listaItem.id);
        if (listaEditar) {
            listaEditar.titulo = listaItem.titulo;
            this.guardarStorage();
        }
        console.log("Editar lista: ", listaItem);
    }

    validarInput(input: any): boolean {
        if (input && input.titulo) {
            return true;
        }
        this.presentToast('Debe ingresar un valor', 'danger');
        return false;
    }

    async presentToast(message: string, color: string) {

        let toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: color
        });

        toast.present();
    }

    obtenerLista(idLista: string | number){
        const id = Number(idLista);
        let lista = this.listas().find((lista) => lista.id === id);
        return lista;
    }


    
}




