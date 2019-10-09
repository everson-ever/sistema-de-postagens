import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPostagemComponent } from './nova-postagem.component';

describe('NovaPostagemComponent', () => {
  let component: NovaPostagemComponent;
  let fixture: ComponentFixture<NovaPostagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaPostagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
