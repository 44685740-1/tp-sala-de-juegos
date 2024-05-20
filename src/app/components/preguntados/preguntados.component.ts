import { Component, OnInit, } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export default class PreguntadosComponent implements OnInit {
  question: any;
  answers: string[] = [];
  correctAnswer?: string;
  selectedAnswer: string | null = null ;
  isCorrect: boolean | null = null;
  lives: number = 3;
  score: number = 0;

  constructor(private preguntasService : PreguntadosService, private router : Router) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.preguntasService.getQuestion().subscribe(
      (data: any) => {
        this.question = data[0]; // Assuming API returns an array with one question
        this.answers = this.getAllAnswers(this.question);
        this.correctAnswer = data[0].correctAnswer;
        this.isCorrect = false;
      },
      (error: any) => {
        console.error('Error fetching trivia question:', error);
      }
    );
  }

  getAllAnswers(question: any): string[] {
    const answers = [...question.incorrectAnswers, question.correctAnswer];
    return this.shuffleArray(answers);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  resetGame(): void {
    this.lives = 3; 
    this.loadQuestion(); 
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.isCorrect = answer === this.correctAnswer;
  
    if (!this.isCorrect) {
      this.lives--;
    }
  
    if (this.lives === 0) {
      setTimeout(() => {
        Swal.fire({
          title: 'Te quedaste sin Vidas!',
          text: `Puntaje final ${this.score}, Quieres Jugar Otra Vez?`,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.resetGame();
          } else {
            this.router.navigate(["/home"]);
          }
        });
      }, 1000);
    } else {
      if (this.isCorrect) {
        this.score += 10; 
      }
      setTimeout(() => {
        this.loadQuestion();
      }, 1000);
    }
  }


  getButtonStyle(answer: string): { [key: string]: string } {
    if (this.selectedAnswer === answer) {
      return this.isCorrect ? { 'background-color': 'green', 'color': 'white' } : { 'background-color': 'red', 'color': 'white' };
    }
    return {};
  }
}
