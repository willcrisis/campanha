"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
/*
  Generated class for the CampanhaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CampanhaProvider = (function () {
    function CampanhaProvider(http) {
        this.http = http;
        this.data = this.http.get('assets/data/campanha.json').map(function (res) { return res.json(); });
    }
    CampanhaProvider.prototype.list = function () {
        return this.data;
    };
    CampanhaProvider.prototype.get = function (semana, dia) {
        return this.getSemana(semana).map(function (semanaItem) {
            return semanaItem.dias.find(function (diaItem) { return diaItem.id === dia; });
        });
    };
    CampanhaProvider.prototype.getSemana = function (semana) {
        return this.list().map(function (data) {
            return data.find(function (item) { return item.id === semana; });
        });
    };
    return CampanhaProvider;
}());
CampanhaProvider = __decorate([
    core_1.Injectable()
], CampanhaProvider);
exports.CampanhaProvider = CampanhaProvider;
