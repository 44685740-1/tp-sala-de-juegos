import { Component, OnInit } from '@angular/core';
import { JuegoCartasService } from '../../services/juego-cartas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-juego-cartas',
  standalone: true,
  imports: [],
  templateUrl: './juego-cartas.component.html',
  styleUrl: './juego-cartas.component.css'
})
export default class JuegoCartasComponent implements OnInit {
  deckId: string | undefined;
  currentCard: any;
  nextCard: any;
  score: number = 0;
  message: string = '';
  vidas: number = 3;

  private gameStarted: boolean = false;

  constructor(private juegoCartaservice : JuegoCartasService, private router : Router) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.juegoCartaservice.createDeck().subscribe((data) => {
      this.deckId = data.deck_id;
      this.drawCard();
    });
  }

  drawCard(): void {
    if (this.gameStarted) return;
    this.gameStarted = true;
    if (this.deckId) {
      this.juegoCartaservice.drawCard(this.deckId).subscribe((data) => {
        this.currentCard = data.cards[0];
        this.message = '';
      });
    }
  }

  guess(isHigher: boolean): void {
    if (this.deckId) {
      this.juegoCartaservice.drawCard(this.deckId).subscribe((data) => {
        this.nextCard = data.cards[0];

        const currentValue = this.cardValue(this.currentCard.value);
        const nextValue = this.cardValue(this.nextCard.value);

        if ((isHigher && nextValue > currentValue) || (!isHigher && nextValue < currentValue)) {
          this.score += 10;
          this.message = 'Correcto!';
        } else {
          this.vidas--;
          this.message = 'Incorrecto!';
        }

        if (this.vidas === 0) {
          setTimeout(() => {
            Swal.fire({
              title: 'Te quedaste sin Vidas!',
              text: `Puntaje final ${this.score}, Quieres Jugar Otra Vez?`,
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                this.score = 0;
                this.message = '';
                this.vidas = 3;
                this.startGame();
              } else {
                this.score = 0;
                this.message = '';
                this.vidas = 3;
                this.router.navigate(["/home"]);
              }
            });
          }, 1000);
        } 

        this.currentCard = this.nextCard;
      });
    }
  }

  cardValue(value: string): number {
    if (value === 'ACE') return 1;
    if (value === 'JACK') return 11;
    if (value === 'QUEEN') return 12;
    if (value === 'KING') return 13;
    return parseInt(value, 10);
  }
}
