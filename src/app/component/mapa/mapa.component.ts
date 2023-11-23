  ///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>


  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
  import { ElementRef, ViewChild, Renderer2 } from '@angular/core';

  @Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
  })
  export class MapaComponent implements OnInit {
    @ViewChild('divMap') divMap!: ElementRef;
    @ViewChild('inputPlaces') inputPlaces!: ElementRef;

    mapa!: google.maps.Map;
    markers: google.maps.Marker[];
    distancia!: string;
    formMapas!: FormGroup;
    ubicacionActual: google.maps.LatLng | null = null;  

    constructor(private renderer: Renderer2 , private fb: FormBuilder) {
      this.markers = [];

      this.formMapas = fb.group({
        busqueda: [''],
        direccion: [''],
        ciudad: [''],
        provincia: [''],
        region: ['']
        // Otros campos del formulario
      });

      
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
      const opciones = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.ubicacionActual = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
    
          await this.cargarMapa(position);

          // Asegúrate de que inputPlaces esté definido antes de llamar a cargarAutocomplete
          if (this.inputPlaces) {
            this.cargarAutocomplete();
          } else {
            console.error('La variable inputPlaces no está definida.');
          }
        }, null, opciones);
      } else {
        console.log("Navegador no compatible");
      }
    }

    onSubmit() {
      console.log('Datos del formulario: ', this.formMapas.value);

      // Luego, puedes llamar a la función para calcular la ruta o realizar otras acciones.
      this.mapRuta();
    }

    mapRuta() {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(this.mapa);

      const direccion = this.formMapas.value.direccion || '';
      const ciudad = this.formMapas.value.ciudad || '';
      const provincia = this.formMapas.value.provincia || '';
      const region = this.formMapas.value.region || '';
      
      const origin = "7500592";

      console.log('Origen:', origin);
      console.log('Direccion:', this.formMapas.value.direccion);
      console.log('Ciudad:', this.formMapas.value.ciudad);
      console.log('Provincia:', this.formMapas.value.provincia);
      console.log('Region:', this.formMapas.value.region);
      console.log('Formulario:', this.formMapas.value);


      const destination =
        'Farmacias Ahumada - Av. Nueva Providencia 1313, 7500592 Santiago, Providencia, Región Metropolitana';

        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            console.log('Resultado de la solicitud de direcciones:', result);
            console.log('Estado de la solicitud de direcciones:', status);
        
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              this.distancia = result.routes[0].legs[0].distance.text;
            } else {
              console.error('Error al calcular la ruta:', status);
            }
          }
        );
    }

    private cargarAutocomplete() {
      if (this.inputPlaces) {
        const inputElement = this.inputPlaces.nativeElement;
        
        if (inputElement) {
          const autocomplete =  new google.maps.places.Autocomplete(inputElement, {
          componentRestrictions: {
            country: ['CL'],
          },
          fields: ['address_components', 'geometry', 'place_id'],
          types: ['address'],
        }
      );

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place: any = autocomplete.getPlace();
        console.log('el place completo es:', place);

        this.mapa.setCenter(place.geometry.location);
        const marker = new google.maps.Marker({
          position: place.geometry.location,
        });

        marker.setMap(this.mapa);
        this.llenarFormulario(place);

        // Obtener farmacias cercanas
        this.obtenerFarmaciasCercanas(place.geometry.location);
      });
    } else {
      console.error('El elemento inputPlaces no tiene un elemento nativo.');
    }
    } else {
    console.error('La variable inputPlaces no está definida.');
  }
  }

    obtenerFarmaciasCercanas(location: google.maps.LatLng) {
      const request = {
        location: location,
        radius: 5000, // Radio de búsqueda en metros
        types: ['pharmacy'], // Tipo de lugar: farmacia
      };

      const placesService = new google.maps.places.PlacesService(this.mapa);

      placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // `results` contiene la lista de lugares cercanos, puedes hacer lo que desees con esta información.
          console.log('Farmacias cercanas:', results);
          this.mostrarMarcadoresFarmacias(results);
        } else {
          console.error('Error al obtener lugares cercanos:', status);
        }
      });
    }

    private mostrarMarcadoresFarmacias(farmacias: any[]) {
      farmacias.forEach((farmacia) => {
        const marker = new google.maps.Marker({
          position: farmacia.geometry.location,
          map: this.mapa,
          title: farmacia.name,
        });


        // Puedes agregar información adicional al marcador, como el nombre de la farmacia.
        // También puedes agregar un evento de clic para obtener más detalles o realizar acciones adicionales.

        google.maps.event.addListener(marker, 'click', () => {
          console.log('Detalles de la farmacia:', farmacia);
          // Puedes realizar acciones adicionales al hacer clic en el marcador.

        });

        // Agrega el marcador al array de marcadores para poder gestionarlos si es necesario.
        this.markers.push(marker);
      });
    }
    
private obtenerDetallesFarmacia(placeId: string) {
  const request = {
    placeId: placeId,
    fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'opening_hours', 'photos'],
  };

  const service = new google.maps.places.PlacesService(this.mapa);

  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Aquí obtienes los detalles de la farmacia en el objeto 'place'
      console.log('Detalles de la farmacia:', place);

      // Ahora puedes mostrar estos detalles en tu aplicación según tus necesidades.
      // Por ejemplo, podrías abrir una ventana de información personalizada con estos detalles.
    } else {
      console.error('Error al obtener detalles de la farmacia:', status);
    }
  });
}

    llenarFormulario(place: any) {
      const addressNameFormat: any = {
        street_number: 'short_name',
        route: 'long_name',
        administrative_area_level_1: 'short_name',
        administrative_area_level_2: 'short_name',
        administrative_area_level_3: 'short_name',
        country: 'long_name',
      };

      const getAddressComp = (type: any) => {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return ' ';
      };

      const componentForm = {
        direccion: 'location',
        ciudad: 'administrative_area_level_3',
        provincia: 'administrative_area_level_2',
        region: 'administrative_area_level_1',
      };

      Object.entries(componentForm).forEach((entry) => {
        const [key, value] = entry;

        this.formMapas.controls[key].setValue(getAddressComp(value));
      });

      this.formMapas.controls['direccion'].setValue(
        getAddressComp('route') + ' ' + getAddressComp('street_number')
      );
    }

    cargarMapa(position: any): any {
      const opciones = {
        center: new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      this.mapa = new google.maps.Map(
        this.renderer.selectRootElement(this.divMap.nativeElement),
        opciones
      );

      const markerPosition = new google.maps.Marker({
        position: this.mapa.getCenter(),
        title: 'tu',
      });

      markerPosition.setMap(this.mapa);
      this.markers.push(markerPosition);

      google.maps.event.addListener(this.mapa, 'click', (evento) => {
        const marker = new google.maps.Marker({
          position: evento.latLng,
          animation: google.maps.Animation.DROP,
        });
        marker.setDraggable(true);
        marker.setMap(this.mapa);

        google.maps.event.addListener(marker, 'click', (event) => {
          marker.setMap(null);
        });
      });
    }
  }
