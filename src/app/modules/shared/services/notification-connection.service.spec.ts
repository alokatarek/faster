import { TestBed } from '@angular/core/testing';

import { NotificationConnectionService } from './notification-connection.service';

describe('NotificationConnectionService', () => {
  let service: NotificationConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
