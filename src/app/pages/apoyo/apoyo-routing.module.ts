import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApoyoPage } from './apoyo.page';

const routes: Routes = [
  {
    path: '',
    component: ApoyoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApoyoPageRoutingModule {}
