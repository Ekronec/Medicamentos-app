import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})

export class RecetasPage implements OnInit {

  jsonData: any;
  loading: boolean = false;

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.jsonDataService.getJsonData().subscribe(data => {
      this.jsonData = data;
      this.loading = false; // Desactiva la animación de carga cuando se completa la solicitud
    });
  }


}
