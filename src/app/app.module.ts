import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService, ChatService } from './services';
import { HttpModule } from '@angular/http';
import { MapComponent } from './components/map/map.component';
import { ChatComponent } from './components/chat/chat.component';
import { DxMapModule, DxPopupModule } from "devextreme-angular";
import { MapSearchComponent } from './components/map-search/map-search.component'; 
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MapComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    DxMapModule,
    DxPopupModule
  ],
  providers: [
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
