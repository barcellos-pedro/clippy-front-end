import { Component, OnInit } from '@angular/core';
import { PostagemModel } from '../model/PostagemModel';
import { PostagemService } from '../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-delete-postagem',
  templateUrl: './delete-postagem.component.html',
  styleUrls: ['./delete-postagem.component.css']
})
export class DeletePostagemComponent implements OnInit {

  postagem : PostagemModel = new PostagemModel()
  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    let id: number = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
  }

  findByIdPostagem(id:number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) => {
      this.postagem = resp
    })
  }

  btnSim(){
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      this.router.navigate(['/feed'])
      this.alert.showAlertInfo('Postagem apagada com sucesso!!')
    })
  }

  btnNao(){
    this.router.navigate(['/feed'])
  }

}