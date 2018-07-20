import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Host.DetailComponent } from './host.detail.component';

describe('Host.DetailComponent', () => {
  let component: Host.DetailComponent;
  let fixture: ComponentFixture<Host.DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Host.DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Host.DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
