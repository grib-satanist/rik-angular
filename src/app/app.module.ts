import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './components/main/main.module';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './components/accounts/accounts.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MainModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
