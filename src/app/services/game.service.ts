// game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';  // Import UUID library
import { Observable } from 'rxjs';
import { GameStatusResponse } from '../game-status-response';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://5v465tdeg5.execute-api.ap-southeast-2.amazonaws.com/dev'; // Replace with your actual API endpoint
  private sessionIdKey = 'gameSessionId'; // Key for storing session ID

  constructor(private http: HttpClient) { }

  // Retrieve or generate a session ID
  private getSessionId(): string {
    let sessionId = localStorage.getItem(this.sessionIdKey);
    if (!sessionId) {
      sessionId = uuid.v4(); // Generate a new session ID if not found
      localStorage.setItem(this.sessionIdKey, sessionId); // Save to local storage
    }
    return sessionId;
  }

  joinGame() {
    const sessionId = this.getSessionId(); // Retrieve existing or new session ID
    console.log(sessionId);
    return this.http.post(`${this.apiUrl}/join-game`, { sessionId });
  }

  exitQueue() {
    const sessionId = this.getSessionId();
    return this.http.post(`${this.apiUrl}/exit-queue`, { sessionId });
  }

  getGameStatus(): Observable<GameStatusResponse> {
    return this.http.get<GameStatusResponse>(`${this.apiUrl}/game-status`);
  }
}
