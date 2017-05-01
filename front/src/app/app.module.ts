import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { PasswordRecoveryComponent } from '../pages/passwordRecovery/passwordRecovery.component';
import { RegisterService } from '../pages/register/register.service';
import { LoginService } from '../pages/login/login.service';
import { PasswordRecoveryService } from '../pages/passwordRecovery/passwordRecovery.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PasswordRecoveryComponent,
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
    PasswordRecoveryComponent
  ],
  providers: [RegisterService, 
                LoginService,
                PasswordRecoveryService,
                {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
