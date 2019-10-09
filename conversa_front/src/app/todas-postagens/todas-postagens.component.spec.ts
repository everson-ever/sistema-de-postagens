import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasPostagensComponent } from './todas-postagens.component';

describe('TodasPostagensComponent', () => {
  let component: TodasPostagensComponent;
  let fixture: ComponentFixture<TodasPostagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasPostagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasPostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
