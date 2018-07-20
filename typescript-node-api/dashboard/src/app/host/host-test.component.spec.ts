import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostTestComponent } from './host-test.component';

describe('HostTestComponent', () => {
  let component: HostTestComponent;
  let fixture: ComponentFixture<HostTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
