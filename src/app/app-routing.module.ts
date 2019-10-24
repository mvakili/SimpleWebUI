import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { MapComponent } from './components/map/map.component';
import { MapSearchComponent } from './components/map-search/map-search.component';


const routes: Routes = [
  {
    
    path: "",
    redirectTo: "/chat",
    pathMatch: "full"
  }, 
  {
    path: "chat",
    component: ChatComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "map-search",
    component: MapSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
