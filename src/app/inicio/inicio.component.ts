import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();
  user: User = new User();
  idUser = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaSerive: TemaService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }
    this.getAllTema;
  }

  getAllTema() {
    this.temaSerive.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaSerive.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert('Postagem Realizada com Sucesso');
        this.postagem = new Postagem();
      });
  }
}
