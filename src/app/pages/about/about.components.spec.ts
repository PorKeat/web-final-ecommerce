import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponents } from './about.components';

describe('AboutComponents', () => {
  let component: AboutComponents;
  let fixture: ComponentFixture<AboutComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
