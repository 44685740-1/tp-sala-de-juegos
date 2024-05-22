import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoCartasComponent } from './juego-cartas.component';

describe('JuegoCartasComponent', () => {
  let component: JuegoCartasComponent;
  let fixture: ComponentFixture<JuegoCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoCartasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuegoCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
