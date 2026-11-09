import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista';
import { Lista } from '../models/lista.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(
    public alertController: AlertController, 
    public toastController: ToastController,
    public listaService: ListaService) {}

    


  async AgregarLista() {
    let alerta = await this.alertController.create({
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
            let esValido: boolean = this.validarInput(data);

            if(esValido){
              this.listaService.crearLista(data.titulo);
              this.presentToast('Lista creada correctamente', 'success');
              
            }

            
          }
        }
      ]
    });

    await alerta.present();


  }

    /**
     * @function validarInput
     * @description Valida que el input no esté vacío y que tenga un título.
     */
    
    validarInput (input:any):boolean {
    if (input && input.titulo) {
      return true;
    }
    this.presentToast('Debe ingresar un valor', 'danger'); 
    return false;
     }

  /**
 * 
 * @function presentToast
 * @description Muestra un toast con el mensaje y color especificados.
 * * */
  async presentToast(message: string, color: string) {

    let toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });

    toast.present();
  }

  editarLista(listaItem: Lista) {
    console.log("Editar lista: ", listaItem);
  }

  eliminarLista(listaItem: Lista) {
    console.log("Eliminar lista: ", listaItem);
  }




}

