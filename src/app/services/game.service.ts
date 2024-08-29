// game.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  joinGame() {
    return this.http.post(`${this.apiUrl}/join-game`, {}); // API call to join the game
  }

  exitQueue() {
    return this.http.post(`${this.apiUrl}/exit-queue`, {}); // API call to exit the queue
  }
}
