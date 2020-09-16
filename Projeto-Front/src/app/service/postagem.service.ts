import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostagemModel } from '../model/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

  getAllPostagens(){
    return this.http.get('http://localhost:8080/postagem', this.token);
  }

  getByIdPostagem(id:number){
    return this.http.get(`http://localhost:8080/postagem/${id}`, this.token)
   }

  postPostagem(postagem: PostagemModel){
    return this.http.post('http://localhost:8080/postagem', postagem, this.token);
  }

  putPostagem(postagem: PostagemModel){
    return this.http.put("http://localhost:8080/postagem", postagem, this.token)
  }

  deletePostagem(id:number){
    return this.http.delete(`http://localhost:8080/postagem/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string) {
    return this.http.get(`http://localhost:8080/postagem/titulo/${titulo}`, this.token)
  }

}
