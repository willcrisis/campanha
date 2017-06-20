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

  public dados: any[] = [];

  constructor(public navCtrl: NavController,
              private campanha: CampanhaProvider) {
    this.campanha.list().subscribe(dados => {
      this.dados = dados;
    });
  }

  selecionar(semana: number, dia: number) {
    console.log(semana);
    console.log(dia);
    this.navCtrl.push(HomePage, {semana: semana, dia: dia});
  }
}
