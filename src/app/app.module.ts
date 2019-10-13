import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService, ChatService } from './services';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserModule
  ],
  providers: [
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
