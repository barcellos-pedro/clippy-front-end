import { Component, OnInit } from '@angular/core';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  faEdit = faEdit
  faTrashAlt = faTrashAlt

  key = 'data'
  reverse = true
  

  constructor(
    private postagemService: PostagemService,
     private temaService: TemaService,
     private alert: AlertasService
     
     ) { }

  postagem: PostagemModel = new PostagemModel();
  listaPostagens: PostagemModel[];
  titulo: string;

  tema: TemaModel = new TemaModel();
  listaTemas: TemaModel[];
  idTema: number;

  ngOnInit() {
    window.scroll(0, 0)
    this.findAllPostagens()
    this.findAllTemas()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) => {
      this.listaPostagens = resp;
      console.log(this.listaPostagens);
    });
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    if (this.postagem.titulo == null || this.postagem.conteudo == null || this.postagem.tema == null || this.postagem.referencia == null) {
      this.alert.showAlertInfo("Preencha todoos os campos antes de publicar!")
    } else {
      this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel) => {
        this.postagem = resp
        this.postagem = new PostagemModel()
        this.alert.showAlertSuccess('Postagem realizada com sucesso!')
        this.findAllPostagens();
      })
    }
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp;
    });
  }

  findByTituloPostagem() {
    if (this.titulo === ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: PostagemModel[]) => {
        this.listaPostagens = resp
      })
    }
  }

}
