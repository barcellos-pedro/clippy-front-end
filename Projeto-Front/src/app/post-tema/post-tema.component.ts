import { Component, OnInit } from '@angular/core';
import { TemaModel } from '../model/TemaModel';
import { TemaService } from '../service/tema.service';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]

  constructor(
    private temaService: TemaService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: TemaModel) => {
      this.tema = resp;
    })
  }

  cadastrar() {
    if (this.tema.descricao == null) {
      this.alert.showAlertInfo('Preencha o campo de nome do tema corretamente')
    } else {
      this.temaService.postTema(this.tema).subscribe((resp: TemaModel) => {
        this.tema = resp
        this.tema.status = true
        this.router.navigate(['/feed'])
        this.alert.showAlertSuccess('Tema cadastrado com sucesso!')
      })
    }
  }
}