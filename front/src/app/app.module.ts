import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { Page2 } from '../pages/page2/page2';

import { RegisterService } from '../pages/register/register.service';

import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Page2,
    CapitalizePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Page2
  ],
  providers: [RegisterService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
