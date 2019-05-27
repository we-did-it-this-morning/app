import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://infmalariapp.herokuapp.com';
  // private readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get from the api
   * @param url 
   * @param parameters 
   */
  public async get(url, parameters): Promise<any> {
    const parametersString = Object.keys(parameters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`, {})
      .join('&');

    let res: any;
    try {
      res = await this.http.get(`${this.API_URL}/${url}?${parametersString}`).toPromise();
    } catch (err) {
      console.error('api error', err);
      throw err;
    }
    if (!res.success) {
      throw res;
    }
    return res.data;
  }

  public async getMappedList(url, property = 'id'): Promise<any> {
    const res = await this.get(url, {});
    return res.reduce((ob, treatmentType) => {
      ob[treatmentType[property]] = treatmentType;
      return ob;
    }, {});
  }
}
