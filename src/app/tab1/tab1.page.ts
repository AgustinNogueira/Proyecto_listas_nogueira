import { Component } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async AgregarLista() {
    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
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
            this.validarInput(data)
          }
        }
      ]
    });

    await alert.present();
  }


  validarInput(input:any):boolean {
    if(input && input.titulo) {
      return true;
    }
    this.presentToast('Debe ingresar un valor', 'danger');
    return false;
  }

  async presentToast(message: string, color:string) {
    let toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }





}
