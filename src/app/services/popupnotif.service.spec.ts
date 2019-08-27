import { TestBed } from '@angular/core/testing';

import { PopupnotifService } from './popupnotif.service';

describe('PopupnotifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupnotifService = TestBed.get(PopupnotifService);
    expect(service).toBeTruthy();
  });
});
