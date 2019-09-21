import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitBarComponent } from './init-bar.component';

describe('InitBarComponent', () => {
  let component: InitBarComponent;
  let fixture: ComponentFixture<InitBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
