import { Component } from '@angular/core';
import { ListaService } from '../services/lista';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(
    public listaService: ListaService
  ) {}


  async AgregarLista() {
    let alerta = await this.listaService.alertController.create({
      header: 'Agregar lista',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data:any) => {
            let esValido: boolean = this.listaService.validarInput(data);

            if(esValido){
              this.listaService.crearLista(data.titulo);
              this.listaService.presentToast('Lista creada correctamente', 'success');
              
            }

            
          }
        }
      ]
    });

    await alerta.present();


  }
}

