import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisializarPostagemComponent } from './visializar-postagem.component';

describe('VisializarPostagemComponent', () => {
  let component: VisializarPostagemComponent;
  let fixture: ComponentFixture<VisializarPostagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisializarPostagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisializarPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
