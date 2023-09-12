import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('src/app/home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'recetas',
        loadChildren: () => import('../recetas/recetas.module').then( m => m.RecetasPageModule)
      },
      {
        path: 'apoyo',
        loadChildren: () => import('../apoyo/apoyo.module').then( m => m.ApoyoPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial.module').then( m => m.HistorialPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
