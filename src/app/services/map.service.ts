import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import buffer from '@turf/buffer';
import bbox from '@turf/bbox';
import { point } from '@turf/helpers';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
  ) { }

  async getCountryLatLng(name): Promise<number[]> {
    console.log(name, `https://restcountries.eu/rest/v2/name/${name}?fields=latlng`);
    const info = await this.http.get(`https://restcountries.eu/rest/v2/name/${name}?fields=latlng`).toPromise();
    return info[0].latlng;
  }

  public getZoomedOutBoundsForPoint(lat, lng) {
    return bbox(buffer(point([lng, lat]), 1500, {
      units: 'kilometers',
    }));
  }
}
