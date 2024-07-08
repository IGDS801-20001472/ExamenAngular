import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/IProducto';

@Injectable({
  providedIn: 'root'
})
export class CatalogoServiceService {


  private _endpoint: string = environment.endpoint;
  private _apiUrl: string = this._endpoint + 'Productos/';



  constructor(private _http: HttpClient) {}

    //Metodo para invocar el endpoint de ListadoProductos.
    getList(): Observable<IProducto[]>{
      return this._http.get<IProducto[]>( `${this._apiUrl}`);
    }

    search(name: string): Observable<IProducto[]>{
      return this._http.get<IProducto[]>( `${this._apiUrl}search?name=${name}`);
    }

}
