import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GremlingComponent } from './gremling.component';

describe('GremlingComponent', () => {
  let component: GremlingComponent;
  let fixture: ComponentFixture<GremlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GremlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GremlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
