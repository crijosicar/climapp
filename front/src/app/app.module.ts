import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ErrorHandler, NgModule } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginComponent } from '../pages/login/login.component';
import { LoginService } from '../pages/login/login.service';
import { MyApp } from './app.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RegisterService } from '../pages/register/register.service';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
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
    HomeComponent
  ],
  providers: [RegisterService, LoginService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
