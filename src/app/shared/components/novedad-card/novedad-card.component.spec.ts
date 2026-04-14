import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadCardComponent } from './novedad-card.component';

describe('NovedadCardComponent', () => {
  let component: NovedadCardComponent;
  let fixture: ComponentFixture<NovedadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
