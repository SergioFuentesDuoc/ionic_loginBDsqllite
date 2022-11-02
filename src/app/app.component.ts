import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService } from './services/dbservice.service';
import { AutenthicationService } from './services/autenthication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dbTaskService: DbserviceService,
    public sqlite: SQLite,
    public authenticationService:AutenthicationService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.createDatabase();
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
  /**
   * Función privada que se encarga de generar la base de datos
   */
  private createDatabase(){
    this.sqlite.create({ // Se usa la función create para crear la base de datos
      name:'data.db', // Se llamara data
      location:'default'
    }).then((db)=>{
      this.dbTaskService.setDatabase(db);
      this.dbTaskService.createTables();
    }) // Si todo sale bien, muestra por consola el log del db
    .catch(error=>{console.error('sadasd');}); // Si sale algo mal, muestra por consola el error
  }
}
