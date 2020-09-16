import { Component, OnInit } from '@angular/core';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { TemaService } from '../service/tema.service';
import { PostagemService } from '../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  idPost: number

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]
  idTema: number

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService

  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.idPost = this.route.snapshot.params["id"]
    this.findByIdPostagem(this.idPost)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
    })
  }

  salvar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: PostagemModel) => {
      this.postagem = resp
      this.router.navigate(["/feed"])
      this.alert.showAlertSuccess("Postagem alterada com sucesso")
    }, err => {
      if (err.status == "500") {
        this.alert.showAlertInfo ("Preencha todos os campos corretamente antes de enviar")
        
      }
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp;
    })
  }
}