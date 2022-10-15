import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moments';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})

export class MomentService {

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = this.baseApiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  //busca todos os itens da api
  getMoments(): Observable<Response<Moment[]>>{
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  //busca apenas um item da api
  getMoment(id: number): Observable<Response<Moment>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  //cria um novo item na api
  createMoment(formData: FormData): Observable<FormData> {
          return this.http.post<FormData>(this.apiUrl, formData);
  }
  //REmove um item
  removeMoment(id: number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  //Atualiza os dados do item selecionado na edição
  updateMoment(id: number, formData: FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }
}
