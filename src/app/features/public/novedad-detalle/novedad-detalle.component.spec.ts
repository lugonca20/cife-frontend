import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadDetalleComponent } from './novedad-detalle.component';

describe('NovedadDetalleComponent', () => {
  let component: NovedadDetalleComponent;
  let fixture: ComponentFixture<NovedadDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
