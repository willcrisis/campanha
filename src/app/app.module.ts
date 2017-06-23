import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {CampanhaProvider} from "../providers/campanha/campanha";
import {HttpModule, Http} from "@angular/http";
import {CalculaDiaProvider} from "../providers/calcula-dia/calcula-dia";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MaisAtributosPage} from "../pages/mais-atributos/mais-atributos";
import {MenuAcaoPage} from "../pages/menu-acao/menu-acao";
import {SocialSharing} from "@ionic-native/social-sharing";
import {SobrePage} from "../pages/sobre/sobre";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MaisAtributosPage,
    MenuAcaoPage,
    SobrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MaisAtributosPage,
    MenuAcaoPage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CampanhaProvider,
    CalculaDiaProvider,
    SocialSharing
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
