import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import { MapaComponent } from './component/mapa/mapa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonDataService } from './services/json-data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, MapaComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, JsonDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
