import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { LearnComponent } from './learn.component';

describe('LearnComponent', () => {
  let component: LearnComponent;
  let fixture: ComponentFixture<LearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnComponent],
      // The demo button is a real routerLink now (it was inert without RouterLink).
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
