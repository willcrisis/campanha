import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";

/*
  Generated class for the CalculaDiaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CalculaDiaProvider {

  public semana: number;
  public dia: number;

  constructor() {
    let dataBase = new Date(2016, 8, 11);
    let dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    let diferenca = Math.ceil((dataAtual.getTime() - dataBase.getTime()) / (1000 * 60 * 60 * 24));
    while (diferenca >= 49) {
      diferenca -= 49;
    }

    this.semana = Math.floor(diferenca / 7) + 1;
    this.dia = dataAtual.getDay() + 1;
  }

}
