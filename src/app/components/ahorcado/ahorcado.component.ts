import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado.service';
@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export default class AhorcadoComponent implements OnInit {
  palabra: string = '';
  maskedWord: string = '';
  guessedLetters: string[] = [];
  wrongGuesses: number = 0;
  maxWrongGuesses: number = 6;
  gameOver: boolean = false;
  gameWon: boolean = false;

  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  letrasUno: string[] = 'ABCDEFGHIJKLM'.split('');
  letrasDos: string[] = 'NOPQRSTUVWXYZ'.split('');


  constructor(private ahorcadoService: AhorcadoService) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.ahorcadoService.getRandomWord().subscribe((palabra: string) => {
      this.palabra = palabra.toUpperCase();
      this.maskedWord = '_ '.repeat(this.palabra.length).trim();
      this.guessedLetters = [];
      this.wrongGuesses = 0;
      this.gameOver = false;
      this.gameWon = false;
    });
  }

  guessLetter(letter: string): void {
    if (this.guessedLetters.includes(letter) || this.gameOver) return;

    this.guessedLetters.push(letter);

    if (this.palabra.includes(letter)) {
      this.updateMaskedWord();
      if (!this.maskedWord.includes('_')) {
        this.gameWon = true;
        this.gameOver = true;
      }
    } else {
      this.wrongGuesses++;
      if (this.wrongGuesses >= this.maxWrongGuesses) {
        this.gameOver = true;
      }
    }
  }

  updateMaskedWord(): void {
    let newMaskedWord = '';
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.guessedLetters.includes(this.palabra[i])) {
        newMaskedWord += this.palabra[i] + ' ';
      } else {
        newMaskedWord += '_ ';
      }
    }
    this.maskedWord = newMaskedWord.trim();
  }
}
