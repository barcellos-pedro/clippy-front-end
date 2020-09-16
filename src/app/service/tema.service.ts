import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TemaModel } from '../model/TemaModel';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

  getAllTemas(){
    return this.http.get('http://localhost:8080/tema', this.token);
  }

  getByIdTema(id: number){
    return this.http.get(`http://localhost:8080/tema/${id}`, this.token);
  }

  postTema(tema: TemaModel) {
    return this.http.post('http://localhost:8080/tema', tema, this.token)
  }

  putTema(tema: TemaModel){
    return this.http.put('http://localhost:8080/tema',tema, this.token)
  }
  
  deleteTema(id: number){
    return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)
  }

}
