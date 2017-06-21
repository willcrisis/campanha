import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the MenuAcaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu-acao',
  templateUrl: 'menu-acao.html',
})
export class MenuAcaoPage {

  private texto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    this.texto = this.navParams.get('texto');
  }

  compartilhar() {
    this.socialSharing.share(this.texto).then(() => {
      console.log('enviado!');
    });
  }
}
