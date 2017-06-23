import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";
import {TranslateService} from "@ngx-translate/core";

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

  private atributo: any;
  private semana: any;
  private dia: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socialSharing: SocialSharing, private translateService: TranslateService) {
    this.atributo = this.navParams.get('atributo');
    this.dia = this.navParams.get('dia');
    this.semana = this.navParams.get('semana');
  }

  compartilhar() {
    this.translateService.get([
      'appName',
      'semanaAtributo',
      'diaDaSemana.' + this.dia,
      'atributoDia',
      'capitulo'
    ], {
      semana: this.semana.id,
      tema: this.semana.tema,
      atributo: this.atributo.atributo
    }).subscribe(translations => {
      console.log(translations);
      const QUEBRA_LINHA: string = '\n';

      let texto: string = translations.appName + QUEBRA_LINHA + QUEBRA_LINHA;
      texto += translations.semanaAtributo + QUEBRA_LINHA;
      texto += translations['diaDaSemana.' + this.dia] + QUEBRA_LINHA + QUEBRA_LINHA;
      texto += translations.atributoDia + QUEBRA_LINHA + QUEBRA_LINHA;
      texto += this.atributo.textos + QUEBRA_LINHA + QUEBRA_LINHA;
      this.atributo.livros.forEach(livro => {
        texto += livro.nome + QUEBRA_LINHA;
        livro.capitulos.forEach(capitulo => {
          texto += translations.capitulo.replace('{{capitulo}}', capitulo.id) + QUEBRA_LINHA;
          capitulo.versiculos.forEach(versiculo => {
            texto += versiculo.id + ' ' + versiculo.texto + QUEBRA_LINHA;
          });
          texto += QUEBRA_LINHA;
        });
      });
      texto += 'Obtenha o aplicativo da Campanha de Louvor. \nAcesse: https://github.com/willcrisis/campanha';

      const opcoes = {
        message: texto
      };
      this.socialSharing.shareWithOptions(opcoes).then(() => {
        console.log('Enviado.');
      });
    });
  }
}
