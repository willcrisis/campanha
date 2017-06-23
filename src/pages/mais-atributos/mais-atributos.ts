import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CampanhaProvider} from "../../providers/campanha/campanha";
import {HomePage} from "../home/home";

/**
 * Generated class for the MaisAtributosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-mais-atributos',
  templateUrl: 'mais-atributos.html',
})
export class MaisAtributosPage {

  dados: any[] = [];
  listaFiltrada: any[] = [];
  pesquisa = '';

  constructor(public navCtrl: NavController,
              private campanha: CampanhaProvider) {
    this.campanha.list().subscribe(dados => {
      this.dados = dados;
      this.listaFiltrada = this.dados;
    });
  }

  selecionar(semana: number, dia: number) {
    this.navCtrl.push(HomePage, {semana: semana, dia: dia});
  }

  pesquisar() {
    if (this.pesquisa.length === 0) {
      this.listaFiltrada = this.dados;
      return;
    }

    let listaFiltrada: any[] = [];

    this.dados.forEach(semana => {
      let semanaClone = {...semana};
      semanaClone.dias = [];
      semana.dias.forEach(dia => {
        if (dia.atributo.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1) {
          semanaClone.dias.push(dia);
          return;
        }
        let diaClone = {...dia};
        diaClone.livros = [];
        dia.livros.forEach(livro => {
          if (livro.nome.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1) {
            diaClone.livros.push(livro);
            return;
          }
          let livroClone = {...livro};
          livroClone.capitulos = [];
          livro.capitulos.forEach(capitulo => {
            let capituloClone = {...capitulo};
            capituloClone.versiculos = [];
            capitulo.versiculos.forEach(versiculo => {
              if (versiculo.texto.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1) {
                capituloClone.versiculos.push(versiculo);
              }
            });
            if (capituloClone.versiculos.length > 0) {
              livroClone.capitulos.push(capituloClone);
            }
          });
          if (livroClone.capitulos.length > 0) {
            diaClone.livros.push(livroClone);
          }
        });
        if (diaClone.livros.length > 0) {
          semanaClone.dias.push(diaClone);
        }
      });
      if (semanaClone.dias.length > 0) {
        listaFiltrada.push(semanaClone);
      }
    });

    this.listaFiltrada = listaFiltrada;
  }
}
