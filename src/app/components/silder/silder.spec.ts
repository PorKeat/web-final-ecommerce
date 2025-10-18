import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Silder } from './silder';

describe('Silder', () => {
  let component: Silder;
  let fixture: ComponentFixture<Silder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Silder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Silder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
