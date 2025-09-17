import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loadingmask } from './loadingmask';

describe('Loadingmask', () => {
  let component: Loadingmask;
  let fixture: ComponentFixture<Loadingmask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loadingmask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loadingmask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
