import { Component, OnInit } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';
import medicamentosData from '../../../assets/medicamentos.json'

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})

export class RecetasPage implements OnInit {

  jsonData: any;
  loading: boolean = false;
  private medicamentos: any[] = medicamentosData.records;
  busqueda: string = '';
  sugerencias: string[] = [];
  medicamentosSeleccionados: string[] = [];

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

  buscarMedicamentos(termino: string): void {
    if (termino.trim() === '') {
      this.sugerencias = []; // Si el término de búsqueda está vacío, borra las sugerencias.
      return;
    }
  
    this.sugerencias = this.medicamentos
      .filter((medicamento: any) =>
        medicamento[2].toLowerCase().includes(termino.toLowerCase())
      )
      .map((medicamento: any) => medicamento[2]);
  }
  
  agregarMedicamentoSeleccionado(medicamento: string): void {
    this.medicamentosSeleccionados.push(medicamento);
    this.busqueda = ''; // Borra el campo de búsqueda después de agregar el medicamento.
  }
  


}
