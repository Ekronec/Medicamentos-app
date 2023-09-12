import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApoyoPageRoutingModule } from './apoyo-routing.module';

import { ApoyoPage } from './apoyo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApoyoPageRoutingModule
  ],
  declarations: [ApoyoPage]
})
export class ApoyoPageModule {}
