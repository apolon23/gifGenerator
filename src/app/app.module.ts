import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/services/user.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { SearchService } from './shared/services/search.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auth/helpers/jwt.interceptor';
import {AlertService} from './shared/services/alert.service';
import {AuthGuard} from './auth/guards/auth-guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import {MainModule} from './main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessagesService} from './shared/services/messages.service';
import {GifUploadService} from './shared/services/gif-upload.service';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {AdminModule} from './admin/admin.module';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('772782214265-ig87f6assgi5t5645kj833h8l0iud2pp.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('197708884157945')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AdminModule,
    MainModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    UserService,
    GifUploadService,
    AuthenticationService,
    AlertService,
    AuthGuard,
    SearchService,
    MessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
