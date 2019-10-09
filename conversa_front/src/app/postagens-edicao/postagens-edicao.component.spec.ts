import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagensEdicaoComponent } from './postagens-edicao.component';

describe('PostagensEdicaoComponent', () => {
  let component: PostagensEdicaoComponent;
  let fixture: ComponentFixture<PostagensEdicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagensEdicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostagensEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
