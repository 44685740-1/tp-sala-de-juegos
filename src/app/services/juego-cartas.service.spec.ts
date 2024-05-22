import { TestBed } from '@angular/core/testing';

import { JuegoCartasService } from './juego-cartas.service';

describe('JuegoCartasService', () => {
  let service: JuegoCartasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoCartasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
