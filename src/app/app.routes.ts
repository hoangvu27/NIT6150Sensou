import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust path as needed
import { GameComponent } from './game/game.component'; // Assuming there's a GameComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Route for home page
  { path: 'game', component: GameComponent }  // Route for game page
];
