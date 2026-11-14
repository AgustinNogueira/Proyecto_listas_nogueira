// En vez de importar ionicmodule, importe el custom elements schema para que no de error al compilar el proyecto
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListasComponent } from '../components/listas/listas.component';

@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListasComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListasModule { }