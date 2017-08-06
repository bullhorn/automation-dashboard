import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ResultService } from './result.service';
import { config } from '../../config/config';

describe('ResultService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: config.backendURL, useValue: 'http://example.com' },
        ResultService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getOptions()', () => {

    it('should return a promise containing results',
        inject([ResultService, XHRBackend], (ResultService, mockBackend) => {

        const mockResponse = {
          data: [
            { id: 0, name: 'result 0' },
            { id: 1, name: 'result 1' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        ResultService.getOptions().then((videos) => {
          expect(videos.data.length).toBe(2);
          expect(videos.data[0].name).toBe('result 0');
          expect(videos.data[1].name).toBe('result 1');
        });

    }));
  });
});

