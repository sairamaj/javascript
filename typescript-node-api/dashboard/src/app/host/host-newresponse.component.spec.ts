import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostNewresponseComponent } from './host-newresponse.component';

describe('HostNewresponseComponent', () => {
  let component: HostNewresponseComponent;
  let fixture: ComponentFixture<HostNewresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostNewresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostNewresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
