// home.component.ts
import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private gameService: GameService) { }

  toggleQueue() {
    if (this.isInQueue) {
      // If in queue, exit the queue
      this.exitQueue();
    } else {
      // If not in queue, join the game
      this.joinGame();
    }
  }

  joinGame() {
    this.gameService.joinGame().subscribe(
      response => {
        console.log('Joined Game:', response);
        this.isInQueue = true; // Update state to show user is in the queue
        alert('Successfully joined the game!');
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
        this.isInQueue = false; // Update state to show user has exited the queue
        alert('Successfully exited the queue!');
      },
      error => {
        console.error('Error Exiting Queue:', error);
        alert('Failed to exit the queue. Please try again.');
      }
    );
  }

  // Angular Component Method
  redirectToGameRules() {
    window.location.href = 'https://kakegurui.fandom.com/wiki/War';
  }

}
