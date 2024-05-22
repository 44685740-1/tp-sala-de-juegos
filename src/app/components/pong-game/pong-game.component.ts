import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pong-game',
  standalone: true,
  imports: [],
  templateUrl: './pong-game.component.html',
  styleUrl: './pong-game.component.css'
})
export default class PongGameComponent implements AfterViewInit {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private ball: any;
  private player: any;
  private ai: any;
  private interval: any;
  private gameStarted: boolean = false;

  playerScore: number = 0;
  aiScore: number = 0;


  constructor() {}

  ngAfterViewInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.initializeGame();
  }

  initializeGame(): void {
    this.ball = {
      x: 400,
      y: 200,
      radius: 10,
      speedX: 6,
      speedY: 6
    };

    this.player = {
      x: 30,
      y: 150,
      width: 10,
      height: 100,
      speed: 6,
      moveUp: false,
      moveDown: false
    };

    this.ai = {
      x: 760,
      y: 150,
      width: 10,
      height: 100,
      speed: 5
    };
  }

  startGame(): void {
    if (this.gameStarted) return; // Prevent multiple intervals
    this.gameStarted = true;

    this.interval = setInterval(() => this.gameLoop(), 1000 / 60);

    window.addEventListener('keydown', (e) => this.keyDownHandler(e));
    window.addEventListener('keyup', (e) => this.keyUpHandler(e));
  }

  gameLoop(): void {
    this.update();
    this.draw();
  }

  update(): void {
    this.moveBall();
    this.movePlayer();
    this.moveAi();
  }

  moveBall(): void {
    this.ball.x += this.ball.speedX;
    this.ball.y += this.ball.speedY;

    // Ball collision with top and bottom walls
    if (this.ball.y + this.ball.radius > 400 || this.ball.y - this.ball.radius < 0) {
      this.ball.speedY *= -1;
    }

    // Ball collision with player
    if (
      this.ball.x - this.ball.radius < this.player.x + this.player.width &&
      this.ball.y > this.player.y &&
      this.ball.y < this.player.y + this.player.height
    ) {
      this.ball.speedX *= -1;
    }

    // Ball collision with AI
    if (
      this.ball.x + this.ball.radius > this.ai.x &&
      this.ball.y > this.ai.y &&
      this.ball.y < this.ai.y + this.ai.height
    ) {
      this.ball.speedX *= -1;
    }

    if (this.ball.x + this.ball.radius > 790) {
      this.playerScore++;
      this.checkWinner();
      this.resetBall();
    } else if (this.ball.x - this.ball.radius < 10)
    {
      this.aiScore++;
      this.checkWinner();
      this.resetBall();
    }
  }

  checkWinner(): void {
    if (this.playerScore >= 3) {
      clearInterval(this.interval);
      this.gameStarted = false;
      Swal.fire({
        title: 'Has Ganado!',
        text: 'Deseas Jugar otra vez?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame();
        }  else 
        {
          this.playerScore = 0;
          this.aiScore = 0
        }
      });
    } else if (this.aiScore >= 3) {
      clearInterval(this.interval);
      this.gameStarted = false;
      Swal.fire({
        title: 'Has Perdido!',
        text: 'Deseas Jugar Otra vez?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame();
        } else 
        {
          this.playerScore = 0;
          this.aiScore = 0
        }
      });
    }
  }


  resetGame(): void {
    this.playerScore = 0;
    this.aiScore = 0;
    this.initializeGame();
    this.startGame();
  }


  movePlayer(): void {
    if (this.player.moveUp && this.player.y > 0) {
      this.player.y -= this.player.speed;
    }
    if (this.player.moveDown && this.player.y + this.player.height < 400) {
      this.player.y += this.player.speed;
    }
  }

  moveAi(): void {
    const targetY = this.ball.y - (this.ai.height / 2);
    if (this.ai.y < targetY) {
      this.ai.y += this.ai.speed;
    } else if (this.ai.y > targetY) {
      this.ai.y -= this.ai.speed;
    }
  }

  draw(): void {
    this.ctx.clearRect(0, 0, 800, 400);
    this.drawBall();
    this.drawPlayer();
    this.drawAi();
  }

  drawBall(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPlayer(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
  }

  drawAi(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.ai.x, this.ai.y, this.ai.width, this.ai.height);
  }

  keyDownHandler(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.player.moveUp = true;
    } else if (event.key === 'ArrowDown') {
      this.player.moveDown = true;
    }
  }

  keyUpHandler(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      this.player.moveUp = false;
    } else if (event.key === 'ArrowDown') {
      this.player.moveDown = false;
    }
  }

  resetBall(): void {
    this.ball.x = 400;
    this.ball.y = 200;
    this.ball.speedX *= -1;
  }
}
