import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostServedrequestsComponent } from './host-servedrequests.component';

describe('HostLastrequestsComponent', () => {
  let component: HostServedrequestsComponent;
  let fixture: ComponentFixture<HostServedrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostServedrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostServedrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
