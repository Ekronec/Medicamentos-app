import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RegistroPageRoutingModule

    ],
    declarations: [RegistroPage]
   
  })
  export class RegistroPageModule {}
  