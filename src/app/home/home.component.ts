// home.component.ts
import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
// home.component.ts or game.service.ts
import { GameStatusResponse } from '../game-status-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isInQueue = false; // Track if the user is in the queue
  isGameFull = false; // Track if the game has started (full)

  constructor(private gameService: GameService) { }

  toggleQueue() {
    if (this.isInQueue) {
      this.exitQueue();
    } else {
      this.joinGame();
    }
  }

  joinGame() {
    this.gameService.joinGame().subscribe(
      response => {
        console.log('Joined Game:', response);
        this.isInQueue = true; // Update to show the user is in the queue
        alert('Successfully joined the game!');
        this.checkGameStatus(); // Check if the game has started
      },
      error => {
        console.error('Error Joining Game:', error);
        alert('Failed to join the game. Please try again.');
      }
    );
  }

  exitQueue() {
    this.gameService.exitQueue().subscribe(
      response => {
        console.log('Exited Queue:', response);
        this.isInQueue = false; // Update to show the user has exited the queue
        alert('Successfully exited the queue!');
        this.checkGameStatus(); // Check the game status to update the UI
      },
      error => {
        console.error('Error Exiting Queue:', error);
        alert('Failed to exit the queue. Please try again.');
      }
    );
  }

  checkGameStatus() {
    this.gameService.getGameStatus().subscribe(
      (response: GameStatusResponse) => { // Use the defined interface here
        console.log('Game Status:', response);
        this.isGameFull = response.Status === 'in-progress';
      },
      error => {
        console.error('Error checking game status:', error);
      }
    );
  }

  redirectToGameRules() {
    window.location.href = 'https://kakegurui.fandom.com/wiki/War';
  }
}
