import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {CampanhaProvider} from "../../providers/campanha/campanha";
import {CalculaDiaProvider} from "../../providers/calcula-dia/calcula-dia";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public atributo: any = {};
  public semana: any = {};
  public dia: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private campanha: CampanhaProvider,
              private calculaDia: CalculaDiaProvider) {
    let dia = this.navParams.get('dia');
    let semana = this.navParams.get('semana');
    if (dia && semana) {
      this.dia = dia;
    } else {
      this.dia = this.calculaDia.dia;
      dia = this.dia;
      semana = this.calculaDia.semana;
    }

    this.campanha.getSemana(semana).subscribe(semana => {
      this.semana = semana;
    });
    this.campanha.get(this.dia, semana).subscribe(atributo => {
      this.atributo = atributo;
    });
  }

}
