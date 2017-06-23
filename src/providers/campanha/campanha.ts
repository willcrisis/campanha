import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

/*
  Generated class for the CampanhaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CampanhaProvider {

  private data: Observable<any[]>;

  constructor(public http: Http) {
    this.data = this.http.get('assets/data/pt-br.json').map(res => res.json());
  }

  public list() {
    return this.data;
  }

  public get(semana: number, dia: number) {
    return this.getSemana(semana).map(semanaItem => {
      return semanaItem.dias.find(diaItem => diaItem.id === dia);
    });
  }

  public getSemana(semana: number) {
    return this.list().map(data => {
      return data.find(item => item.id === semana);
    });
  }
}
