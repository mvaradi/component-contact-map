import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMapComponent } from './contact-map.component';

describe('ContactMapComponent', () => {
  let component: ContactMapComponent;
  let fixture: ComponentFixture<ContactMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the data formatted', () => {
    expect(component.formatTicks(10)).toEqual(10);
    expect(component.formatTicks(1100)).toEqual('1.1k');
  });

});
