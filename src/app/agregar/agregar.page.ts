import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: false,
})
export class AgregarPage implements OnInit {


  lista: Lista = new Lista('');
  nombreItem: string = '';



  constructor(
    private route: ActivatedRoute,
    public listaService: ListaService
  ) 
  { 
    let idLista = this.route.snapshot.paramMap.get('idLista');
    this.lista = new Lista('');
    this.nombreItem = '';

    if (idLista) {
      let ObjetoLista = this.listaService.obtenerLista(idLista);
      if (ObjetoLista) {
        this.lista = ObjetoLista;
      }
     }
  }
  
  ngOnInit() {
  }

  agregar(){
    if(this.nombreItem.length===0){
      return
    }

    const actividad = new Actividad(this.nombreItem);
    this.lista.actividad.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem ='';
    this.listaService.presentToast('Item agregado correctamente','success')


  }

}
