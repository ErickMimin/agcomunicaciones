
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './lobby/login/login.component';
import { RecoveryPasswordComponent } from './lobby/recovery-password/recovery-password.component';

// Module
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Routes
import { ROUTES_APP } from './app.routing';
import { ServicesModule } from './services/service.module';
import { FirstLoginComponent } from './lobby/first-login/first-login.component';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [
    LobbyComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    AppComponent,
    FirstLoginComponent
  ],
  imports: [
    ROUTES_APP,
    BrowserModule,
    PagesModule,
    ServicesModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
