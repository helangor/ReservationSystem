import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//TODO: Company jakautuu vielä tuotteisiin. 

//Company-detailed
//TODO: Kun luodaan varausta niin tarkistaa, ettei välissä ole varattuja päiviä. 
 