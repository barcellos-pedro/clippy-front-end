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
    return this.http.get('https://clippy-back-end.herokuapp.com/tema', this.token);
  }

  getByIdTema(id: number){
    return this.http.get(`https://clippy-back-end.herokuapp.com/tema/${id}`, this.token);
  }

  postTema(tema: TemaModel) {
    return this.http.post('https://clippy-back-end.herokuapp.com/tema', tema, this.token)
  }

  putTema(tema: TemaModel){
    return this.http.put('https://clippy-back-end.herokuapp.com/tema',tema, this.token)
  }
  
  deleteTema(id: number){
    return this.http.delete(`https://clippy-back-end.herokuapp.com/tema/${id}`, this.token)
  }

}
